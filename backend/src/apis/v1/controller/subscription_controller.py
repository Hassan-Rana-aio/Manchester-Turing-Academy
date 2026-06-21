"""This file represents user controller and handle user related actions"""

import os
import json
from urllib.parse import urljoin
from uuid import UUID
from typing import List, Optional
from fastapi import Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import stripe
from src.apis.v1.helper.send_email import course_assignment_email
from src.apis.v1.services.course_service import CourseService
from src.apis.v1.services.user_service import UserService
from src.apis.v1.validators.course_validator import InValidatorGetCourse
from src.apis.v1.core.security import create_access_token
from src.apis.v1.exceptions.http_exceptions import (
    get_http_400,
    get_http_404,
)
from src.apis.v1.models.course_subscriptions import CourseSubscriptions
from src.apis.v1.services.subscription_service import SubscriptionService
from src.apis.v1.core.project_settings import settings
from src.apis.v1.validators.subscription_validator import InValidatorSubscription

proj_settings = settings()

stripe.api_key = proj_settings.STRIPE_SECRET


class SubscriptionController:
    """This class represent course controller"""

    def __init__(self, db: Session) -> None:
        self.db = db

    async def handle_subscription(self, subscription_details: InValidatorSubscription):
        try:
            ## get user_details in a dictionary
            user_information = {
                "user_id": subscription_details.user_id,
                "course_id": subscription_details.course_id,
                "course_price": subscription_details.amount,
            }

            ## convert dictionary to string
            user_information = json.dumps(user_information)

            ## create token
            token = create_access_token(data=user_information)

            checkout_session = stripe.checkout.Session.create(
                payment_method_types=["card"],
                line_items=[
                    {
                        "price_data": {
                            "currency": "usd",
                            "unit_amount": int(subscription_details.amount * 100),
                            "product_data": {
                                "name": f"Course - {subscription_details.course_name}",
                                "metadata": {
                                    "course_id": subscription_details.course_id,
                                    "user_id": subscription_details.user_id,
                                },
                            },
                        },
                        "quantity": 1,
                    }
                ],
                metadata={
                    "course_id": subscription_details.course_id,
                    "user_id": subscription_details.user_id,
                },
                mode="payment",
                success_url=urljoin(
                    proj_settings.FRONTEND_URL,
                    f"/payment/success?session_id={{CHECKOUT_SESSION_ID}}&sessionToken={token}&courseId={subscription_details.course_id}",
                ),
                cancel_url=urljoin(
                    proj_settings.FRONTEND_URL,
                    f"/payment/cancel?courseId={subscription_details.course_id}",
                ),
            )

            return {"session_id": checkout_session.id, "url": checkout_session.url}

        except Exception as e:
            proj_settings.LOG_MANAGER.log(
                "error",
                f"Subscription failed with an error {e} for data {subscription_details}",
            )
            raise get_http_400(exp_msg="Subscription Failed")

    def get_payment_status(self, session_id: str):
        try:
            session = stripe.checkout.Session.retrieve(session_id)
            return session.payment_status
        except Exception as e:
            proj_settings.LOG_MANAGER.log("error", f"Error retrieving session: {e}")
        return "Error"

    def check_user_subscription(
        self, user_id: UUID, course_id: UUID
    ) -> Optional[CourseSubscriptions]:
        response = SubscriptionService(db=self.db).get_course_subscription(
            course_id=course_id, user_id=user_id
        )

        return response

    def assign_course_to_user(
        self, course_id: UUID, user_id: UUID, session_id: str, course_price: float
    ):

        # fetch user by id
        user = UserService(db=self.db).get_user_by_id(user_id=user_id)

        if not user:
            raise get_http_404(exp_msg="User not found")

        course_filter = InValidatorGetCourse(course_id=course_id)

        course = CourseService(db=self.db).get_course(courses_details=course_filter)

        if not course:
            raise get_http_404(exp_msg="Course not found")

        course = course[0]

        ## get course price
        response = SubscriptionService(db=self.db).course_to_user_assignment(
            course_id=course_id,
            user_id=user_id,
            session_id=session_id,
            course_price=course_price,
        )

        ## send email to user
        course_assignment_email(
            user_email=user.email,
            user_name=user.username,
            course_name=course.course_name,
            course_price=course_price,
        )

        return response
