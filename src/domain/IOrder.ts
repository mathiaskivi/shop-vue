import { IAppUser } from '@/domain/identity/IAppUser';
import { ILocation } from '@/domain/ILocation';
import { IOrderProduct } from '@/domain/IOrderProduct';
import { IStatus } from '@/domain/IStatus';
import { ITransaction } from '@/domain/ITransaction';

export interface IOrder {
    id: string;
    appUserId: string;
    appUser?: IAppUser;
    locationId: string;
    location?: ILocation;
    statusId: string;
    status?: IStatus;
    dateTime: string;
    total: number;
    tracking?: string;
    orderProducts?: IOrderProduct[];
    transactions?: ITransaction[];
}
