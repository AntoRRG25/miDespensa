import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import type { PantryProduct, CreatePantryProductDto, UpdatePantryProductDto } from '../types/pantry.types';
import type { ApiResponse } from '../types/api.types';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const getPantryProducts = async (): Promise<PantryProduct[]> => {
    const response = await api.get<ApiResponse<PantryProduct[]>>('/pantry');
    return response.data.results;
};

export const createPantryProduct = async (data: CreatePantryProductDto): Promise<PantryProduct> => {
    const response = await api.post<ApiResponse<PantryProduct>>('/pantry', data);
    return response.data.results;
};

export const updatePantryProduct = async (id: number, data: UpdatePantryProductDto): Promise<PantryProduct> => {
    const response = await api.patch<ApiResponse<PantryProduct>>(`/pantry/${id}`, data);
    return response.data.results;
};

export const deletePantryProduct = async (id: number): Promise<void> => {
    await api.delete(`/pantry/${id}`);
};
