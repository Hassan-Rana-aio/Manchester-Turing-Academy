"""This file represents user controller and handle user related actions"""

from typing import List, Optional
from sqlalchemy.orm import Session

from src.apis.v1.exceptions.http_exceptions import (
    get_http_400,
    get_http_401,
    get_http_404,
    get_http_409,
    get_http_403,
)
from src.apis.v1.models.user_model import User
from src.apis.v1.services.user_service import UserService
from src.apis.v1.validators.user_validators import (
    UserAddRequestValidator,
    UserDeleteRequestValidator,
    UserGetRequestValidator,
    UserUpdateRequestValidator,
)
from src.apis.v1.core.security import hash_md5


class UserController:
    """This class represent user controller"""

    def __init__(self, db: Session) -> None:
        self.db = db

    def create_user(self, user_details: UserAddRequestValidator) -> User:
        """
        To create a user it takes user_details object
        first it checks username, and email existence
        if username / email already exists it throws error
        """
        ## hash the password

        response = UserService(db=self.db).add_user(user_details=user_details)

        return response

    def get_users(self, params: UserGetRequestValidator) -> Optional[List[User]]:
        """
        Returns list of users
        search users by user_id / username / first_name / email
        return limited records with dynamic start point aka offset
        """

        ## get user records
        response = UserService(db=self.db).get_users(params=params)

        return response

    def get_users_count(self, params: UserGetRequestValidator) -> int:
        """
        Returns count of users
        search users by user_id / username / first_name / email
        return limited records with dynamic start point aka offset
        """

        ## get user records
        response = UserService(db=self.db).get_users_count(params=params)

        return response

    def update_user(
        self, params: UserUpdateRequestValidator, is_admin=None
    ) -> Optional[User]:
        """To update a user based on user id"""

        ## make sure user exists for the id
        user_record = UserService(db=self.db).get_user_by_id(user_id=params.user_id)

        if not user_record:
            raise get_http_404(exp_msg="User Not Found")

        ## if new_password exists verify the current_password
        if not is_admin and user_record.password != hash_md5(params.password):
            raise get_http_401(exp_msg="Incorrect User Current Password")

        ## verify username does not exists
        if user_record.username != params.username and UserService(
            db=self.db
        ).get_user_by_username(params.username):
            raise get_http_409(exp_msg="Username already exists")

        ## verify user email does not exists
        if user_record.email != params.email and UserService(
            db=self.db
        ).get_user_by_email(params.email):
            raise get_http_409(exp_msg="Email already exists")

        # update with new password
        if params.new_password and params.new_password == params.confirm_password:
            params.password = params.new_password

        # update with new password
        elif params.new_password and params.new_password != params.confirm_password:
            raise get_http_400(exp_msg="New password and confirm new password mismatch")

        if not is_admin and params.is_admin:
            raise get_http_403(exp_msg="You are not authorized to perform this action")

        ## update the user
        response = UserService(db=self.db).update_user(params=params)

        # return
        return response

    def delete_user(self, params: UserDeleteRequestValidator) -> Optional[User]:
        """To update a delete based on user id"""

        ## validate username and user email using decorator

        ## update the user
        response = UserService(db=self.db).delete_user(params=params)

        # return
        return response
