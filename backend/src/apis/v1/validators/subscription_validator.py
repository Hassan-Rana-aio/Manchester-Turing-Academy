"""This file represent the validators to validate Course API"""

from uuid import UUID
from typing import Optional, Union
from pydantic import Field
from pydantic_settings import BaseSettings


class InValidatorSubscription(BaseSettings):
    """Validator class for add course_subscription api"""

    course_id: Union[UUID, str]
    course_name: str
    user_id: Optional[Union[UUID, str]] = Field(None)
    amount: float


class InValidatorSubscriptionUserMustExists(BaseSettings):
    """Validator class for add course_subscription api"""

    course_id: UUID
    user_id: UUID
    amount: float
