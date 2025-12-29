import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import type { Category } from '../types/category.types';
import type { ApiResponse } from '../types/api.types';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get<ApiResponse<Category[]>>('/categories');
    return response.data.results;
};
