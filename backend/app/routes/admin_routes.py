from fastapi import APIRouter, HTTPException
from app.models.schemas import AdminLogin, TokenResp
from app.services.admin_service import authenticate_admin, create_jwt

router = APIRouter(prefix='/admin', tags=['admin'])

@router.post('/login', response_model=TokenResp)
async def login(payload: AdminLogin):
    admin = await authenticate_admin(payload.email, payload.password)
    if not admin:
        raise HTTPException(status_code=401, detail='Invalid credentials')
    token = create_jwt(admin)
    return {'access_token': token}
