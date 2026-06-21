"""This file represent services for course"""

from typing import Optional, List
from uuid import UUID
from sqlalchemy import and_
from sqlalchemy.orm import Session

from src.apis.v1.exceptions.http_exceptions import get_http_404
from src.apis.v1.models.course_subscriptions import CourseSubscriptions


class SubscriptionService:
    """This class represent the Course Service"""

    def __init__(self, db: Session) -> None:
        """Constructor for course service - it sets db instance"""
        self.db: Session = db

    def get_course_subscription(
        self, course_id: UUID, user_id: UUID
    ) -> Optional[CourseSubscriptions]:
        subscription = (
            self.db.query(CourseSubscriptions)
            .filter(
                and_(
                    (CourseSubscriptions.course_id == course_id),
                    (CourseSubscriptions.user_id == user_id),
                )
            )
            .first()
        )

        if not subscription:
            return None

        return subscription

    def course_to_user_assignment(
        self, course_id: UUID, user_id: UUID, session_id: str, course_price: float
    ):
        subscription_object = CourseSubscriptions(
            course_id=course_id,
            user_id=user_id,
            amount=course_price,
            stripe_session_id=session_id,
        )

        self.db.add(subscription_object)
        self.db.commit()

        self.db.refresh(subscription_object)

        return subscription_object
