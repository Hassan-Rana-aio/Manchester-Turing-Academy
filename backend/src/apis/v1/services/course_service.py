"""This file represent services for course"""

from typing import Optional, List
from uuid import UUID
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import asc

from src.apis.v1.exceptions.http_exceptions import get_http_404
from src.apis.v1.models.course import Course
from src.apis.v1.models.course_types_model import CourseType
from src.apis.v1.validators.course_validator import (
    InValidatorAddCourse,
    InValidatorGetCourse,
    InValidatorUpdateCourse,
)


class CourseService:
    """This class represent the Course Service"""

    def __init__(self, db: Session) -> None:
        """Constructor for course service - it sets db instance"""
        self.db: Session = db

    def add_course(
        self, course: InValidatorAddCourse, commit_db: bool = True
    ) -> Course:
        """To add a new course"""

        course_obj: Course = Course(
            course_name=course.course_name,
            course_price=course.course_price,
            course_file_pdf=(
                course.course_file
                if isinstance(course.course_file, str)
                else course.course_file.filename
            ),
            course_type_id=course.course_type_id,
            course_description=course.course_description,
        )

        self.db.add(course_obj)
        if commit_db:
            self.db.commit()

        self.db.refresh(course_obj)

        return course_obj

    def get_course(
        self, courses_details: InValidatorGetCourse
    ) -> Optional[List[Course]]:
        """It fetches courses"""
        courses = self.db.query(Course).options(joinedload(Course.course_type))

        # filter courses
        if courses_details.course_id:
            courses = courses.filter(Course.course_id == courses_details.course_id)

        if courses_details.course_type_id:
            courses = courses.filter(
                Course.course_type_id == courses_details.course_type_id
            )

        if courses_details.course_name:
            courses = courses.filter(Course.course_name == courses_details.course_name)

        if courses_details.course_price:
            courses = courses.filter(
                Course.course_price == courses_details.course_price
            )

        if courses_details.search:
            search_pattern = f"%{courses_details.search}%"
            courses = courses.filter(Course.course_name.ilike(search_pattern))

        courses = courses.order_by(Course.course_name)

        if courses_details.page_size:
            courses = courses.limit(courses_details.page_size)

        courses = courses.offset(courses_details.page_number)

        courses = courses.all()

        return courses

    def get_courses_count(self, courses_details: InValidatorGetCourse) -> int:
        """It fetches courses"""
        courses = self.db.query(Course).options(joinedload(Course.course_type))

        # filter courses
        if courses_details.course_id:
            courses = courses.filter(Course.course_id == courses_details.course_id)

        if courses_details.course_type_id:
            courses = courses.filter(
                Course.course_type_id == courses_details.course_type_id
            )

        if courses_details.course_name:
            courses = courses.filter(Course.course_name == courses_details.course_name)

        if courses_details.course_price:
            courses = courses.filter(
                Course.course_price == courses_details.course_price
            )

        if courses_details.search:
            search_pattern = f"%{courses_details.search}%"
            courses = courses.filter(Course.course_name.ilike(search_pattern))

        courses_count = courses.count()

        return courses_count

    def update_course(self, params: InValidatorUpdateCourse, commit_db=True) -> Course:
        """To update a course information"""

        course: Course = (
            self.db.query(Course).filter(Course.course_id == params.course_id).first()
        )

        if not course:
            raise get_http_404(exp_msg="Course not found")

        if params.course_name:
            course.course_name = params.course_name

        if params.course_price:
            course.course_price = params.course_price

        if params.course_type_id:
            course.course_type_id = params.course_type_id

        if params.course_file:
            course.course_file_pdf = params.course_file

        if params.course_description:
            course.course_description = params.course_description

        ## commit changes
        if commit_db:
            self.db.commit()

        ## refresh db
        self.db.refresh(course)

        return course

    def delete_course(self, course_id: UUID, commit_db=True) -> Course:
        """This function deletes a course id, filters records by course id"""
        course: Course = (
            self.db.query(Course).filter(Course.course_id == course_id).first()
        )

        if not course:
            raise get_http_404("Course not found")

        self.db.delete(course)

        if commit_db:
            self.db.commit()

        return course
