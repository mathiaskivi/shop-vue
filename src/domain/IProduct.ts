import { IPicture } from '@/domain/IPicture';
import { ICategory } from '@/domain/ICategory';

export interface IProduct {
    id: string;
    categoryId: string;
    category?: ICategory;
    nameId: string;
    name: string;
    descriptionId: string;
    description: string;
    price: number;
    quantity: number;
    sold: number;
    pictures?: IPicture[];
}
