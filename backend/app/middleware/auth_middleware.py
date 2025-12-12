from fastapi import Header, HTTPException
from app.core.security import decode_token
from app.db.mongo import admins
from bson.objectid import ObjectId

async def get_current_admin(authorization: str = Header(None)):
    if not authorization or not authorization.lower().startswith('bearer '):
        raise HTTPException(status_code=401, detail='Missing token')
    token = authorization.split(' ',1)[1]
    try:
        payload = decode_token(token)
    except Exception:
        raise HTTPException(status_code=401, detail='Invalid token')
    admin = await admins.find_one({'_id': ObjectId(payload.get('admin_id'))})
    if not admin:
        raise HTTPException(status_code=401, detail='Admin not found')
    return {'admin': admin, 'payload': payload}
