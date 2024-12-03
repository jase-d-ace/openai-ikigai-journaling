from ..db import Base
from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean, text
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Journal(Base):
    __tablename__ = "journals"

    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False, default=uuid.uuid4)
    published_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    title = Column(String, nullable=False)
    feeling = Column(Integer, nullable=False)
    content = Column(String, nullable=False)
    answer = Column(String, nullable=False)
