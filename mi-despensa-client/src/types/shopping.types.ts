export interface ShoppingItem {
    id: number;
    name: string;
    quantity: number;
    checked: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateShoppingItemDto {
    name: string;
    quantity: number;
}

export interface UpdateShoppingItemDto extends Partial<CreateShoppingItemDto> {
    checked?: boolean;
}
