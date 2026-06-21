"""
    This file represent the base file for the src module
    It imports the project settings
"""

from src.apis.v1.core.project_settings import settings

## get app / project settings
app_settings = settings()
