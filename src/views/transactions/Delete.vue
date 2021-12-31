<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller') && transaction !== null">
        <h1>{{ getTranslations().views.transactions.delete.title }}</h1>
        <h3>{{ getTranslations().views.transactions.delete.areYouSure }}</h3>

        <div>
            <h4>{{ getTranslations().views.transactions.delete.transaction }}</h4>
            <hr/>
            <dl class="row">
                <dt class="col-sm-2">
                    {{ getTranslations().views.transactions.delete.order }}
                </dt>
                <dd class="col-sm-10">
                    {{ transaction.orderId }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.transactions.delete.amount }}
                </dt>
                <dd class="col-sm-10">
                    {{ transaction.amount }}
                </dd>
            </dl>
        </div>
        <div>
            <input type="submit" v-bind:value="getTranslations().views.transactions.delete.title" class="btn btn-danger" v-on:click="this.delete()"/> |
            <router-link v-bind:to="'/Transactions'">{{ getTranslations().views.transactions.delete.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { ITransaction } from '@/domain/ITransaction';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class TransactionsDelete extends Vue {
    transaction: ITransaction | null = null;

    async delete(): Promise<void> {
        const transactionHTTPResponse = await BaseService.delete<ITransaction>('/Transactions/' + this.$route.params.id as string, store.state);

        if (transactionHTTPResponse.ok) {
            await this.$router.push('/Transactions');
        }
    }

    async mounted(): Promise<void> {
        const transactionHTTPResponse = await BaseService.get<ITransaction>('/Transactions/' + this.$route.params.id as string, store.state);

        if (transactionHTTPResponse.ok && transactionHTTPResponse.data !== undefined) {
            this.transaction = transactionHTTPResponse.data;
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
