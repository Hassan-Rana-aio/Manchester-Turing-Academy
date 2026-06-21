# pylint: disable=E0401
""" Importing Modules """
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.apis.v1.constants.origins import origins


def registering_middleware(app: FastAPI):
    """
    Registers middleware for the given FastAPI application.

    Args:
        application: The FastAPI application instance to which middleware will be added.

    Returns:
        None

    Middleware added:
        - CORSMiddleware: Enables Cross-Origin Resource Sharing (CORS) for the application.

    Note:
        This function adds CORS middleware to the application with the specified configuration.
        It allows specified origins, credentials, methods, and headers for handling CORS requests.

    """
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "HEAD", "OPTIONS", "PUT", "DELETE", "PATCH"],
        allow_headers=[
            "Access-Control-Allow-Headers",
            "Set-Cookie",
            "Content-Type",
            "Authorization",
            "Access-Control-Allow-Origin",
        ],
    )
