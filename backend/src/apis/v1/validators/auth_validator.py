"""This file has the validators responsible for validating auth API"""

from pydantic import BaseModel, Field


class AuthLoginRequestValidator(BaseModel):
    """To validate login request"""

    user_identity: str
    user_password: str


class ForgotPasswordRequestValidator(BaseModel):
    """To validate forgot password request (sends OTP to user email)"""

    user_identity: str


class ResetPasswordRequestValidator(BaseModel):
    """To validate reset password request using the emailed OTP"""

    user_identity: str
    otp: str = Field(..., min_length=6, max_length=6)
    new_password: str = Field(..., max_length=64)
    confirm_password: str = Field(..., max_length=64)
