import os

SQLALCHEMY_URL = os.environ.get('SQLALCHEMY_URL', 'postgresql://what_to_code@localhost:5432/what_to_code')
REDIS_URL = os.environ.get('REDIS_URL', 'redis://localhost/0')
