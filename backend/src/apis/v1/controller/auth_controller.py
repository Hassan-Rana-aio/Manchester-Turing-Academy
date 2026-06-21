"""This file represents user controller and handle user related actions"""

import secrets
from datetime import datetime, timedelta
from typing import List, Optional
from sqlalchemy import func
from sqlalchemy.orm import Session

from src.apis.v1.validators.auth_validator import (
    AuthLoginRequestValidator,
    ForgotPasswordRequestValidator,
    ResetPasswordRequestValidator,
)
from src.apis.v1.models.user_model import User
from src.apis.v1.services.user_service import UserService
from src.apis.v1.exceptions.http_exceptions import get_http_400, get_http_401
from src.apis.v1.core.security import create_access_token, hash_md5
from src.apis.v1.helper.send_email import otp_email

## How long a password reset OTP stays valid (matches the OTP email copy)
OTP_EXPIRY_MINUTES: int = 30


class AuthController:
    """This class represent user controller"""

    def __init__(self, db: Session) -> None:
        self.db = db

    def _get_user_by_identity(self, user_identity: str) -> Optional[User]:
        """To resolve a user by email first, then username (same as login)"""

        user: Optional[User] = UserService(db=self.db).get_user_by_email(
            user_email=user_identity
        )

        if not user:
            user = UserService(db=self.db).get_user_by_username(username=user_identity)

        return user

    def login(self, user_details: AuthLoginRequestValidator) -> str:
        """
        This function is for login to system
        It takes user identity, email or username
        and password
        """

        response: Optional[User] = self._get_user_by_identity(
            user_identity=user_details.user_identity
        )

        if not response or response.password != hash_md5(user_details.user_password):
            raise get_http_401(exp_msg="Failed to authenticate user")

        user_role: str = "admin" if response.is_admin else "user"

        ## get access token
        access_token: str = create_access_token(data=response.user_id, role=user_role)

        return access_token, user_role, response.user_id

    def forgot_password(self, params: ForgotPasswordRequestValidator) -> None:
        """
        Generate a one-time password (OTP), store it against the user with an
        expiry, and email it to the user. Always succeeds silently from the
        caller's view so account existence is not leaked.
        """

        user: Optional[User] = self._get_user_by_identity(
            user_identity=params.user_identity
        )

        ## if no user, do nothing (avoid leaking which accounts exist)
        if not user:
            return None

        ## generate a 6 digit OTP (cryptographically secure)
        otp: str = f"{secrets.randbelow(1000000):06d}"
        expiry = datetime.utcnow() + timedelta(minutes=OTP_EXPIRY_MINUTES)

        UserService(db=self.db).set_reset_otp(user=user, otp=otp, expiry=expiry)

        ## email the OTP to the user
        otp_email(otp=otp, user_email=user.email)

        return None

    def reset_password(self, params: ResetPasswordRequestValidator) -> None:
        """
        Verify the emailed OTP (and its expiry) and set the new password.
        """

        if params.new_password != params.confirm_password:
            raise get_http_400(
                exp_msg="New password and confirm password do not match"
            )

        user: Optional[User] = self._get_user_by_identity(
            user_identity=params.user_identity
        )

        if (
            not user
            or not user.reset_otp
            or user.reset_otp != params.otp
        ):
            raise get_http_400(exp_msg="Invalid OTP")

        if not user.reset_otp_expiry or user.reset_otp_expiry < datetime.utcnow():
            raise get_http_400(exp_msg="OTP has expired, please request a new one")

        UserService(db=self.db).update_password(
            user=user, new_password=params.new_password
        )

        return None
