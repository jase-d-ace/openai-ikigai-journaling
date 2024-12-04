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
    title = Column(String, nullable=False)
    feeling = Column(Integer, index=True, nullable=False)
    content = Column(String, nullable=False)
    answer = Column(String, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))


    owner = relationship("User", back_populates="journals")


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, nullable=False, default=uuid.uuid4)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    def set_password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password): 
        return check_password_hash(self.hashed_password, password)

    journals = relationship("Journal", back_populates="owner")