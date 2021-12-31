<template>
    <div v-if="transaction !== null">
        <h1>{{ getTranslations().views.transactions.details.title }}</h1>

        <div>
            <h4>{{ getTranslations().views.transactions.details.transaction }}</h4>
            <hr/>
            <dl class="row">
                <dt class="col-sm-2">
                    {{ getTranslations().views.transactions.details.order }}
                </dt>
                <dd class="col-sm-10">
                    {{ transaction.orderId }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.transactions.details.amount }}
                </dt>
                <dd class="col-sm-10">
                    {{ transaction.amount }}
                </dd>
            </dl>
        </div>

        <div>
            <template v-if="getRoles() != null && getRoles().includes('Seller')">
                <router-link v-bind:to="'/Transactions/Edit/' + transaction.id">{{ getTranslations().views.transactions.details.edit }}</router-link> |
            </template>
            <router-link v-bind:to="'/Transactions'">{{ getTranslations().views.transactions.details.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { ITransaction } from '@/domain/ITransaction';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class TransactionsDetails extends Vue {
    transaction: ITransaction | null = null;

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
