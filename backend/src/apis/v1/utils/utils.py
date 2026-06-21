"""This file has utility functions"""

from uuid import UUID


def save_file(file_path: str, content, mode: str, encoding: str = "utf-8") -> None:
    """To save a file on a particular path specified in params"""
    with open(file_path, mode, encoding=encoding) as file:
        file.write(content)


def get_filename(file_uuid: UUID, filename: str) -> str:
    """To add UUID to a filename"""
    assert isinstance(file_uuid, UUID), "Invalid UUID"
    assert isinstance(filename, str), "Invalid Filename"
    assert len(filename) > 0, "Empty Filename"

    return file_uuid.hex + "_" + filename
