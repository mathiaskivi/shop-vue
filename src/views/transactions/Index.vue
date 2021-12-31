<template>
    <h1>{{ getTranslations().views.transactions.index.title }}</h1>

    <template v-if="getRoles() != null && getRoles().includes('Seller')">
        <p>
            <router-link v-bind:to="'/Transactions/Create'">{{ getTranslations().views.transactions.index.create }}</router-link>
        </p>
    </template>
    <table class="table">
        <thead>
        <tr>
            <th>
                {{ getTranslations().views.transactions.index.order }}
            </th>
            <th>
                {{ getTranslations().views.transactions.index.amount }}
            </th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="transaction in transactions" v-bind:key="transaction">
            <td>
                {{ transaction.orderId }}
            </td>
            <td>
                {{ transaction.amount.toFixed(2) }}
            </td>
            <td>
                <template v-if="getRoles() != null && getRoles().includes('Seller')">
                    <router-link v-bind:to="'/Transactions/Edit/' + transaction.id">{{ getTranslations().views.transactions.index.edit }}</router-link> |
                </template>
                <router-link v-bind:to="'/Transactions/Details/' + transaction.id">{{ getTranslations().views.transactions.index.details }}</router-link>
                <template v-if="getRoles() != null && getRoles().includes('Seller')">
                    | <router-link v-bind:to="'/Transactions/Delete/' + transaction.id">{{ getTranslations().views.transactions.index.delete }}</router-link>
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
import { ITransaction } from '@/domain/ITransaction';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class TransactionsIndex extends Vue {
    transactions: ITransaction[] | null = null;

    async mounted(): Promise<void> {
        const transactionHTTPResponse = await BaseService.getAll<ITransaction>('/Transactions', store.state);

        if (transactionHTTPResponse.ok && transactionHTTPResponse.data !== undefined) {
            this.transactions = transactionHTTPResponse.data;
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
