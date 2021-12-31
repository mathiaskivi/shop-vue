import { IProduct } from '@/domain/IProduct';

export interface IOrderProduct {
    id: string;
    orderId: string;
    productId: string;
    product?: IProduct;
    quantity: number;
}
