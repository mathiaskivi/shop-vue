<template>
    <section class="banner gradient pb-4 pt-4">
        <div class="container">
            <div class="row align-items-center">
                <h3 class="font-weight-light m-auto">{{ getTranslations().views.checkout.success.payment.toUpperCase() }}</h3>
            </div>
        </div>
    </section>
    <br/>

    <div class="container">
        <div class="row">
            <div class="col-md-6 mx-auto mt-5">
                <div class="content text-center">
                    <h3>{{ getTranslations().views.checkout.success.paymentWasSuccessful }}</h3>
                    <h5>{{ getTranslations().views.checkout.success.yourOrderHasBeenPlaced }}</h5>
                    <router-link class="btn btn-dark mt-4" v-bind:to="'/Orders/Details/' + orderId" v-if="orderId !== null">{{ getTranslations().views.checkout.success.viewOrder }}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ICart } from '@/domain/checkout/ICart';
import { ITranslations } from '@/domain/internationalization/ITranslations';
import { Vue } from 'vue-class-component';
import store from '@/store/Index';

export default class CheckoutSuccess extends Vue {
    orderId: string | null = null;

    getCart(): ICart {
        return store.state.cart;
    }

    getTranslations(): ITranslations | null {
        return store.state.translations;
    }

    mounted(): void {
        this.orderId = this.$route.params.id as string;

        store.state.cart = {
            entries: [],
            locationId: null,
            locationName: null,
            providerId: null,
            providerName: null,
            providerPrice: 0.00
        }
    }
}
</script>
