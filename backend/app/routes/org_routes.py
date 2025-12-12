from fastapi import APIRouter, HTTPException, Depends
from app.models.schemas import OrgCreate, OrgUpdate
from app.services.org_service import org_exists, create_org_record, get_org_by_name, rename_org_collection, delete_org_collection
from app.services.admin_service import create_admin
from app.middleware.auth_middleware import get_current_admin
from app.db.mongo import orgs, admins

router = APIRouter(prefix='/org', tags=['org'])

@router.post('/create')
async def create_org(payload: OrgCreate):
    if await org_exists(payload.organization_name):
        raise HTTPException(status_code=400, detail='Organization already exists')
    if not payload.password or len(payload.password) < 6:
        raise HTTPException(status_code=400, detail='Password must be >= 6 chars')
    admin = await create_admin(payload.email, payload.password, None)
    org_doc = await create_org_record(payload.organization_name, admin['_id'])
    await admins.update_one({'_id': admin['_id']}, {'$set': {'org_id': org_doc['_id']}})
    await orgs.update_one({'_id': org_doc['_id']}, {'$set': {'admin_id': admin['_id']}})
    return {'organization_name': org_doc['name'], 'collection_name': org_doc['collection'], 'admin_id': str(admin['_id'])}

@router.get('/get')
async def get_org(organization_name: str):
    org = await get_org_by_name(organization_name)
    if not org:
        raise HTTPException(status_code=404, detail='Org not found')
    return {'organization_name': org['name'], 'collection_name': org['collection'], 'admin_id': str(org.get('admin_id'))}

@router.put('/update')
async def update_org(organization_name: str, payload: OrgUpdate, current=Depends(get_current_admin)):
    admin = current['admin']
    org = await get_org_by_name(organization_name)
    if not org:
        raise HTTPException(status_code=404, detail='Org not found')
    if str(org.get('admin_id')) != str(admin['_id']):
        raise HTTPException(status_code=403, detail='Not authorized')
    if payload.new_organization_name:
        if await get_org_by_name(payload.new_organization_name):
            raise HTTPException(status_code=400, detail='New name exists')
        new_coll = await rename_org_collection(org['name'], payload.new_organization_name)
        await orgs.update_one({'_id': org['_id']}, {'$set': {'name': payload.new_organization_name, 'collection': new_coll}})
        org = await get_org_by_name(payload.new_organization_name)
    if payload.email or payload.password:
        update_fields = {}
        if payload.email:
            update_fields['email'] = payload.email
        if payload.password:
            from app.core.security import hash_password
            update_fields['password'] = hash_password(payload.password)
        await admins.update_one({'_id': org['admin_id']}, {'$set': update_fields})
    return {'status':'ok', 'organization': org['name']}

@router.delete('/delete')
async def delete_org(organization_name: str, current=Depends(get_current_admin)):
    admin = current['admin']
    org = await get_org_by_name(organization_name)
    if not org:
        raise HTTPException(status_code=404, detail='Org not found')
    if str(org.get('admin_id')) != str(admin['_id']):
        raise HTTPException(status_code=403, detail='Not authorized')
    await delete_org_collection(org['collection'])
    await admins.delete_one({'_id': org['admin_id']})
    await orgs.delete_one({'_id': org['_id']})
    return {'status':'deleted'}
