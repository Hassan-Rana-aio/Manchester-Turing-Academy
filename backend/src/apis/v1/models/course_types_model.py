"""This file represents the course type model"""

from sqlalchemy import Column, UUID, Integer, TIMESTAMP, VARCHAR, func
from sqlalchemy.orm import relationship

from . import Base


class CourseType(Base):
    """This class represent the Course Type modal"""

    __tablename__ = "course_type"

    course_type_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        index=True,
        server_default=func.uuid_generate_v4(),
    )
    course_type_name = Column(VARCHAR(128), nullable=False)
    created_on = Column(TIMESTAMP, server_default=func.now())

    def to_dict(self) -> dict:
        return {
            "course_type_id": self.course_type_id,
            "course_type_name": self.course_type_name,
        }
