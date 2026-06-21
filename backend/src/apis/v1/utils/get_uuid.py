"""This file returns uuid"""

from uuid import UUID, uuid4


def get_uuidv4() -> UUID:
    """To get uuidv4"""
    return uuid4()
