"""
File to keep db session maker
It returns a generator object // used for Dependency Injection
"""

from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.apis.v1.core.project_settings import settings

## get project settings
proj_settings = settings()

SQLALCHEMY_DB_URL = proj_settings.DB_URL

## create engine
engine = create_engine(
    url=SQLALCHEMY_DB_URL,
)

## create session
local_session = sessionmaker(autocommit=False, autoflush=False, bind=engine)


## function to return db session as a generator
def get_db() -> Generator:
    """Returns a generator of DB session"""
    try:
        db = local_session()
        yield db

    finally:
        db.close()
