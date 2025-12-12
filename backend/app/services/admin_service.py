from app.db.mongo import admins
from app.core.security import hash_password, verify_password, create_token

async def create_admin(email: str, password: str, org_id):
    doc = {'email': email, 'password': hash_password(password), 'org_id': org_id}
    res = await admins.insert_one(doc)
    doc['_id'] = res.inserted_id
    return doc

async def find_admin_by_email(email: str):
    return await admins.find_one({'email': email})

async def authenticate_admin(email: str, password: str):
    admin = await find_admin_by_email(email)
    if not admin:
        return None
    if not verify_password(password, admin['password']):
        return None
    return admin

def create_jwt(admin_doc: dict):
    payload = {'admin_id': str(admin_doc['_id']), 'org_id': str(admin_doc.get('org_id')), 'email': admin_doc['email']}
    return create_token(payload)
