import { axiosInstance } from "./axiosInstance";

export const getTodo = () => axiosInstance.get("/todos?_limit=10");
export const createTodo = (todo) => axiosInstance.post("/todos", todo);
export const deleteTodo = (id) => axiosInstance.delete(`/todos/${id}`);
export const updateTodo = (todo) => axiosInstance.patch(`/todos/${todo.id}`, todo)
