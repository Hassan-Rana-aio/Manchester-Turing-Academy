"""This file represent the User Course Subscription modal"""

from sqlalchemy import Column, UUID, TIMESTAMP, VARCHAR, DECIMAL, TEXT, ForeignKey, func
from sqlalchemy.orm import relationship

from . import Base


class CourseSubscriptions(Base):
    """This class represent the User Courses Subscriptions modal"""

    __tablename__ = "user_course_subscriptions"

    course_subscription_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        index=True,
        server_default=func.uuid_generate_v4(),
    )
    course_id = Column(UUID, ForeignKey("course.course_id", ondelete="CASCADE"))
    user_id = Column(UUID, ForeignKey("user.user_id", ondelete="CASCADE"))
    amount = Column(DECIMAL(10, 2), nullable=False)
    stripe_session_id = Column(VARCHAR(512), nullable=False, unique=True)
    created_on = Column(TIMESTAMP, server_default=func.now())

    course = relationship("Course", backref="course_subscription")
    user = relationship("User", backref="user_subscription")

    def to_dict(self) -> dict:
        return {
            "course_subscription_id": self.course_subscription_id,
            "course_id": self.course_id,
            "user_id": self.user_id,
            "amount": self.amount,
            "created_on": self.created_on,
            "course": (
                {
                    "course_id": self.course.course_id,
                    "course_name": self.course.course_name,
                    "course_price": self.course.course_price,
                    "course_description": self.course.course_description,
                    "course_file_pdf": self.course.course_file_pdf,
                    "created_on": self.course.created_on,
                    "course_type_id": self.course.course_type_id,
                }
                if self.course
                else None
            ),
        }
