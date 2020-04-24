from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from domain.core.base import Base
from domain.models.ideas_tags import IdeasTagsTable


class Tag(Base):
    __tablename__ = 'tags'

    value = Column(String, primary_key=True)
    ideas = relationship(
        "Idea",
        secondary=IdeasTagsTable,
        back_populates='tags',
        cascade='all,delete',
    )
