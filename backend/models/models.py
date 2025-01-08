from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean, text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Session, relationship
from werkzeug.security import generate_password_hash, check_password_hash
import uuid


Base = declarative_base()

class Journal(Base):
    __tablename__ = "journals"

    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False, default=uuid.uuid4)
    published_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    passion = Column(String, nullable=False)
    profession = Column(String, index=True, nullable=False)
    mission = Column(String, index=True, nullable=False)
    vocation = Column(String, index=True, nullable=False)
    other = Column(String, default="")
    answer = Column(String, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))


    owner = relationship("User", back_populates="journals")


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, nullable=False, default=uuid.uuid4)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    first_name = Column(String, default="")
    last_name = Column(String, default="")
    description = Column(String, default="")
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))

    def set_password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password): 
        return check_password_hash(self.hashed_password, password)

    journals = relationship("Journal", back_populates="owner")