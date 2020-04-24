from constants import REDIS_URL
from domain.core.session_local import SessionLocal
from redis import StrictRedis


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_redis():
    try:
        redis_client = StrictRedis.from_url(REDIS_URL)
        yield redis_client
    finally:
        redis_client.close()
