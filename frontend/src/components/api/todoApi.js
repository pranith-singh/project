import axios from "axios";

// Use your deployed backend URL here 👇
const API_URL = "https://thakurap-f3fvama2hhf8thvhy.centralindia.azurewebsites.net/api/todos";

// Get all todos
export const getTodos = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Add a todo
export const addTodo = async (todo) => {
  const res = await axios.post(API_URL, todo);
  return res.data;
};

// Toggle (update) a todo
export const updateTodo = async (id, updatedTodo) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedTodo);
  return res.data;
};

// Delete a todo
export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
