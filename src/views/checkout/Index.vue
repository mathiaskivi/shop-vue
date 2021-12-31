<template>
    <section class="banner gradient pb-4 pt-4">
        <div class="row no-gutters">
            <div class="col-2"></div>
            <div class="col-8 text-center">
                <h3 class="font-weight-light m-auto">{{ getTranslations().views.checkout.index.title.toUpperCase() }}</h3>
            </div>
            <div class="col-2"></div>
        </div>
    </section>
    <br/>

    <template v-if="getCart().entries.length >= 1">
        <table class="table">
            <thead>
            <tr class="d-flex">
                <th class="col-7">{{ getTranslations().views.checkout.index.product }}</th>
                <th class="col-2 text-center">{{ getTranslations().views.checkout.index.quantity }}</th>
                <th class="col-1 text-center">{{ getTranslations().views.checkout.index.price }}</th>
                <th class="col-1 text-center">{{ getTranslations().views.checkout.index.total }}</th>
                <th class="col-1 text-center"></th>
            </tr>
            </thead>
            <tbody>

            <tr class="d-flex" v-for="entry in getCart().entries" v-bind:key="entry">
                <td class="col-7">{{ entry.productName }}</td>
                <td class="col-2 form-inline justify-content-center text-center">
                    <span class="ml-2 mr-2">{{ entry.quantity }}</span>
                </td>
                <td class="col-1 text-center">{{ entry.productPrice.toFixed(2) }}€</td>
                <td class="col-1 text-center">{{ entry.total.toFixed(2) }}€</td>
                <td class="col-1 text-center"></td>
            </tr>
            <tr class="d-flex">
                <td class="col-7">
                    <strong>{{ getTranslations().views.checkout.index.shipping }} ({{ getCart().providerName }} {{ getCart().locationName }})</strong>
                </td>
                <td class="col-2"></td>
                <td class="col-1"></td>
                <td class="col-1 text-center">{{ getCart().providerPrice.toFixed(2) }}€</td>
                <td class="col-1"></td>
            </tr>
            <tr class="d-flex">
                <td class="col-7">
                    <strong>{{ getTranslations().views.checkout.index.total }}</strong>
                </td>
                <td class="col-2"></td>
                <td class="col-1"></td>
                <td class="col-1 text-center">{{ (getCart().entries.reduce((sum, entry) => sum + entry.total, 0) + getCart().providerPrice).toFixed(2) }}€</td>
                <td class="col-1"></td>
            </tr>
            </tbody>
        </table>
        <br/>

        <div class="row no-gutters">
            <h4 class="font-weight-light ml-auto mr-auto mb-4">{{ getTranslations().views.checkout.index.payWith }}...</h4>
        </div>
        <div class="row no-gutters">
            <div class="col-4"></div>
            <div class="col-4">
                <div id="paypal-button-container"></div>
            </div>
            <div class="col-4"></div>
        </div>
        <div class="row no-gutters">
            <div class="col-4"></div>
            <div class="col-4 text-center">
                <span>{{ getTranslations().views.checkout.index.youWillBeRedirectedToPayPal }}</span>
            </div>
            <div class="col-4"></div>
        </div>
    </template>
</template>

<script lang="ts">
import { ApiBaseUrl } from '@/configuration';
import { ICart, IEntry } from '@/domain/checkout/ICart';
import { ITranslations } from '@/domain/internationalization/ITranslations';
import { loadScript } from '@paypal/paypal-js';
import { Vue } from 'vue-class-component';
import store from '@/store/Index';

export default class CheckoutIndex extends Vue {
    getCart(): ICart {
        return store.state.cart;
    }

    getTranslations(): ITranslations | null {
        return store.state.translations;
    }

    mounted(): void {
        if (store.state.token === null) {
            this.$router.push('/Identity/Account/Login');
            return;
        }

        loadScript({
            'client-id': 'AYIZNd3A0zS_8r2hrxOQ7paxZnAv3RNEOdMhZJWoZ0ZVnC0vJmxxK4j_Eb5pPVLjWYSCCGe1ThqTmJW1',
            currency: 'EUR',
            'disable-funding': 'card,credit'
        }).then((paypal) => {
            if (paypal && paypal.Buttons) {
                paypal.Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: (this.getCart().entries.reduce((sum: number, entry: IEntry) => sum + entry.total, 0) + (this.getCart().providerPrice)).toString()
                                }
                            }]
                        });
                    },
                    onApprove: (data, actions) => {
                        return actions.order.capture().then(async () => {
                            const response = await fetch(ApiBaseUrl + (ApiBaseUrl.endsWith('/') ? 'Checkout/Process' : '/Checkout/Process'), {
                                method: 'POST',
                                headers: {
                                    Authorization: 'Bearer ' + store.state.token,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    Entries: store.state.cart.entries,
                                    locationId: store.state.cart.locationId,
                                    locationName: store.state.cart.locationName,
                                    providerId: store.state.cart.providerId,
                                    providerName: store.state.cart.providerName,
                                    providerPrice: store.state.cart.providerPrice
                                })
                            });

                            if (!response.ok) {
                                return;
                            }

                            const result = await response.json();
                            if (result === null) {
                                return;
                            }

                            await this.$router.push('/Checkout/Success/' + result.id);
                        });
                    },
                    onCancel: async () => {
                        await this.$router.push('/Checkout/Failure');
                    },
                    style: {
                        color: 'black',
                        height: 50
                    }
                })!.render('#paypal-button-container'); // Display payment options on your web page
            }
        });
    }
}
</script>
