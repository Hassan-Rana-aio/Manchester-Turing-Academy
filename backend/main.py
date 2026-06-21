"""This file creates fastapi app and execute it using uvicorn"""

import uvicorn
import load_env
from src import app_settings
from src.app import create_app

fastapi_app = create_app()

if __name__ == "__main__":
    # run the application using uvicorn
    uvicorn.run(
        "main:fastapi_app", host=app_settings.HOST, port=app_settings.PORT, reload=True
    )
