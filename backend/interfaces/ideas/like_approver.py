from redis import StrictRedis


class LikeApprover:
    def __init__(self, redis_client: StrictRedis):
        self.redis_client = redis_client

    def key(self, token, idea_id):
        return f'{token}_{idea_id}'

    def allowed_to_like(self, token, idea_id) -> bool:
        if self.redis_client.get(self.key(token, idea_id)) is not None:
            return False

        self.redis_client.set(self.key(token, idea_id), 1)
        return True

    def remove_like(self, token, idea_id) -> bool:
        if self.redis_client.get(self.key(token, idea_id)) is not None:
            self.redis_client.delete(self.key(token, idea_id))
            return True
        else:
            return False
