<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller') && transaction !== null">
        <h1>{{ getTranslations().views.transactions.edit.title }}</h1>

        <h4>{{ getTranslations().views.transactions.edit.transaction }}</h4>
        <hr/>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.transactions.edit.order }}</label>
                    <select class="form-control valid" v-model="transaction.orderId">
                        <option v-for="order in orders" v-bind:key="order" v-bind:value="order.id">{{ order.id }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.transactions.edit.amount }}</label>
                    <input class="form-control" type="text" v-model="transaction.amount"/>
                </div>
                <div class="form-group">
                    <input type="submit" v-bind:value="getTranslations().views.transactions.edit.save" class="btn btn-primary" v-on:click="edit()"/>
                </div>
            </div>
        </div>

        <div>
            <router-link v-bind:to="'/Transactions'">{{ getTranslations().views.transactions.edit.backToList }}</router-link>
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

export default class TransactionsEdit extends Vue {
    transaction: ITransaction | null = null;

    orders: IOrder[] | null = null;

    async mounted(): Promise<void> {
        const transactionHTTPResponse = await BaseService.get<ITransaction>('/Transactions/' + this.$route.params.id as string, store.state);
        const orderHTTPResponse = await BaseService.getAll<IOrder>('/Orders', store.state);

        if (transactionHTTPResponse.ok && transactionHTTPResponse.data !== undefined) {
            this.transaction = transactionHTTPResponse.data;
        }

        if (orderHTTPResponse.ok && orderHTTPResponse.data !== undefined) {
            this.orders = orderHTTPResponse.data;
        }
    }

    async edit(): Promise<void> {
        if (this.transaction === null) {
            return;
        }

        const transactionHTTPResponse = await BaseService.put<ITransaction>('/Transactions/' + this.$route.params.id as string, this.transaction, store.state);

        if (transactionHTTPResponse.ok) {
            await this.$router.push('/Transactions');
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
