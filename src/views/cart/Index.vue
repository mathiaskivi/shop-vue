<template>
    <section class="banner gradient pb-4 pt-4">
        <div class="row no-gutters">
            <div class="col-2"></div>
            <div class="col-8 text-center">
                <h3 class="font-weight-light m-auto">{{ getTranslations().views.cart.index.cart.toUpperCase() }}</h3>
            </div>
            <div class="col-2"></div>
        </div>
    </section>
    <br/>

    <template v-if="getCart().entries.length === 0">
        <div class="row">
            <div class="col-md-12">
                <div class="card-body">
                    <div class="col-12 text-center">
                        <img src="@/assets/shopping-cart.svg" class="cart-image mb-4 mr-3" alt="">
                        <h3>
                            <strong>{{ getTranslations().views.cart.index.yourCartIsEmpty }}</strong>
                        </h3>
                        <router-link class="btn btn-dark m-3" v-bind:to="'/'">{{ getTranslations().views.cart.index.continueShopping }}</router-link>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template v-else>
        <table class="table">
            <thead>
            <tr class="d-flex">
                <th class="col-7">{{ getTranslations().views.cart.index.product }}</th>
                <th class="col-2 text-center">{{ getTranslations().views.cart.index.quantity }}</th>
                <th class="col-1 text-center">{{ getTranslations().views.cart.index.price }}</th>
                <th class="col-1 text-center">{{ getTranslations().views.cart.index.total }}</th>
                <th class="col-1 text-center"></th>
            </tr>
            </thead>
            <tbody>

            <tr class="d-flex" v-for="entry in getCart().entries" v-bind:key="entry">
                <td class="col-7">{{ entry.productName }}</td>
                <td class="col-2 justify-content-center text-center">
                    <a class="d-inline" href="#" v-on:click.prevent="changeEntry('minus', entry)"><img src="@/assets/minus-circle-fill.svg" alt=""></a>
                    <span class="d-inline ml-2 mr-2">{{ entry.quantity }}</span>
                    <a class="d-inline" href="#" v-on:click.prevent="changeEntry('plus', entry)"><img src="@/assets/plus-circle-fill.svg" alt=""></a>
                </td>
                <td class="col-1 text-center">{{ entry.productPrice.toFixed(2) }}€</td>
                <td class="col-1 text-center">{{ entry.total.toFixed(2) }}€</td>
                <td class="col-1 text-center">
                    <a href="#" v-on:click.prevent="removeEntry(entry)"><img src="@/assets/x-circle-fill.svg" alt=""></a>
                </td>
            </tr>
            <tr class="d-flex">
                <td class="col-7">
                    <strong>{{ getTranslations().views.cart.index.subtotal }}</strong>
                </td>
                <td class="col-2"></td>
                <td class="col-1"></td>
                <td class="col-1 text-center">{{ getCart().entries.reduce((sum, entry) => sum + entry.total, 0).toFixed(2) }}€</td>
                <td class="col-1"></td>
            </tr>
            </tbody>
        </table>
        <br/>

        <div class="row no-gutters">
            <div class="col-5"></div>
            <div class="col-2 text-center">
                <router-link class="btn btn-dark" v-bind:to="'/Cart/Shipping'">{{ getTranslations().views.cart.index.chooseShipping }}</router-link>
            </div>
            <div class="col-5"></div>
        </div>
    </template>
</template>

<script lang="ts">
import { ICart, IEntry } from '@/domain/checkout/ICart';
import { ITranslations } from '@/domain/internationalization/ITranslations';
import { Vue } from 'vue-class-component';
import store from '@/store/Index';

export default class CartIndex extends Vue {
    getCart(): ICart {
        return store.state.cart;
    }

    getTranslations(): ITranslations | null {
        return store.state.translations;
    }

    changeEntry(command: string, entry: IEntry): void {
        const quantity = command === 'minus' ? -1 : +1;

        const change = {
            productId: entry.productId,
            productName: entry.productName,
            productPrice: entry.productPrice,
            productQuantity: entry.productQuantity,

            quantity,
            total: entry.productPrice * (entry.quantity + quantity)
        }

        store.commit('changeEntry', change);
    }

    removeEntry(entry: IEntry): void {
        store.commit('removeEntry', entry);
    }
}
</script>
