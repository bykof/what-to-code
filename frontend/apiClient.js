import Axios from "axios";

const API_URL = process.env.API_URL;

export const createIdea = async (title, description, tags) => {
  return Axios.post(`${API_URL}/ideas`, {
    title,
    description,
    tags: tags.map((tag) => ({
      value: tag,
    })),
  });
};

export const getIdeas = async (order, tag, page = 0) => {
  return Axios.get(`${API_URL}/ideas`, {
    params: { order, tag, page },
  });
};

export const getIdea = async (id) => {
  return Axios.get(`${API_URL}/ideas/${id}`);
};

export const getPopularTags = async () => {
  return Axios.get(`${API_URL}/tags/popular`);
};

export const likeIdea = async (id, token) => {
  return Axios.post(
    `${API_URL}/ideas/${id}/like`,
    {},
    {
      headers: {
        token: token,
      },
    }
  );
};
