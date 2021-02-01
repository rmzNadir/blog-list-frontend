import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createNew = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};

const addLike = async ({ id, likes }) => {
  const res = await axios.patch(`${baseUrl}/${id}`, { likes: likes + 1 });

  return res.data.data;
};

const update = async (id, blog) => {
  const res = await axios.patch(`${baseUrl}/${id}`, blog);
  return res.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

export default { getAll, setToken, createNew, update, remove, addLike };
