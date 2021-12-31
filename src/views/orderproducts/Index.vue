<template>
    <h1>{{ getTranslations().views.orderProducts.index.title }}</h1>

    <template v-if="getRoles() != null && getRoles().includes('Seller')">
        <p>
            <router-link v-bind:to="'/OrderProducts/Create'">{{ getTranslations().views.orderProducts.index.create }}</router-link>
        </p>
    </template>
    <table class="table">
        <thead>
        <tr>
            <th>
                {{ getTranslations().views.orderProducts.index.order }}
            </th>
            <th>
                {{ getTranslations().views.orderProducts.index.product }}
            </th>
            <th>
                {{ getTranslations().views.orderProducts.index.quantity }}
            </th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="orderProduct in orderProducts" v-bind:key="orderProduct">
            <td>
                {{ orderProduct.orderId }}
            </td>
            <td>
                {{ orderProduct.product.name }}
            </td>
            <td>
                {{ orderProduct.quantity }}
            </td>
            <td>
                <template v-if="getRoles() != null && getRoles().includes('Seller')">
                    <router-link v-bind:to="'/OrderProducts/Edit/' + orderProduct.id">{{ getTranslations().views.orderProducts.index.edit }}</router-link> |
                </template>
                <router-link v-bind:to="'/OrderProducts/Details/' + orderProduct.id">{{ getTranslations().views.orderProducts.index.details }}</router-link>
                <template v-if="getRoles() != null && getRoles().includes('Seller')">
                    | <router-link v-bind:to="'/OrderProducts/Delete/' + orderProduct.id">{{ getTranslations().views.orderProducts.index.delete }}</router-link>
                </template>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { IOrderProduct } from '@/domain/IOrderProduct';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class OrderProductsIndex extends Vue {
    orderProducts: IOrderProduct[] | null = null;

    async mounted(): Promise<void> {
        const orderProductHTTPResponse = await BaseService.getAll<IOrderProduct>('/OrderProducts', store.state);

        if (orderProductHTTPResponse.ok) {
            this.orderProducts = orderProductHTTPResponse.data!;
        }
    }

    getRoles(): string[] | null {
        return store.state.roles;
    }

    getTranslations(): ITranslations | null {
        return store.state.translations;
    }
}
</script>
