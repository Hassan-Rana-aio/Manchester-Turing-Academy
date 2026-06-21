# pylint: disable=E0401
""" Importing Modules """

import hashlib
from datetime import datetime, timedelta
from typing import Any, Union
from jwt import encode, decode, PyJWTError
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext

from src.apis.v1.core.project_settings import settings

proj_settings = settings()

ALGORITHM, SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES = (
    proj_settings.ALGORITHM,
    proj_settings.SECRET_KEY,
    proj_settings.ACCESS_TOKEN_EXPIRE_MINUTES,
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/token")


def create_access_token(
    data: Union[str, Any], expires_delta: timedelta = None, role: str = None
) -> str:
    """To create access token for any type of data with role and expiry time"""
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"exp": expire, "sub": str(data), "token_type": "access", "role": role}
    encoded_jwt = encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def validate_jwt_token(token: str = Depends(oauth2_scheme)):
    """Function to validate the JWT Token"""
    try:
        # decode the token
        decoded_token = decode(token, SECRET_KEY, ALGORITHM)

        # get username / email
        user_value = decoded_token.get("sub")

        # If nothing exists in 'sub' key then it is an invalid token
        if not user_value:
            raise HTTPException(status_code=401, detail="Invalid Token")

    except PyJWTError as e:
        proj_settings.LOG_MANAGER.log("error", f"Exception - Failed with an error {e}")
        raise (
            HTTPException(status_code=403, detail="Invalid Token")
            if "expired" in str(e)
            else HTTPException(status_code=401, detail="Invalid Token")
        ) from e

    return decoded_token


def hash_md5(input_string: str) -> str:
    # Create an MD5 hash object
    md5_hash = hashlib.md5()

    # Update the hash object with the bytes of the input string
    md5_hash.update(input_string.encode("utf-8"))

    # Return the hexadecimal representation of the hash
    return md5_hash.hexdigest()
