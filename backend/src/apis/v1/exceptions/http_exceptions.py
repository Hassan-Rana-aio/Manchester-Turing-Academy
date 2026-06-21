"""This file has all HTTP exceptions methods"""

from fastapi import HTTPException, status


def get_http_406(exp_msg="Failed with an error"):
    """Function to get 406 NOT Acceptable HTTP Exception"""
    return HTTPException(
        status_code=status.HTTP_406_NOT_ACCEPTABLE,
        detail=exp_msg,
        headers={"WWW-Authenticate": "Bearer"},
    )


def get_http_501(exp_msg="Failed with an error"):
    """Function to get 501 Not Implemented HTTP Exception"""
    return HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail=exp_msg,
        headers={"WWW-Authenticate": "Bearer"},
    )


def get_http_422(exp_msg="Unprocessable Response"):
    """Function to get 422 Unprocessable Entity HTTP Exception"""
    return HTTPException(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        detail=exp_msg,
        headers={"WWW-Authenticate": "Bearer"},
    )


def get_http_404(exp_msg="Data Not Found"):
    """Function to get 404 NOT FOUND HTTP Exception"""
    return HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=exp_msg,
        headers={"WWW-Authenticate": "Bearer"},
    )


def get_http_401(exp_msg="Unauthorized"):
    """Function to get 401 UNAUTHORIZED HTTP Exception"""
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=exp_msg,
        headers={"WWW-Authenticate": "Bearer"},
    )


def get_http_403(exp_msg="Forbidden"):
    """Function to get 403 FORBIDDEN HTTP Exception"""
    return HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail=exp_msg,
        headers={"WWW-Authenticate": "Bearer"},
    )


def get_http_409(exp_msg="Integrity Error"):
    """Function to get 409 CONFLICT HTTP Exception"""
    return HTTPException(
        status_code=status.HTTP_409_CONFLICT,
        detail=exp_msg,
        headers={"WWW-Authenticate": "Bearer"},
    )


def get_http_400(exp_msg="Bad Request"):
    """Function to get 400 BAD REQUEST HTTP Exception"""
    return HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail=exp_msg,
        headers={"WWW-Authenticate": "Bearer"},
    )
