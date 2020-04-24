from sqlalchemy import Column, Table, Integer, String, ForeignKey

from domain.core.base import Base

IdeasTagsTable = Table(
    'ideastags',
    Base.metadata,
    Column('tags_value', String, ForeignKey('tags.value', ondelete='CASCADE')),
    Column('ideas_id', Integer, ForeignKey('ideas.id', ondelete='CASCADE'))
)
