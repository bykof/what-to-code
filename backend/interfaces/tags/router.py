from fastapi import APIRouter, Depends
from sqlalchemy import func, desc
from sqlalchemy.orm import Session

from domain.models.ideas_tags import IdeasTagsTable
from interfaces.dependencies import get_db

PAGE_SIZE: int = 10
router = APIRouter()


@router.get('/popular')
def get_popular_tags(db: Session = Depends(get_db)):
    return db.query(
        IdeasTagsTable.columns.tags_value,
        func.Count(IdeasTagsTable.columns.ideas_id),
    ).group_by(IdeasTagsTable.columns.tags_value).order_by(
        desc(func.Count(IdeasTagsTable.columns.ideas_id))
    ).limit(6).all()
