"""
It keeps project's constants variables 
variables imported from environment
"""

import os
from urllib import parse
from dotenv import load_dotenv
from pydantic_settings import BaseSettings
from src.apis.v1.helper.log_manager import LogManager

## load env variables
load_dotenv()


class Settings(BaseSettings):
    """Class to represent project settings"""

    ## Project / App details
    PROJECT_NAME: str = "Manchester Turing Academy"
    HOST: str = "0.0.0.0"
    PORT: int = 8008
    STATIC_DIR_NAME: str = "static"
    COURSE_PDF_FILES_DIR: str = "static/course_pdfs"

    ## Database details
    DB_HOST: str = os.environ.get("DB_HOST")
    DB_NAME: str = os.environ.get("DB_NAME")
    DB_USER: str = os.environ.get("DB_USER")
    DB_PASSWORD: str = os.environ.get("DB_PASSWORD")
    DB_PORT: str = os.environ.get("DB_PORT")

    ## create DB URL
    DB_URL: str = (
        f"postgresql+psycopg2://{DB_USER}:{parse.quote_plus(DB_PASSWORD)}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )

    ## initialize log manager
    LOG_FILE_NAME: str = "SERVER_LOGS"
    LOG_MANAGER: LogManager = LogManager(log_file=LOG_FILE_NAME)

    ## App Security Settings
    ALGORITHM: str = "HS256"
    SECRET_KEY: str = os.environ.get("SECRET_KEY")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    ## Stripe
    STRIPE_SECRET: str = os.environ.get("STRIPE_SECRET_KEY")

    ## EMAIL CREDENTIALS
    EMAIL_SERVER_NAME: str = os.environ.get("EMAIL_SERVER_NAME")
    EMAIL_SERVER_PORT: int = int(os.environ.get("EMAIL_SERVER_PORT"))
    ADMIN_EMAIL: str = os.environ.get("ADMIN_EMAIL")
    ADMIN_EMAIL_PASSWORD: str = os.environ.get("ADMIN_EMAIL_PASSWORD")

    ## FRONTEND URL
    FRONTEND_URL: str = "http://localhost:5173/"


def settings():
    """To return settings object"""
    return Settings()
