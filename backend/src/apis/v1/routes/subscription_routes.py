"""This file represent routes for course API"""

import json
from uuid import UUID
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.apis.v1.db.session import get_db
from src.apis.v1.core.security import validate_jwt_token
from src.apis.v1.controller.subscription_controller import SubscriptionController
from src.apis.v1.validators.subscription_validator import InValidatorSubscription
from src.apis.v1.exceptions.http_exceptions import (
    get_http_400,
    get_http_401,
    get_http_404,
    get_http_409,
    get_http_501,
)

router = APIRouter(prefix="/subscription")


@router.post(path="/", summary="This route is used to handle course subscriptions")
async def handle_subscription(
    subscription_details: InValidatorSubscription,
    db: Session = Depends(get_db),
    current_user=Depends(validate_jwt_token),
):
    """To handle subscription of a course"""
    ## get current user id
    user_id: UUID = current_user["sub"]

    subscription_details = subscription_details.model_dump()
    subscription_details["course_id"] = str(subscription_details["course_id"])
    subscription_details["user_id"] = str(user_id)

    subscription_details = InValidatorSubscription(**subscription_details)

    ## handle subscription
    response = await SubscriptionController(db=db).handle_subscription(
        subscription_details=subscription_details
    )

    ## return response
    return response


@router.post(
    path="/payment_status", summary="This route is used to subscription status"
)
def get_payment_status(
    session_id: str,
    db: Session = Depends(get_db),
    _=Depends(validate_jwt_token),
):
    """To handle subscription of a course"""
    ## handle subscription
    response = SubscriptionController(db=db).get_payment_status(session_id=session_id)

    ## return response
    return response


@router.post(
    path="/update_course_subscription",
    summary="This route is used to update the course subscription",
)
def update_course_subscription(
    session_id: str,
    sessionToken: str,
    db: Session = Depends(get_db),
    _=Depends(validate_jwt_token),
):
    """To handle subscription of a course"""
    ## get user id and course id from session token
    token_details = validate_jwt_token(sessionToken)
    details = token_details["sub"]
    details = json.loads(details)
    user_id = details["user_id"]
    course_id = details["course_id"]
    course_price = (
        details["course_price"]
        if isinstance(details["course_price"], float)
        else float(details["course_price"])
    )

    ## verify sessionId is valid and paid
    payment_status = SubscriptionController(db=db).get_payment_status(
        session_id=session_id
    )

    if "unpaid" in payment_status.lower():
        raise get_http_400("Payment is unapid")

    elif "error" in payment_status.lower():
        raise get_http_400("Payment Error")

    elif "paid" == payment_status.lower():
        ## add to user_course_subscription

        ## handle subscription
        response = SubscriptionController(db=db).assign_course_to_user(
            course_price=course_price,
            course_id=course_id,
            user_id=user_id,
            session_id=session_id,
        )

        ## return response
        return response

    raise get_http_400("Course Assignment Failed")


@router.post(
    path="/verification",
    summary="This route is used to verify whether the user has subscribed to course or not",
)
def get_user_subscription(
    course_id: UUID,
    db: Session = Depends(get_db),
    current_user=Depends(validate_jwt_token),
):
    """To check whether the user accessing the course has the privileges to view course"""
    ## fetch user_id
    user_id = current_user["sub"]
    assert user_id, "User does not exist"

    response = SubscriptionController(db=db).check_user_subscription(
        user_id=user_id, course_id=course_id
    )

    response = True if response else False

    return {"subscription_status": response}
