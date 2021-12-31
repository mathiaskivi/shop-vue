export interface ICart {
    entries: IEntry[];
    locationId: string | null;
    locationName: string | null;

    providerId: string | null;
    providerName: string | null;
    providerPrice: number;
}

export interface IEntry {
    productId: string | null;
    productName: string | null;
    productPrice: number;
    productQuantity: number;

    quantity: number;
    total: number;
}
