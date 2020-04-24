from typing import List

from pydantic import BaseModel


class IdeaTag(BaseModel):
    value: str

    class Config:
        orm_mode = True


class IdeaBase(BaseModel):
    title: str
    description: str
    tags: List[IdeaTag]

    class Config:
        orm_mode = True


class Idea(IdeaBase):
    id: int
    likes: int


class CreateIdea(IdeaBase):
    pass
