"""
    This file has the User model
    its attributes, constraints, and relationships
"""

from sqlalchemy import UUID, Column, VARCHAR, DATETIME, Text, BOOLEAN, TIMESTAMP, func

# from sqlalchemy.orm import relationships

from . import Base


class User(Base):
    """User Model
    This class represents the user in the app
    It contains information as user id, username, firstname
    """

    __tablename__ = "user"

    user_id = Column(UUID(as_uuid=True), primary_key=True, index=True)
    first_name = Column(VARCHAR(64), nullable=False)
    last_name = Column(VARCHAR(64), nullable=False)
    username = Column(VARCHAR(64), unique=True, nullable=False)
    email = Column(VARCHAR(64), unique=True, nullable=False)
    password = Column(VARCHAR(32))
    company_name = Column(VARCHAR(64), nullable=True)
    company_region = Column(VARCHAR(64), nullable=True)
    company_city = Column(VARCHAR(64), nullable=True)
    created_on = Column(TIMESTAMP, server_default=func.now())
    is_admin = Column(BOOLEAN, default=False)
    is_active = Column(BOOLEAN, default=True)
    reset_otp = Column(VARCHAR(6), nullable=True)
    reset_otp_expiry = Column(TIMESTAMP, nullable=True)

    def to_dict(self) -> dict:
        """To map model data to dictionary"""
        return {
            "user_id": self.user_id,
            "username": self.username,
            "password": self.password,
            "company_region": self.company_region,
            "created_on": self.created_on,
            "is_active": self.is_active,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "company_name": self.company_name,
            "company_city": self.company_city,
            "is_admin": self.is_admin,
        }
