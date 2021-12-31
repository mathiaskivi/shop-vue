<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller')">
        <h1>{{ getTranslations().views.transactions.create.title }}</h1>

        <h4>{{ getTranslations().views.transactions.create.transaction }}</h4>
        <hr/>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.transactions.create.order }}</label>
                    <select class="form-control valid" v-model="transaction.orderId">
                        <option v-for="order in orders" v-bind:key="order" v-bind:value="order.id">{{ order.id }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.transactions.create.amount }}</label>
                    <input v-model="transaction.amount" class="form-control" type="number"/>
                </div>
                <div class="form-group">
                    <input type="submit" v-bind:value="getTranslations().views.transactions.create.title" class="btn btn-primary" v-on:click="create()"/>
                </div>
            </div>
        </div>

        <div>
            <router-link v-bind:to="'/Transactions'">{{ getTranslations().views.transactions.create.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { IOrder } from '@/domain/IOrder';
import { ITransaction } from '@/domain/ITransaction';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class TransactionsCreate extends Vue {
    transaction: ITransaction = {
        id: '00000000-0000-0000-0000-000000000000',
        orderId: '00000000-0000-0000-0000-000000000000',
        amount: 0.00
    };

    orders: IOrder[] | null = null;

    async create(): Promise<void> {
        if (this.transaction.orderId === '00000000-0000-0000-0000-000000000000') {
            return;
        }

        const transactionHTTPResponse = await BaseService.post<ITransaction>('/Transactions', this.transaction, store.state);

        if (transactionHTTPResponse.ok) {
            await this.$router.push('/Transactions');
        }
    }

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
