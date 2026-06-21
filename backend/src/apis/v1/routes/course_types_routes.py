"""This file represent routes for course API"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.apis.v1.db.session import get_db
from src.apis.v1.controller.course_type_controller import CourseTypeController

router = APIRouter(prefix="/course_types")


@router.get(path="/", summary="This route is used to fetch course types")
def get_courses_types(
    db: Session = Depends(get_db),
) -> dict:
    """To fetch courses - filter courses by course name, id, type_id"""

    ## get courses
    response = CourseTypeController(db=db).get_courses_types()

    ## prepare response
    api_response = {"message": "Courses fetched successfully", "data": []}
    for course in response:
        api_response["data"].append(course.to_dict())

    # return
    return api_response
