from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse


def add_custom_http_exception_handler(app: FastAPI):
    """
    To handle HTTP Exceptions
    It sends error message with key message as a JSONResponse
    """

    @app.exception_handler(HTTPException)
    async def custom_http_exception_handler(request, exc: HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"message": exc.detail},
            headers=exc.headers,
        )
