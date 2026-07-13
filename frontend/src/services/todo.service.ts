import { apiClient } from './api';
import type { CreateTodoRequest, UpdateTodoRequest } from '../types/todo';

export const todoService = {
  async getAll() {
    const res = await apiClient.get('/todos')
    return res.data;
  },

  async create(request: CreateTodoRequest) {
    const res = await apiClient.post('/todos', request);
    return res.data;
  },

  async update(id: number, request: UpdateTodoRequest) {
    const res = await apiClient.patch(`/todos/${id}`, request);
    return res.data;
  },

  async remove(id: number) {
    const res = await apiClient.delete(`/todos/${id}`);
    return res.data;
  },
};