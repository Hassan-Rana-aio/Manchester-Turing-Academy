"""
    To keep Declarative Base
    and all other models which needs to be added in DB 
"""

from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

from .user_model import User
from .course_types_model import CourseType
from .course import Course
from .course_subscriptions import CourseSubscriptions
