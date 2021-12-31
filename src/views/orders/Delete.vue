<template>
    <div v-if="getRoles() !== null && getRoles().includes('Admin') && order !== null">
        <h1>{{ getTranslations().views.orders.delete.title }}</h1>
        <h3>{{ getTranslations().views.orders.delete.areYouSure }}</h3>

        <div>
            <h4>{{ getTranslations().views.orders.delete.order }}</h4>
            <hr/>
            <dl class="row">
                <dt class="col-sm-2">
                    {{ getTranslations().views.orders.delete.appUser }}
                </dt>
                <dd class="col-sm-10">
                    {{ order.appUserId }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.orders.delete.location }}
                </dt>
                <dd class="col-sm-10">
                    {{ order.location.name }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.orders.delete.status }}
                </dt>
                <dd class="col-sm-10">
                    {{ order.status.name }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.orders.delete.dateTime }}
                </dt>
                <dd class="col-sm-10">
                    {{ order.dateTime }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.orders.delete.total }}
                </dt>
                <dd class="col-sm-10">
                    {{ order.total }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.orders.delete.tracking }}
                </dt>
                <dd class="col-sm-10">
                    {{ order.tracking }}
                </dd>
            </dl>
        </div>
        <div>
            <input type="submit" v-bind:value="getTranslations().views.orders.delete.title" class="btn btn-danger" v-on:click="this.delete()"/> |
            <router-link v-bind:to="'/Orders'">{{ getTranslations().views.orders.delete.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { IOrder } from '@/domain/IOrder';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class OrdersDelete extends Vue {
    order: IOrder | null = null;

    async delete(): Promise<void> {
        const orderHTTPResponse = await BaseService.delete<IOrder>('/Orders/' + this.$route.params.id as string, store.state);

        if (orderHTTPResponse.ok) {
            await this.$router.push('/Orders');
        }
    }

    async mounted(): Promise<void> {
        const orderHTTPResponse = await BaseService.get<IOrder>('/Orders/' + this.$route.params.id as string, store.state);

        if (orderHTTPResponse.ok) {
            this.order = orderHTTPResponse.data!;
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
