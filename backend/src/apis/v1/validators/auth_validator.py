"""This file has the validators responsible for validating auth API"""

from pydantic import BaseModel, Field


class AuthLoginRequestValidator(BaseModel):
    """To validate login request"""

    user_identity: str
    user_password: str


class ResetPasswordRequestValidator(BaseModel):
    """To validate a password reset request that verifies the user's
    identity by email + username (no email is sent) before setting a new
    password."""

    email: str = Field(..., max_length=64)
    username: str = Field(..., max_length=64)
    new_password: str = Field(..., max_length=64)
    confirm_password: str = Field(..., max_length=64)
