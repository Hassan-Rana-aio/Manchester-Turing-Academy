"""This file includes database queries for model user"""

from typing import Optional, List
from sqlalchemy import asc, func
from sqlalchemy.orm import Session

from src.apis.v1.helper.log_manager import LogManager
from src.apis.v1.models.user_model import User
from src.apis.v1.validators.user_validators import (
    UserAddRequestValidator,
    UserDeleteRequestValidator,
    UserGetRequestValidator,
    UserUpdateRequestValidator,
)

from src.apis.v1.exceptions.http_exceptions import get_http_404
from src.apis.v1.core.project_settings import settings

proj_settings = settings()

logger: LogManager = proj_settings.LOG_MANAGER


class UserService:
    """This class represent user service and execute queries to DB w.r.t user model"""

    def __init__(self, db: Session) -> None:
        self.db = db

    def add_user(self, user_details: UserAddRequestValidator, commit_db=True) -> User:
        """To add a new user to DB"""
        user_obj: User = User(
            user_id=user_details.user_id,
            first_name=user_details.first_name,
            last_name=user_details.last_name,
            username=user_details.username,
            email=user_details.email,
            password=func.MD5(user_details.password),
            company_name=user_details.company_name,
            company_region=user_details.company_region,
            company_city=user_details.company_city,
            is_admin=user_details.is_admin,
        )

        self.db.add(user_obj)
        if commit_db:
            self.db.commit()

        self.db.refresh(user_obj)

        return user_obj

    def get_users(self, params: UserGetRequestValidator) -> Optional[List[User]]:
        """
        To get users
        it return records being search by username / first_name / email / user_id
        """

        user_records = self.db.query(User)

        if params.username:
            user_records = user_records.filter(User.username == params.username)

        if params.email:
            user_records = user_records.filter(User.email == params.email)

        if params.user_id:
            user_records = user_records.filter(User.user_id == params.user_id)

        if params.search:
            search_pattern = f"%{params.search}%"
            user_records = user_records.filter(User.first_name.ilike(search_pattern))

        user_records = user_records.order_by(asc(User.created_on))
        user_records = user_records.order_by(asc(User.first_name))

        if params.page_size:
            user_records = user_records.limit(params.page_size)

        user_records = user_records.offset(params.page_number)

        user_records = user_records.all()

        return user_records

    def get_users_count(self, params: UserGetRequestValidator) -> int:
        """
        It returns the count of users for specific conditions
        Developed for handling pagination
        """
        user_records = self.db.query(User)

        if params.username:
            user_records = user_records.filter(User.username == params.username)

        if params.email:
            user_records = user_records.filter(User.email == params.email)

        if params.user_id:
            user_records = user_records.filter(User.user_id == params.user_id)

        if params.search:
            search_pattern = f"%{params.search}%"
            user_records = user_records.filter(User.first_name.ilike(search_pattern))

        user_record_count = user_records.count()

        return user_record_count

    def update_user(self, params: UserUpdateRequestValidator, commit_db=True) -> User:
        """To update user information
        based on user id
        """

        # get user by user id
        user: User = self.db.query(User).filter(User.user_id == params.user_id).first()

        if not user:
            raise get_http_404(exp_msg="User not found")

        if params.email:
            user.email = params.email

        if params.username:
            user.username = params.username

        if params.first_name:
            user.first_name = params.first_name

        if params.last_name:
            user.last_name = params.last_name

        if params.password:
            user.password = func.MD5(params.password)

        if params.company_name:
            user.company_name = params.company_name

        if params.company_region:
            user.company_region = params.company_region

        if params.company_city:
            user.company_city = params.company_city

        user.is_admin = params.is_admin

        if commit_db:
            self.db.commit()

        self.db.refresh(user)

        return user

    def delete_user(self, params: UserDeleteRequestValidator, commit_db=True) -> User:
        """To update user information
        based on user id
        """

        # get user by user id
        user: User = self.db.query(User).filter(User.user_id == params.user_id).first()

        if not user:
            raise get_http_404(exp_msg="User not found")

        self.db.delete(user)

        if commit_db:
            self.db.commit()

        return user

    def get_user_by_email(self, user_email: str) -> Optional[User]:
        """
        To get user
        it return user object search by email
        """

        user_records = self.db.query(User)
        user_records = user_records.filter(User.email == user_email)
        user_records = user_records.first()
        return user_records

    def get_user_by_id(self, user_id: str) -> Optional[User]:
        """
        To get user
        it return user object search by user id
        """

        user_records = self.db.query(User)
        user_records = user_records.filter(User.user_id == user_id)
        user_records = user_records.first()
        return user_records

    def get_user_by_username(self, username: str) -> Optional[User]:
        """
        To get user
        it return user object search by username
        """

        user_records = self.db.query(User)
        user_records = user_records.filter(User.username == username)
        user_records = user_records.first()
        return user_records

    def set_reset_otp(self, user: User, otp: str, expiry, commit_db=True) -> User:
        """To store a password reset OTP and its expiry against a user"""

        user.reset_otp = otp
        user.reset_otp_expiry = expiry

        if commit_db:
            self.db.commit()

        self.db.refresh(user)

        return user

    def update_password(self, user: User, new_password: str, commit_db=True) -> User:
        """To set a new password for a user and clear any reset OTP"""

        user.password = func.MD5(new_password)
        user.reset_otp = None
        user.reset_otp_expiry = None

        if commit_db:
            self.db.commit()

        self.db.refresh(user)

        return user
