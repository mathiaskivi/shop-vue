import { ICart } from "@/domain/checkout/ICart";
import { ILanguage } from '@/domain/internationalization/ILanguage';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export interface IState {
    cart: ICart;

    token: string | null;
    email: string | null;
    fullName: string | null;
    phoneNumber: string | null;
    roles: string[] | null;

    language: ILanguage;
    languages: ILanguage[] | null;
    translations: ITranslations | null;
}
