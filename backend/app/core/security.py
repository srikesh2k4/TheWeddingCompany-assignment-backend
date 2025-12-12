from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt
from app.core.config import JWT_SECRET, JWT_ALGO, ACCESS_TOKEN_EXPIRE_MINUTES

pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")


def _truncate_for_bcrypt(password: str) -> bytes:
    """
    bcrypt limit = 72 BYTES (not characters),
    so truncate the UTF-8 encoded version.
    """
    return password.encode("utf-8")[:72]


def hash_password(password: str) -> str:
    raw = _truncate_for_bcrypt(password)
    return pwd_ctx.hash(raw)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    raw = _truncate_for_bcrypt(plain_password)
    return pwd_ctx.verify(raw, hashed_password)


def create_token(data: dict, minutes: int = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(
        minutes=(minutes or ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGO)


def decode_token(token: str) -> dict:
    return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])
