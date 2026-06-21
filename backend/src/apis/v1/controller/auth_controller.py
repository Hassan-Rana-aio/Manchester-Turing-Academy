"""This file represents user controller and handle user related actions"""

from typing import List, Optional
from sqlalchemy import func
from sqlalchemy.orm import Session

from src.apis.v1.validators.auth_validator import (
    AuthLoginRequestValidator,
    ResetPasswordRequestValidator,
)
from src.apis.v1.models.user_model import User
from src.apis.v1.services.user_service import UserService
from src.apis.v1.exceptions.http_exceptions import get_http_400, get_http_401
from src.apis.v1.core.security import create_access_token, hash_md5


def _norm(value: Optional[str]) -> str:
    """Normalize a string for case/space-insensitive comparison."""
    return (value or "").strip().lower()


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

    def reset_password(self, params: ResetPasswordRequestValidator) -> None:
        """
        Reset a password without email: the user is identified by their
        username/email and their identity is verified against details held on
        the account (first name, last name, and company name when present).
        On a successful match the new password is set.
        """

        if params.new_password != params.confirm_password:
            raise get_http_400(
                exp_msg="New password and confirm password do not match"
            )

        user: Optional[User] = self._get_user_by_identity(
            user_identity=params.user_identity
        )

        ## generic message so we never reveal which specific detail was wrong
        mismatch = get_http_400(
            exp_msg="Account details do not match our records. Please check and try again."
        )

        if not user:
            raise mismatch

        ## verify the supplied identity details against the account
        if _norm(params.first_name) != _norm(user.first_name):
            raise mismatch

        if _norm(params.last_name) != _norm(user.last_name):
            raise mismatch

        ## when the account has a company name on file, require it to match too
        if user.company_name and _norm(params.company_name) != _norm(user.company_name):
            raise mismatch

        UserService(db=self.db).update_password(
            user=user, new_password=params.new_password
        )

        return None
