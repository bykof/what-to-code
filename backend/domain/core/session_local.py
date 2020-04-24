from sqlalchemy.orm import sessionmaker

from domain.core.engine import engine

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
