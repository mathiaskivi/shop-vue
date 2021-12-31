<template>
    <div v-if="orderProduct !== null">
        <h1>{{ getTranslations().views.orderProducts.details.title }}</h1>

        <div>
            <h4>{{ getTranslations().views.orderProducts.details.orderProduct }}</h4>
            <hr/>
            <dl class="row">
                <dt class="col-sm-2">
                    {{ getTranslations().views.orderProducts.details.order }}
                </dt>
                <dd class="col-sm-10">
                    {{ orderProduct.orderId }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.orderProducts.details.product }}
                </dt>
                <dd class="col-sm-10">
                    {{ orderProduct.product.name }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.orderProducts.details.quantity }}
                </dt>
                <dd class="col-sm-10">
                    {{ orderProduct.quantity }}
                </dd>
            </dl>
        </div>

        <div>
            <template v-if="getRoles() != null && getRoles().includes('Seller')">
                <router-link v-bind:to="'/OrderProducts/Edit/' + orderProduct.id">{{ getTranslations().views.orderProducts.details.edit }}</router-link> |
            </template>
            <router-link v-bind:to="'/OrderProducts'">{{ getTranslations().views.orderProducts.details.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { IOrderProduct } from '@/domain/IOrderProduct';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class OrderProductsDetails extends Vue {
    orderProduct: IOrderProduct | null = null;

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
