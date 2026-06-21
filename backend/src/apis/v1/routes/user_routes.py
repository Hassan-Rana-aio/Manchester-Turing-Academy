"""This file includes routes needed for /user api"""

from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from src.apis.v1.utils.get_uuid import get_uuidv4
from src.apis.v1.controller.user_controller import UserController
from src.apis.v1.helper.log_manager import LogManager
from src.apis.v1.db.session import get_db
from src.apis.v1.core.project_settings import settings
from src.apis.v1.core.security import validate_jwt_token
from src.apis.v1.validators.user_validators import (
    UserAddRequestValidator,
    UserDeleteRequestValidator,
    UserGetRequestValidator,
    UserUpdateRequestValidator,
)
from src.apis.v1.exceptions.http_exceptions import get_http_409, get_http_403
from src.apis.v1.helper.send_email import welcome_email

proj_settings = settings()
logger: LogManager = proj_settings.LOG_MANAGER

router = APIRouter(prefix="/user")


@router.post("/", summary="This Route is used to create a new user.")
async def create_user(params: UserAddRequestValidator, db: Session = Depends(get_db)):
    """
    This route is used to create a new user.
    """

    logger.log("info", "Creating user /User POST")
    params.user_id = get_uuidv4()
    try:
        response = UserController(db=db).create_user(user_details=params)
        message = "User created successfully"
        welcome_email(
            user_email=response.email,
            user_name=f"{response.first_name} {response.last_name}",
        )

    except IntegrityError as ie:
        proj_settings.LOG_MANAGER.log(
            "error", f"Failed to create user with params {params} and error {ie}"
        )
        raise get_http_409(exp_msg="Username / Email already exists") from ie

    return {"data": response, "message": message}


## Add another API to get user data based on api
## // or differentiate results / response based on user type
@router.get("/", summary="This Route is used to get users.")
async def get_user(
    page_size: Optional[int] = Query(
        None, description="To get limited records upto page size. Skip for all records"
    ),
    page_number: int = Query(
        0, description="Offset from where to get records, default to 0"
    ),
    user_id: Optional[UUID] = Query(None, description="User Id"),
    search: Optional[str] = Query(None, description="Search user by first name"),
    username: Optional[str] = Query(None, description="Search user by user name"),
    email: Optional[str] = Query(None, description="Search user by email"),
    db: Session = Depends(get_db),
    current_user=Depends(validate_jwt_token),
):
    """
    This route is used to create a new user.
    """
    logger.log("info", "Fetching user /User GET")

    ## prepare params for fetching users
    params: UserGetRequestValidator = UserGetRequestValidator(
        email=email,
        username=username,
        search=search,
        user_id=user_id,
        page_number=page_number,
        page_size=page_size,
    )

    ## get users data
    response = UserController(db=db).get_users(params=params)
    ## get user response
    count_response = UserController(db=db).get_users_count(params=params)
    api_response: Optional[List[dict]] = []
    for sub_response in response:
        sup_resp_dict_data = sub_response.to_dict()
        ## remove password and is_admin
        del sup_resp_dict_data["password"]
        if current_user["role"].lower() != "admin":
            del sup_resp_dict_data["is_admin"]
        api_response.append(sup_resp_dict_data)

    message = "User fetched successfully"
    return {"data": api_response, "total_count": count_response, "message": message}


@router.patch("/", summary="This Route is used to update a user.")
async def update_user(
    user_details: UserUpdateRequestValidator,
    db: Session = Depends(get_db),
    current_user=Depends(validate_jwt_token),
):
    """
    This route is used to update user.
    """
    if (
        isinstance(current_user["role"], str)
        and current_user["role"].lower() != "admin"
        and current_user["role"].lower() != "user"
    ):
        logger.log(
            "critical",
            f"Unauthorized user {current_user} trying to update the user {user_details}",
        )
        raise get_http_403(exp_msg="You are not authorized to perform the action")

    logger.log("info", "Modifying user /User PATCH")
    # get role of current user
    is_admin = None

    try:
        is_admin = current_user.get("role").lower() == "admin"
    except Exception as e:
        proj_settings.LOG_MANAGER.log(
            "error",
            f"Failed to set is_admin role with an error {e} for data {current_user}",
        )

    try:
        response = UserController(db=db).update_user(
            params=user_details, is_admin=is_admin
        )
    except IntegrityError as ie:
        proj_settings.LOG_MANAGER.log(
            "error", f"Failed to create user with params {user_details} and error {ie}"
        )
        raise get_http_409(exp_msg="Username / Email already exists") from ie

    message = "User updated successfully"
    return {"data": response, "message": message}


@router.delete("/", summary="This Route is used to delete a user.")
async def delete_user(
    user_details: UserDeleteRequestValidator,
    db: Session = Depends(get_db),
    current_user=Depends(validate_jwt_token),
):
    """
    This route is used to update user.
    """

    if (
        isinstance(current_user["role"], str)
        and current_user["role"].lower() != "admin"
    ):
        logger.log(
            "critical",
            f"Unauthorized user {current_user} trying to delete the user {user_details}",
        )
        raise get_http_403(exp_msg="You are not authorized to perform the action")

    logger.log("info", "Deleting user /User DELETE")
    response = UserController(db=db).delete_user(params=user_details)
    message = "User deleted successfully"
    return {"data": response, "message": message}
