<template>
    <section class="banner gradient pb-4 pt-4">
        <div class="row no-gutters">
            <div class="col-2"></div>
            <div class="col-8 text-center">
                <h3 class="font-weight-light m-auto">{{ getTranslations().views.cart.shipping.title.toUpperCase() }}</h3>
            </div>
            <div class="col-2"></div>
        </div>
    </section>
    <br/>

    <div class="row no-gutters">
        <div class="col-5"></div>
        <div class="col-2 text-center">
            <div class="form-group">
                <label class="control-label">{{ getTranslations().views.cart.shipping.provider }}</label>
                <select class="form-control valid" v-model="providerId" v-on:change="(event) => getLocations(event.target.value)">
                    <option value="00000000-0000-0000-0000-000000000000">{{ getTranslations().views.cart.shipping.choose }}...</option>
                    <option v-for="provider in providers" v-bind:key="provider" v-bind:value="provider.id">{{ provider.name }}</option>
                </select>
            </div>
            <div class="form-group">
                <label class="control-label">{{ getTranslations().views.cart.shipping.location }}</label>
                <select class="form-control" id="LocationId" v-model="locationId">
                    <option value="00000000-0000-0000-0000-000000000000">{{ getTranslations().views.cart.shipping.choose }}...</option>
                </select>
            </div>
            <div class="form-group">
                <input class="btn btn-dark mt-3" type="submit" v-bind:value="getTranslations().views.cart.shipping.goToCheckout" v-on:click="setShipping()"/>
            </div>
        </div>
        <div class="col-5"></div>
    </div>
</template>

<script lang="ts">
import { BaseService } from '@/services/BaseService';
import { ICart } from '@/domain/checkout/ICart';
import { ILocation } from '@/domain/ILocation';
import { IProvider } from '@/domain/IProvider';
import { ITranslations } from '@/domain/internationalization/ITranslations';
import { Vue } from 'vue-class-component';
import store from '@/store/Index';

export default class CartShipping extends Vue {
    providerId = '00000000-0000-0000-0000-000000000000';
    locationId = '00000000-0000-0000-0000-000000000000';

    providers: IProvider[] | null = null;

    async getLocations(providerId: string): Promise<void> {
        const locationsElement: HTMLSelectElement = document.getElementById('LocationId') as HTMLSelectElement;
        for (let i = locationsElement.options.length - 1; i >= 0; i--) {
            if (i <= 0) {
                break;
            }

            locationsElement.options.remove(i);
        }

        const locationHTTPResponse = await BaseService.getAll<ILocation>('/Locations?providerId=' + providerId + '&', store.state);

        if (locationHTTPResponse.ok && locationHTTPResponse.data !== undefined) {
            let option;
            for (let i = 0; i < locationHTTPResponse.data.length; i++) {
                option = document.createElement('option');
                option.text = locationHTTPResponse.data[i].name;
                option.value = locationHTTPResponse.data[i].id;

                locationsElement.add(option);
            }
        }
    }

    async setShipping(): Promise<void> {
        if (this.providerId === '00000000-0000-0000-0000-000000000000' ||
            this.locationId === '00000000-0000-0000-0000-000000000000') {
            return;
        }

        const locationHTTPResponse = await BaseService.get<ILocation>('/Locations/' + this.locationId, store.state);
        const providerHTTPResponse = await BaseService.get<IProvider>('/Providers/' + this.providerId, store.state);

        if (locationHTTPResponse.ok && locationHTTPResponse.data !== undefined &&
            providerHTTPResponse.ok && providerHTTPResponse.data !== undefined) {
            await store.commit('setLocation', locationHTTPResponse.data);
            await store.commit('setProvider', providerHTTPResponse.data);

            await this.$router.push('/Checkout');
        }
    }

    async mounted(): Promise<void> {
        const providerHTTPResponse = await BaseService.getAll<IProvider>('/Providers', store.state);

        if (providerHTTPResponse.ok && providerHTTPResponse.data !== undefined) {
            this.providers = providerHTTPResponse.data;
        }
    }

    getCart(): ICart {
        return store.state.cart;
    }

    getTranslations(): ITranslations | null {
        return store.state.translations;
    }
}
</script>
