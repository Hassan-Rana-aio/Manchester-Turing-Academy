"""This file represents user controller and handle user related actions"""

from typing import List, Optional
from sqlalchemy.orm import Session
from src.apis.v1.models.course_types_model import CourseType
from src.apis.v1.core.project_settings import settings
from src.apis.v1.services.course_type_service import CourseTypesService

proj_settings = settings()


class CourseTypeController:
    """This class represent course controller"""

    def __init__(self, db: Session) -> None:
        self.db = db

    def get_courses_types(self) -> Optional[List[CourseType]]:
        """To fetch courses types - return all course types"""
        # get courses types
        response = CourseTypesService(db=self.db).get_course_types()

        # return
        return response
