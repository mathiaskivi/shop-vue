import { BaseService } from '@/services/BaseService';
import { createStore } from 'vuex'
import { IEntry } from '@/domain/checkout/ICart';
import { ILanguage } from '@/domain/internationalization/ILanguage';
import { ILoginResponse } from '@/types/ILoginResponse';
import { ILocation } from '@/domain/ILocation';
import { IProvider } from '@/domain/IProvider';
import { IRegisterResponse } from '@/types/IRegisterResponse';
import { IState } from '@/store/Types';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default createStore({
    actions: {
        setLanguage: async (context, language: ILanguage): Promise<void> => {
            const languageHTTPResponse = await BaseService.getAll<ILanguage>('/Translations/GetLanguages', null);
            const translationsHTTPResponse = await BaseService.get<ITranslations>('/Translations/GetTranslations?culture=' + language.name, null);

            if (languageHTTPResponse.ok && translationsHTTPResponse.ok) {
                context.commit('setLanguage', language);
                context.commit('setLanguages', languageHTTPResponse.data);
                context.commit('setTranslations', translationsHTTPResponse.data);
            }
        }
    },
    getters: {
    },
    modules: {
    },
    mutations: {
        addEntry: (state: IState, add: IEntry): void => {
            if (add.productQuantity <= 0) {
                return;
            }

            const entry = state.cart.entries.find(entry => entry.productId === add.productId);
            if (entry === undefined) {
                if (add.quantity < 1) {
                    add.quantity = add.productQuantity;
                } else if (add.quantity > add.productQuantity) {
                    add.quantity = add.productQuantity;
                }

                state.cart.entries.push(add);
            } else {
                if (entry.quantity + add.quantity > add.productQuantity) {
                    entry.quantity = add.productQuantity;
                    entry.total = entry.productQuantity * add.productPrice;
                } else {
                    entry.quantity += add.quantity;
                    entry.total += add.total;
                }
            }
        },
        changeEntry: (state: IState, change: IEntry): void => {
            const entry = state.cart.entries.find(entry => entry.productId === change.productId);
            if (entry === undefined) {
                return;
            }

            if (change.quantity === -1 && entry.quantity > 1) {
                entry.quantity -= 1;
                entry.total = change.total;
            } else if (change.quantity === 1 && entry.quantity < entry.productQuantity) {
                entry.quantity += 1;
                entry.total = change.total;
            }
        },
        removeEntry: (state: IState, remove: IEntry): void => {
            state.cart.entries = state.cart.entries.filter(entry => entry.productId !== remove.productId);
        },
        login: (state: IState, loginResponse: ILoginResponse): void => {
            state.token = loginResponse.token;
            state.email = loginResponse.email;
            state.fullName = loginResponse.fullName;
            state.phoneNumber = loginResponse.phoneNumber;
            state.roles = loginResponse.roles;
        },
        logout: (state: IState): void => {
            state.token = null;
            state.email = null;
            state.fullName = null;
            state.phoneNumber = null;
            state.roles = null;
        },
        register: (state: IState, registerResponse: IRegisterResponse): void => {
            state.token = registerResponse.token;
            state.email = registerResponse.email;
            state.fullName = registerResponse.fullName;
            state.phoneNumber = registerResponse.phoneNumber;
            state.roles = registerResponse.roles;
        },
        setLanguage(state: IState, language: ILanguage): void {
            state.language = language;
        },
        setLanguages(state: IState, languages: ILanguage[]): void {
            state.languages = languages;
        },
        setLocation(state: IState, location: ILocation): void {
            state.cart.locationId = location.id;
            state.cart.locationName = location.name;
        },
        setProvider(state: IState, provider: IProvider): void {
            state.cart.providerId = provider.id;
            state.cart.providerName = provider.name;
            state.cart.providerPrice = provider.price;
        },
        setTranslations(state: IState, translations: ITranslations): void {
            state.translations = translations;
        }
    },
    state: {
        cart: {
            entries: [],
            locationId: null,
            locationName: null,
            providerId: null,
            providerName: null,
            providerPrice: 0.00
        },

        token: null,
        email: null,
        fullName: null,
        phoneNumber: null,
        roles: null,

        language: {
            name: 'en-GB',
            nativeName: 'English (United Kingdom)'
        },
        languages: null,
        translations: null
    }
});
