export interface ProductCheck {
    productId: string;
    variantId: string;
    quantity: number;
    inStock: boolean;
}

export interface InventoryServiceInterface {
    getProducts(items: Array<{ productId: string; variantId: string; quantity: number }>): Promise<Array<ProductCheck>>;
}
  