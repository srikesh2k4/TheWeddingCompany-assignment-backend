from pydantic import BaseModel, EmailStr
from typing import Optional

class OrgCreate(BaseModel):
    organization_name: str
    email: EmailStr
    password: str

class OrgUpdate(BaseModel):
    new_organization_name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None

class AdminLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResp(BaseModel):
    access_token: str
    token_type: str = "bearer"
