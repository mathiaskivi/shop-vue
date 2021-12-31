<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller') && orderProduct !== null">
        <h1>{{ getTranslations().views.orderProducts.delete.title }}</h1>
        <h3>{{ getTranslations().views.orderProducts.delete.areYouSure }}</h3>

        <div>
            <h4>{{ getTranslations().views.orderProducts.delete.orderProduct }}</h4>
            <hr/>
            <dl class="row">
                <dt class="col-sm-2">
                    {{ getTranslations().views.orderProducts.delete.order }}
                </dt>
                <dd class="col-sm-10">
                    {{ orderProduct.orderId }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.orderProducts.delete.product }}
                </dt>
                <dd class="col-sm-10">
                    {{ orderProduct.product.name }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.orderProducts.delete.quantity }}
                </dt>
                <dd class="col-sm-10">
                    {{ orderProduct.quantity }}
                </dd>
            </dl>
        </div>
        <div>
            <input type="submit" v-bind:value="getTranslations().views.orderProducts.delete.title" class="btn btn-danger" v-on:click="this.delete()"/> |
            <router-link v-bind:to="'/OrderProducts'">{{ getTranslations().views.orderProducts.delete.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { IOrderProduct } from '@/domain/IOrderProduct';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class OrderProductsDelete extends Vue {
    orderProduct: IOrderProduct | null = null;

    async delete(): Promise<void> {
        const orderProductHTTPResponse = await BaseService.delete<IOrderProduct>('/OrderProducts/' + this.$route.params.id as string, store.state);

        if (orderProductHTTPResponse.ok) {
            await this.$router.push('/OrderProducts');
        }
    }

    async mounted(): Promise<void> {
        const orderProductHTTPResponse = await BaseService.get<IOrderProduct>('/OrderProducts/' + this.$route.params.id as string, store.state);

        if (orderProductHTTPResponse.ok) {
            this.orderProduct = orderProductHTTPResponse.data!;
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
