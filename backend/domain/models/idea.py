from datetime import datetime

from sqlalchemy import String, Integer, Column, DateTime
from sqlalchemy.orm import relationship

from domain.core.base import Base
from domain.models.ideas_tags import IdeasTagsTable


class Idea(Base):
    __tablename__ = 'ideas'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    created = Column(DateTime, default=datetime.utcnow)
    description = Column(String)
    likes = Column(Integer, default=1)
    tags = relationship(
        'Tag',
        secondary=IdeasTagsTable,
        back_populates='ideas',
        cascade='all,delete',
    )
