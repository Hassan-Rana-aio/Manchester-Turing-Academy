"""This file represent the Course modal"""

from sqlalchemy import Column, UUID, TIMESTAMP, VARCHAR, DECIMAL, TEXT, ForeignKey, func
from sqlalchemy.orm import relationship

from . import Base


class Course(Base):
    """This class represent the Course modal"""

    __tablename__ = "course"

    course_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        index=True,
        server_default=func.uuid_generate_v4(),
    )
    course_name = Column(VARCHAR(128), nullable=False)
    course_description = Column(TEXT, nullable=False)
    course_price = Column(DECIMAL(10, 2), nullable=False)
    course_file_pdf = Column(TEXT, nullable=True)
    created_on = Column(TIMESTAMP, server_default=func.now())

    course_type_id = Column(UUID, ForeignKey("course_type.course_type_id"))
    course_type = relationship("CourseType", backref="course")

    def to_dict(self) -> dict:
        return {
            "course_id": self.course_id,
            "course_name": self.course_name,
            "course_price": self.course_price,
            "course_description": self.course_description,
            "course_file_pdf": self.course_file_pdf,
            "created_on": self.created_on,
            "course_type_id": self.course_type_id,
            "course_type": (
                {
                    "course_type_id": str(self.course_type.course_type_id),
                    "course_type_name": self.course_type.course_type_name,
                }
                if self.course_type
                else None
            ),
        }
