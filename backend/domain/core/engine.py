from sqlalchemy import create_engine

from constants import SQLALCHEMY_URL

engine = create_engine(SQLALCHEMY_URL)
