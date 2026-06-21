"""This file register all routes inside a function to fastapi app"""

from fastapi import FastAPI
from src.apis.v1.routes.user_routes import router as user_router
from src.apis.v1.routes.auth_routes import router as auth_router
from src.apis.v1.routes.course_routes import router as course_router
from src.apis.v1.routes.course_types_routes import router as course_types_router
from src.apis.v1.routes.subscription_routes import router as subscription_router

api_url: str = "/api/v1"


def registering_routes(app: FastAPI):
    """
    Registering all the routes
    """
    # User Router
    app.include_router(user_router, prefix=api_url, tags=["User"])

    # Auth Router
    app.include_router(auth_router, prefix=api_url, tags=["Authentication"])

    # Course Router
    app.include_router(course_router, prefix=api_url, tags=["Course"])

    # Course Type Routes
    app.include_router(course_types_router, prefix=api_url, tags=["Course Type"])

    # Subscriptions
    app.include_router(subscription_router, prefix=api_url, tags=["Subscriptions"])
