<template>
    <div v-if="order !== null">
        <section class="banner gradient pb-4 pt-4">
            <div class="row no-gutters">
                <div class="col-2"></div>
                <div class="col-8 text-center">
                    <h3 class="font-weight-light m-auto">{{ getTranslations().views.orders.details.order.toUpperCase() }} #{{ order.id }}</h3>
                </div>
                <div class="col-2 pr-4">
                    <template v-if="getRoles() !== null && getRoles().includes('Admin')">
                        <router-link class="btn btn-light float-right" v-bind:to="'/Orders/Delete/' + order.id">❌</router-link>
                        <router-link class="btn btn-light float-right mr-2" v-bind:to="'/Orders/Edit/' + order.id">✏️</router-link>
                    </template>
                    <template v-else-if="getRoles() !== null && getRoles().includes('Seller')">
                        <router-link class="btn btn-light float-right" v-bind:to="'/Orders/Edit/' + order.id">✏️</router-link>
                    </template>
                </div>
            </div>
        </section>
        <br>

        <div class="row no-gutters">
            <h4 class="font-weight-light ml-auto mr-auto mb-3">{{ getTranslations().views.orders.details.recipient }}</h4>
        </div>
        <div class="col mb-5 text-center">
            {{ getTranslations().views.orders.details.name }}: {{ order.appUser.fullName }}
            <br />
            {{ getTranslations().views.orders.details.phone }}: {{ order.appUser.phoneNumber }}
        </div>

        <div class="row no-gutters mb-2 mt-2">
            <h4 class="font-weight-light ml-auto mr-auto mb-4">{{ getTranslations().views.orders.details.cart }}</h4>
        </div>
        <table class="table">
            <thead>
            <tr class="d-flex">
                <th class="col-6">{{ getTranslations().views.orders.details.product }}</th>
                <th class="col-2 text-center">{{ getTranslations().views.orders.details.quantity }}</th>
                <th class="col-2 text-center">{{ getTranslations().views.orders.details.price }}</th>
                <th class="col-2 text-center">{{ getTranslations().views.orders.details.total }}</th>
            </tr>
            </thead>
            <tbody>

            <tr class="d-flex" v-for="orderProduct in order.orderProducts" v-bind:key="orderProduct">
                <td class="col-6">{{ orderProduct.product.name }}</td>
                <td class="col-2 form-inline justify-content-center text-center">
                    <span class="ml-2 mr-2">{{ orderProduct.quantity }}</span>
                </td>
                <td class="col-2 text-center">{{ orderProduct.product.price.toFixed(2) }}€</td>
                <td class="col-2 text-center">{{ (orderProduct.quantity * orderProduct.product.price).toFixed(2) }}€</td>
            </tr>

            <tr class="d-flex">
                <td class="col-6">
                    <strong>{{ getTranslations().views.orders.details.shipping }} ({{ order.location.provider.name }} {{ order.location.name }})</strong>
                </td>
                <td class="col-2"></td>
                <td class="col-2"></td>
                <td class="col-2 text-center">{{ order.location.provider.price.toFixed(2) }}€</td>
            </tr>
            <tr class="d-flex">
                <td class="col-6">
                    <strong>{{ getTranslations().views.orders.details.total }}</strong>
                </td>
                <td class="col-2"></td>
                <td class="col-2"></td>
                <td class="col-2 text-center">{{ order.total.toFixed(2) }}€</td>
            </tr>
            </tbody>
        </table>
        <br/>

        <div class="row no-gutters mb-2">
            <h4 class="font-weight-light ml-auto mr-auto mb-4">{{ getTranslations().views.orders.details.transactions }}</h4>
        </div>
        <table class="table">
            <thead>
            <tr class="d-flex">
                <th class="col-10">{{ getTranslations().views.orders.details.order }}</th>
                <th class="col-2 text-center">{{ getTranslations().views.orders.details.amount }}</th>
            </tr>
            </thead>
            <tbody>

            <tr class="d-flex" v-for="transaction in order.transactions" v-bind:key="transaction">
                <td class="col-10">#{{ transaction.orderId }}</td>
                <td class="col-2 text-center">{{ transaction.amount.toFixed(2) }}€</td>
            </tr>

            <tr class="d-flex">
                <td class="col-10">
                    <strong>{{ getTranslations().views.orders.details.total }}</strong>
                </td>
                <td class="col-2 text-center">{{ order.transactions.reduce((sum, transaction) => sum + transaction.amount, 0).toFixed(2) }}€</td>
            </tr>
            </tbody>
        </table>
        <br />

        <template v-if="order.tracking !== null">
            <div class="row no-gutters mb-2">
                <h4 class="font-weight-light ml-auto mr-auto mb-4">{{ getTranslations().views.orders.details.tracking }}</h4>
            </div>
            <div class="col mb-5 text-center">
                <template v-if="isWellFormedUriString(order.tracking)">
                    <a v-bind:href="order.tracking">{{ order.tracking }}</a>
                </template>
                <template v-else>
                    {{ order.tracking }}
                </template>
            </div>
            <br/>
        </template>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { IOrder } from '@/domain/IOrder';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class OrdersDetails extends Vue {
    order: IOrder | null = null;

    async mounted(): Promise<void> {
        const orderHTTPResponse = await BaseService.get<IOrder>('/Orders/' + this.$route.params.id as string, store.state);

        if (orderHTTPResponse.ok && orderHTTPResponse.data !== undefined) {
            this.order = orderHTTPResponse.data;
        }
    }

    getRoles(): string[] | null {
        return store.state.roles;
    }

    getTranslations(): ITranslations | null {
        return store.state.translations;
    }

    isWellFormedUriString(uri: string): boolean {
        let url;

        try {
            url = new URL(uri);
        } catch (error) {
            return false;
        }

        return url.protocol === 'http:' || url.protocol === 'https:';
    }
}
</script>
