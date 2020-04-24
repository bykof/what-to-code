FROM python:3.8
RUN pip install pipenv

EXPOSE 80

COPY ./ /app
WORKDIR /app

ENV PYTHONPATH /app

RUN pipenv install

CMD pipenv run migrate && pipenv run prod
