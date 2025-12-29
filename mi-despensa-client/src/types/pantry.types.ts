export interface PantryProduct {
    id: number;
    name: string;
    quantity: number;
    expiresAt?: string | null; // ISO string
    categoryId: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreatePantryProductDto {
    name: string;
    quantity: number;
    expiresAt?: string;
    categoryId: number;
}

export interface UpdatePantryProductDto extends Partial<CreatePantryProductDto> { }
