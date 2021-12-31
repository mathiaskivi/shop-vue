import { IProvider } from '@/domain/IProvider';

export interface ILocation {
    id: string;
    providerId: string;
    provider?: IProvider;
    nameId: string;
    name: string;
    addressId: string;
    address: string;
}
