import re
from typing import List, Union

from fastapi import APIRouter, Depends, HTTPException, Header
from redis import StrictRedis
from sqlalchemy import desc
from sqlalchemy.orm import Session
from sqlalchemy.sql.elements import or_
from sqlalchemy.sql.functions import random

from domain.models import Idea, Tag
from domain.models.ideas_tags import IdeasTagsTable
from interfaces.api_models.idea import Idea as IdeaResponse, CreateIdea
from interfaces.dependencies import get_db, get_redis
from interfaces.ideas.get_ideas_order import GetIdeasOrder
from interfaces.ideas.like_approver import LikeApprover

PAGE_SIZE: int = 15
router = APIRouter()


@router.get('', response_model=List[IdeaResponse])
async def get_ideas(
    page: int = 0,
    order: GetIdeasOrder = GetIdeasOrder.POPULAR,
    tag: str = '',
    search: str = '',
    db: Session = Depends(get_db),
):
    query = db.query(Idea)
    if tag != '':
        query = query.join(IdeasTagsTable).filter(IdeasTagsTable.columns.tags_value == tag.lower())
    if page < 0:
        raise HTTPException(status_code=400, detail='Page could not be less than 1')
    if order == GetIdeasOrder.POPULAR:
        query = query.order_by(desc(Idea.likes))
    if order == GetIdeasOrder.RISING:
        pass
    if order == GetIdeasOrder.OLDEST:
        query = query.order_by(Idea.created)
    if order == GetIdeasOrder.RECENT:
        query = query.order_by(desc(Idea.created))

    if search != '':
        query = query.filter(or_(Idea.title.contains(search), Idea.description.contains(search)))

    return query.offset(page * PAGE_SIZE).limit(PAGE_SIZE).all()


@router.get('/random', response_model=Union[IdeaResponse, None])
def random_idea(db: Session = Depends(get_db)):
    return db.query(Idea).order_by(random()).limit(1).one_or_none()


@router.get('/{id}', response_model=IdeaResponse)
async def get_idea(id: int, db: Session = Depends(get_db)):
    idea = db.query(Idea).filter(Idea.id == id).one_or_none()
    if idea is None:
        HTTPException(status_code=404, detail='Idea was not found')
    return idea


@router.post('', response_model=IdeaResponse)
async def create_idea(idea_request: CreateIdea, db: Session = Depends(get_db)):
    if len(idea_request.title) > 100:
        raise HTTPException(status_code=400, detail='Max 100 characters for title')

    if not re.search(r'[\w]{3}', idea_request.title):
        raise HTTPException(status_code=400, detail='Please provide at least 3 characters')

    if len(idea_request.description) > 1000:
        raise HTTPException(
            status_code=400,
            detail='Max 10000 characters for description',
        )

    idea = Idea(title=idea_request.title, description=idea_request.description)

    if len(idea_request.tags) > 5:
        raise HTTPException(status_code=400, detail='No more than 5 tags')

    for tag_request in idea_request.tags:
        tag = db.query(Tag).filter(Tag.value == tag_request.value).one_or_none()

        if tag is None:
            tag = Tag(value=tag_request.value)

        idea.tags.append(tag)

    db.add(idea)
    db.commit()
    return idea


@router.post('/{id}/like')
def like_idea(
    id: int,
    token: str = Header(None),
    db: Session = Depends(get_db),
    redis_client: StrictRedis = Depends(get_redis),
):
    idea = db.query(Idea).filter(Idea.id == id).one_or_none()
    if idea is None:
        raise HTTPException(status_code=404, detail='Idea was not found')
    like_approver = LikeApprover(redis_client)
    is_approved = like_approver.allowed_to_like(token, idea.id)

    if is_approved:
        idea.likes += 1
        db.commit()
    else:
        like_approver.remove_like(token, idea.id)
        idea.likes -= 1
        db.commit()
