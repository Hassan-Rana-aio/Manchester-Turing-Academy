""" This file creates FAST API app and register items like Middleware, Routes etc"""

import os
from fastapi import FastAPI, staticfiles
from src.routes import registering_routes
from src.middleware import registering_middleware
from src.apis.v1.utils.http_exception_handler import add_custom_http_exception_handler
from src.apis.v1.core.project_settings import settings

proj_settings = settings()


def create_app() -> FastAPI:
    """To create and return FastAPI app and register it to items like middleware, routes etc"""

    ## init fastapi app
    app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)

    ## mount static folder
    app.mount(
        f"/{proj_settings.STATIC_DIR_NAME}",
        staticfiles.StaticFiles(directory=proj_settings.STATIC_DIR_NAME),
        name=proj_settings.STATIC_DIR_NAME,
    )
    # Ensure the upload folder exists
    os.makedirs(proj_settings.COURSE_PDF_FILES_DIR, exist_ok=True)

    ## register middleware
    registering_middleware(app=app)

    ## register routes
    registering_routes(app=app)

    ## add http exceptions handler
    add_custom_http_exception_handler(app=app)

    return app
