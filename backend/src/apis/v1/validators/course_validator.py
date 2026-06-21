"""This file represent the validators to validate Course API"""

from uuid import UUID
from typing import Optional, Union
from fastapi import UploadFile
from pydantic import Field
from pydantic_settings import BaseSettings


class InValidatorAddCourse(BaseSettings):
    """Validator class for add course api"""

    course_name: str
    course_type_id: UUID
    course_price: float | int
    course_file: UploadFile | str
    course_description: Optional[str]


class InValidatorGetCourse(BaseSettings):
    """Validator class for get course api"""

    page_number: int = Field(0, ge=0)
    page_size: Optional[int] = Field(None, ge=0)
    course_name: Optional[str] = Field(None)
    course_id: Optional[UUID]
    course_type_id: Optional[UUID] = Field(None)
    course_price: Optional[Union[float, int]] = Field(None)
    search: Optional[str] = Field(None)


class InValidatorUpdateCourse(BaseSettings):
    """Validator class for update course api"""

    course_id: UUID
    course_name: Optional[str]
    course_type_id: Optional[UUID]
    course_description: Optional[str]
    course_price: Optional[float | int]
    course_file: Optional[UploadFile | str]
