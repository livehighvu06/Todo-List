import axios from "axios";

const url = "http://localhost:3004/todos";

export const getTodos = async () => {
  return await axios.get(`${url}`);
};
export const createTodo = async (todo) => {
  return await axios.post(url, todo);
};

export const updateTodo = async (id, todo) => {
  return await axios.put(`${url}/${id}`, todo);
};
export const deleteTodo = async (id) => {
  return await axios.delete(`${url}/${id}`);
};
