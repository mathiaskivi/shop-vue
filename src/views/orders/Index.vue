<template>
    <section class="banner gradient pb-4 pt-4">
        <div class="row no-gutters">
            <div class="col-2"></div>
            <div class="col-8 text-center">
                <h3 class="font-weight-light m-auto">{{ getTranslations().views.orders.index.title.toUpperCase() }}</h3>
            </div>
            <div class="col-2">
                <template v-if="getRoles() !== null && getRoles().includes('Admin')">
                    <router-link class="btn btn-light float-right mr-4" v-bind:to="'/Orders/Create'">➕</router-link>
                </template>
            </div>
        </div>
    </section>
    <br>

    <table class="table">
        <thead>
        <tr class="d-flex">
            <th class="col-4">
                {{ getTranslations().views.orders.index.order }}
            </th>
            <th class="col-4 text-center">
                {{ getTranslations().views.orders.index.date }}
            </th>
            <th class="col-2 text-center">
                {{ getTranslations().views.orders.index.status }}
            </th>
            <th class="col-2 text-center">
                {{ getTranslations().views.orders.index.total }}
            </th>
        </tr>
        </thead>
        <tbody>
        <tr class="d-flex" v-for="order in orders" v-bind:key="order">
            <td class="col-4">
                <router-link v-bind:to="'/Orders/Details/' + order.id">
                    #{{ order.id }}
                </router-link>
            </td>
            <td class="col-4 text-center">
                {{ new Date(order.dateTime).toLocaleString('en-GB').replace(",", "") }}
            </td>
            <td class="col-2 text-center">
                {{ order.status.name }}
            </td>
            <td class="col-2 text-center">
                {{ order.total.toFixed(2) }}€
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { IOrder } from '@/domain/IOrder';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class OrdersIndex extends Vue {
    orders: IOrder[] | null = null;

    async mounted(): Promise<void> {
        const orderHTTPResponse = await BaseService.getAll<IOrder>('/Orders', store.state);

        if (orderHTTPResponse.ok && orderHTTPResponse.data !== undefined) {
            this.orders = orderHTTPResponse.data;
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
