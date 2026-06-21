"""This file represents user controller and handle user related actions"""

import os
from uuid import UUID
from typing import List, Optional
from sqlalchemy.orm import Session
from fastapi import UploadFile
from fastapi.responses import FileResponse
from src.apis.v1.models.course import Course
from src.apis.v1.exceptions.http_exceptions import (
    get_http_400,
    get_http_401,
    get_http_404,
    get_http_409,
    get_http_501,
)
from src.apis.v1.utils.utils import save_file, get_filename
from src.apis.v1.utils.get_uuid import get_uuidv4
from src.apis.v1.core.project_settings import settings
from src.apis.v1.services.course_service import CourseService
from src.apis.v1.validators.course_validator import (
    InValidatorAddCourse,
    InValidatorGetCourse,
    InValidatorUpdateCourse,
)

proj_settings = settings()


class CourseController:
    """This class represent course controller"""

    def __init__(self, db: Session) -> None:
        self.db = db

    async def create_course(self, course: InValidatorAddCourse) -> Course:
        """To create a new course"""

        ## get filename and set it to course object
        file_name: str = get_filename(
            file_uuid=get_uuidv4(), filename=course.course_file.filename
        )
        ## get file object
        uploaded_file: UploadFile = course.course_file
        course.course_file = file_name

        ## check the file content type
        if uploaded_file.content_type != "application/pdf":
            raise get_http_404(exp_msg="Uploaded file must be a PDF")

        ## save the file to static folder
        save_file_path = os.path.join(proj_settings.COURSE_PDF_FILES_DIR, file_name)

        try:
            file_content = await uploaded_file.read()
        except Exception as e:
            raise get_http_501(exp_msg="Failed to add course") from e

        try:
            save_file(
                file_path=save_file_path,
                content=file_content,
                mode="wb",
                encoding=None,
            )
        except Exception as e:
            raise get_http_501(exp_msg="Failed to add course") from e

        ## save the information to db
        response = CourseService(db=self.db).add_course(course=course, commit_db=True)

        return response

    def get_courses(
        self, courses_details: InValidatorGetCourse
    ) -> Optional[List[Course]]:
        """To fetch courses - filter courses by course name, id, type_id"""
        # get courses
        response = CourseService(db=self.db).get_course(courses_details=courses_details)

        # return
        return response

    def get_courses_count(self, courses_details: InValidatorGetCourse) -> int:
        """It returns count of courses"""
        # get courses
        response = CourseService(db=self.db).get_courses_count(
            courses_details=courses_details
        )

        # return
        return response

    async def update_course(self, params: InValidatorUpdateCourse) -> Course:
        """To update a course"""

        ## Check whether course exists
        course_details: InValidatorGetCourse = InValidatorGetCourse(
            course_id=params.course_id
        )

        course = CourseService(db=self.db).get_course(courses_details=course_details)

        if not course:
            raise get_http_404(exp_msg="Course Not Found")

        ## save new file if updated
        if params.course_file:
            ## get filename and set it to course object
            file_name: str = get_filename(
                file_uuid=get_uuidv4(), filename=params.course_file.filename
            )
            ## get file object
            uploaded_file: UploadFile = params.course_file
            params.course_file = file_name

            ## check the file content type
            if uploaded_file.content_type != "application/pdf":
                raise get_http_404(exp_msg="Uploaded file must be a PDF")

            ## save the file to static folder
            save_file_path = os.path.join(proj_settings.COURSE_PDF_FILES_DIR, file_name)

            try:
                file_content = await uploaded_file.read()
            except Exception as e:
                raise get_http_501(exp_msg="Failed to add course") from e

            try:
                save_file(
                    file_path=save_file_path,
                    content=file_content,
                    mode="wb",
                    encoding=None,
                )
            except Exception as e:
                raise get_http_501(exp_msg="Failed to add course") from e

        response = CourseService(db=self.db).update_course(params=params)

        return response

    def delete_course(self, course_id: UUID) -> Course:
        """To delete a course by course id"""
        ## Check whether course exists
        course_details: InValidatorGetCourse = InValidatorGetCourse(course_id=course_id)
        course = CourseService(db=self.db).get_course(courses_details=course_details)
        if not course:
            raise get_http_404(exp_msg="Course Not Found")

        ## delete the course
        course = CourseService(db=self.db).delete_course(course_id=course_id)

        return course

    def fetch_course_file(
        self, course_id: UUID, user_id: UUID, current_user_role: str
    ) -> FileResponse:
        """It authorized user and fetches course associated file"""
        ## check whether course exists or not
        course_details: InValidatorGetCourse = InValidatorGetCourse(course_id=course_id)
        course: Optional[List[Course]] = CourseService(db=self.db).get_course(
            courses_details=course_details
        )

        if not course:
            proj_settings.LOG_MANAGER.log(
                "error", f"Course with id {course_id} not found"
            )
            raise get_http_404("Invalid Course Id")

        file_name: str = course[0].course_file_pdf
        course_file_complete_path: str = os.path.join(
            proj_settings.COURSE_PDF_FILES_DIR, file_name
        )

        if current_user_role != "admin":
            ## check whether user has subscribed to course or not
            pass

        ## fetch the file and send it back

        if not os.path.exists(course_file_complete_path):
            raise get_http_404("File Not Found")

        return FileResponse(
            path=course_file_complete_path,
            filename=file_name,
            media_type="application/pdf",
        )
