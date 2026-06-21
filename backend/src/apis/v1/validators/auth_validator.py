"""This file has the validators responsible for validating auth API"""

from typing import Optional
from pydantic import BaseModel, Field


class AuthLoginRequestValidator(BaseModel):
    """To validate login request"""

    user_identity: str
    user_password: str


class ResetPasswordRequestValidator(BaseModel):
    """To validate a password reset request that verifies the user's
    identity (no email) before setting a new password."""

    user_identity: str
    first_name: str = Field(..., max_length=64)
    last_name: str = Field(..., max_length=64)
    company_name: Optional[str] = Field(None, max_length=64)
    new_password: str = Field(..., max_length=64)
    confirm_password: str = Field(..., max_length=64)
