import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import type { ShoppingItem, CreateShoppingItemDto, UpdateShoppingItemDto } from '../types/shopping.types';
import type { ApiResponse } from '../types/api.types';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const getShoppingItems = async (): Promise<ShoppingItem[]> => {
    const response = await api.get<ApiResponse<ShoppingItem[]>>('/shopping-list');
    return response.data.results;
};

export const createShoppingItem = async (data: CreateShoppingItemDto): Promise<ShoppingItem> => {
    const response = await api.post<ApiResponse<ShoppingItem>>('/shopping-list', data);
    return response.data.results;
};

export const updateShoppingItem = async (id: number, data: UpdateShoppingItemDto): Promise<ShoppingItem> => {
    const response = await api.patch<ApiResponse<ShoppingItem>>(`/shopping-list/${id}`, data);
    return response.data.results;
};

export const deleteShoppingItem = async (id: number): Promise<void> => {
    await api.delete(`/shopping-list/${id}`);
};
