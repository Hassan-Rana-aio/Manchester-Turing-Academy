"""This file represent routes for course API"""

from typing import Optional, Union
from uuid import UUID
from fastapi import APIRouter, UploadFile, Depends, Query, File
from sqlalchemy.orm import Session
from src.apis.v1.db.session import get_db
from src.apis.v1.models.course import Course
from src.apis.v1.core.security import validate_jwt_token
from src.apis.v1.controller.course_controller import CourseController
from src.apis.v1.core.project_settings import settings
from src.apis.v1.helper.log_manager import LogManager
from src.apis.v1.validators.course_validator import (
    InValidatorAddCourse,
    InValidatorGetCourse,
    InValidatorUpdateCourse,
)
from src.apis.v1.exceptions.http_exceptions import get_http_403

proj_settings = settings()
logger: LogManager = proj_settings.LOG_MANAGER

router = APIRouter(prefix="/course")


@router.post(path="/", summary="This route is used to create a new course")
async def create_course(
    file: UploadFile,
    course_name: str,
    course_price: float | int,
    course_type_id: UUID,
    course_description: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user=Depends(validate_jwt_token),
) -> dict:
    """To create a new course"""
    if (
        isinstance(current_user["role"], str)
        and current_user["role"].lower() != "admin"
    ):
        logger.log(
            "critical",
            f"Unauthorized user {current_user} trying to add a new course {course_name}",
        )
        raise get_http_403(exp_msg="You are not authorized to perform the action")

    ## gather course information in one object using Validator
    course: InValidatorAddCourse = InValidatorAddCourse(
        course_name=course_name,
        course_price=course_price,
        course_type_id=course_type_id,
        course_file=file,
        course_description=course_description,
    )

    ## add course - pass to controller - get response
    response: Course = await CourseController(db=db).create_course(course=course)

    response = {"message": "New course added successfully", "data": response.to_dict()}
    return response


@router.get(path="/", summary="This route is used to fetch new course")
def get_courses(
    course_name: Optional[str] = Query(None),
    course_type_id: Optional[UUID] = Query(None),
    course_id: Optional[UUID] = Query(None),
    course_price: Optional[float] = Query(None),
    page_size: Optional[int] = Query(None),
    page_number: int = Query(0),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
) -> dict:
    """To fetch courses - filter courses by course name, id, type_id"""

    ## gather all information in a validator object
    get_course_obj: InValidatorGetCourse = InValidatorGetCourse(
        course_id=course_id,
        course_name=course_name,
        course_price=course_price,
        course_type_id=course_type_id,
        page_number=page_number,
        page_size=page_size,
        search=search,
    )

    ## get courses
    response = CourseController(db=db).get_courses(courses_details=get_course_obj)
    courses_counts = CourseController(db=db).get_courses_count(
        courses_details=get_course_obj
    )
    ## prepare response
    api_response = {
        "message": "Courses fetched successfully",
        "data": [],
        "total_count": courses_counts,
    }
    for course in response:
        api_response["data"].append(course.to_dict())

    # return
    return api_response


@router.patch(path="/", summary="This route is used to update a course")
async def update_course(
    course_id: UUID,
    file: Optional[Union[UploadFile, str]] = File(None),
    course_name: Optional[str] = Query(None),
    course_price: Optional[Union[float, int]] = Query(None),
    course_description: Optional[str] = Query(None),
    course_type_id: Optional[UUID] = Query(None),
    db: Session = Depends(get_db),
    current_user=Depends(validate_jwt_token),
):
    """To update a course, it takes course id and other details
    and update information by course id"""
    if (
        isinstance(current_user["role"], str)
        and current_user["role"].lower() != "admin"
    ):
        logger.log(
            "critical",
            f"Unauthorized user {current_user} trying to update a new course {course_id}",
        )
        raise get_http_403(exp_msg="You are not authorized to perform the action")

    course_obj: InValidatorUpdateCourse = InValidatorUpdateCourse(
        course_id=course_id,
        course_type_id=course_type_id,
        course_name=course_name,
        course_price=course_price,
        course_file=file,
        course_description=course_description,
    )

    # get response
    response = await CourseController(db=db).update_course(params=course_obj)
    response = {"message": "Course updated successfully", "data": response.to_dict()}
    return response


@router.delete(path="/", summary="This route is used to delete a course")
def delete_course(
    course_id: UUID,
    current_user=Depends(validate_jwt_token),
    db: Session = Depends(get_db),
):
    """To update a course, it takes course id and other details
    and update information by course id"""
    if (
        isinstance(current_user["role"], str)
        and current_user["role"].lower() != "admin"
    ):
        logger.log(
            "critical",
            f"Unauthorized user {current_user} trying to delete a course {course_id}",
        )
        raise get_http_403(exp_msg="You are not authorized to perform the action")

    # get response
    response = CourseController(db=db).delete_course(course_id=course_id)
    response = {"message": "Course deleted successfully", "data": response.to_dict()}
    return response


@router.put(
    path="/", summary="This route is used to fetch user associated selected course file"
)
def get_file(
    course_id: UUID,
    current_user=Depends(validate_jwt_token),
    db: Session = Depends(get_db),
):
    """To get course file - it receives course id and authenticates and authorized user
    and send response"""
    ## get user id
    assert "sub" in current_user, "Invalid Request"
    assert "role" in current_user, "Invalid Request"
    current_user_id = current_user["sub"]
    current_user_role = current_user["role"]

    ## fetch the file
    response = CourseController(db=db).fetch_course_file(
        course_id=course_id,
        user_id=current_user_id,
        current_user_role=current_user_role,
    )

    return response
