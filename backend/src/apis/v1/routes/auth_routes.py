"""This file has the routes responsible for authentication"""

from fastapi import APIRouter, Depends, Query
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from src.apis.v1.validators.auth_validator import (
    AuthLoginRequestValidator,
    ResetPasswordRequestValidator,
)
from src.apis.v1.utils.get_uuid import get_uuidv4
from src.apis.v1.controller.auth_controller import AuthController
from src.apis.v1.helper.log_manager import LogManager
from src.apis.v1.db.session import get_db
from src.apis.v1.core.project_settings import settings

proj_settings = settings()
logger: LogManager = proj_settings.LOG_MANAGER

router = APIRouter()


@router.post("/auth/signin", summary="This Route is used to login to the system")
async def login(
    params: AuthLoginRequestValidator,
    db: Session = Depends(get_db),
):
    """
    This route is used to login to system
    """
    logger.log("info", "Performing Login")
    response, role, user_id = AuthController(db=db).login(user_details=params)
    message = "User authenticated successfully"
    return {
        "access_token": response,
        "user_role": role,
        "message": message,
        "user_id": user_id,
    }


@router.post(
    "/auth/reset-password",
    summary="Reset the password after verifying the user's identity (no email)",
)
async def reset_password(
    params: ResetPasswordRequestValidator,
    db: Session = Depends(get_db),
):
    """
    This route verifies the user's identity details and sets the new password.
    """
    logger.log("info", "Performing Reset Password")
    AuthController(db=db).reset_password(params=params)
    return {"message": "Password has been reset successfully"}


@router.post("/token", summary="This Route is used to login to the system")
async def token_login(
    params: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    """
    This route is used to login to system
    """
    logger.log("info", "Performing Login")
    params: AuthLoginRequestValidator = AuthLoginRequestValidator(
        user_identity=params.username, user_password=params.password
    )
    response, role, user_id = AuthController(db=db).login(user_details=params)
    message = "User authenticated successfully"
    return {
        "access_token": response,
        "user_role": role,
        "message": message,
        "user_id": user_id,
    }
