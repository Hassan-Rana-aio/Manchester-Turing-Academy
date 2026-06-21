"""This file represent services for course"""

from typing import Optional, List
from sqlalchemy.orm import Session

from src.apis.v1.models.course_types_model import CourseType


class CourseTypesService:
    """This class represent the Course Service"""

    def __init__(self, db: Session) -> None:
        """Constructor for course service - it sets db instance"""
        self.db: Session = db

    def get_course_types(self) -> Optional[List[CourseType]]:
        """It fetches courses types"""
        course_types = self.db.query(CourseType)

        course_types = course_types.all()

        return course_types
