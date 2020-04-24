from pydantic import BaseModel


class Tag(BaseModel):
    value: str
