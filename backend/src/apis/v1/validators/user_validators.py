"""This file includes validators for /user api"""

from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field


## Request Validators
class UserAddRequestValidator(BaseModel):
    """This class represent validator for create user api"""

    user_id: UUID = Field(None)
    first_name: str = Field(..., max_length=64)
    last_name: str = Field(..., max_length=64)
    username: str = Field(..., max_length=64)
    email: str = Field(..., max_length=64)
    password: str = Field(..., max_length=64)
    company_name: str = Field(None, max_length=64)
    company_region: str = Field(None, max_length=64)
    company_city: str = Field(None, max_length=64)
    is_admin: bool = Field(default=False)


class UserUpdateRequestValidator(BaseModel):
    """This class represent validator for update user api"""

    user_id: UUID
    first_name: Optional[str] = Field(None, max_length=64)
    last_name: Optional[str] = Field(None, max_length=64)
    username: Optional[str] = Field(None, max_length=64)
    email: Optional[str] = Field(None, max_length=64)
    password: Optional[str] = Field(None, max_length=64)
    company_name: Optional[str] = Field(None, max_length=64)
    company_region: Optional[str] = Field(None, max_length=64)
    company_city: Optional[str] = Field(None, max_length=64)
    is_admin: Optional[bool] = Field(False)
    new_password: Optional[str] = Field(None, max_length=64)
    confirm_password: Optional[str] = Field(None, max_length=64)


class UserGetRequestValidator(BaseModel):
    """To validate the user get request"""

    user_id: Optional[UUID] = Field(None)
    search: Optional[str] = Field(None)
    page_number: int = Field(default=0)
    page_size: Optional[int] = Field(None)
    username: Optional[str] = Field(None)
    email: Optional[str] = Field(None)


class UserDeleteRequestValidator(BaseModel):
    """This class represent validator for delete user api"""

    user_id: UUID
