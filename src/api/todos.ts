import { Task } from '../../store/TasksReducers/tasksSlice';
import { api } from './authUser';

export const fetchTodos = async (page: number, limit: number) => {
  const response = await api.get(`/todos`, {
    params: { page, limit },
  });
  return response.data;
};

export const createTodo = async (text: string) => {
  const response = await api.post(`/todos/`, { text });
  return response.data;
};

export const deleteTodo = async (id: number) => {
  await api.delete(`/todos/${id}`, {
    params: { id },
  })
}

export const updateTodo = async (id: number, updated: Partial<Task>): Promise<Task> => {
    const response = await api.put(`/todos/${id}`, updated);
    return response.data;
};

export const toggleTask = async (id: number): Promise<Task> => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data;
};
