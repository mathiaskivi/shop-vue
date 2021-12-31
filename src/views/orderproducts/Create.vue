<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller')">
        <h1>{{ getTranslations().views.orderProducts.create.title }}</h1>

        <h4>{{ getTranslations().views.orderProducts.create.orderProduct }}</h4>
        <hr/>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.orderProducts.create.order }}</label>
                    <select class="form-control valid" v-model="orderProduct.orderId">
                        <option v-for="order in orders" v-bind:key="order" v-bind:value="order.id">{{ order.id }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.orderProducts.create.product }}</label>
                    <select class="form-control valid" v-model="orderProduct.productId">
                        <option v-for="product in products" v-bind:key="product" v-bind:value="product.id">{{ product.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.orderProducts.create.quantity }}</label>
                    <input v-model="orderProduct.quantity" class="form-control" type="number"/>
                </div>
                <div class="form-group">
                    <input type="submit" v-bind:value="getTranslations().views.orderProducts.create.title" class="btn btn-primary" v-on:click="create()"/>
                </div>
            </div>
        </div>

        <div>
            <router-link v-bind:to="'/OrderProducts'">{{ getTranslations().views.orderProducts.create.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { IOrder } from '@/domain/IOrder';
import { IOrderProduct } from '@/domain/IOrderProduct';
import { IProduct } from '@/domain/IProduct';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class OrderProductsCreate extends Vue {
    orderProduct: IOrderProduct = {
        id: '00000000-0000-0000-0000-000000000000',
        orderId: '00000000-0000-0000-0000-000000000000',
        productId: '00000000-0000-0000-0000-000000000000',
        quantity: 0.00
    };

    orders: IOrder[] | null = null;
    products: IProduct[] | null = null;

    async create(): Promise<void> {
        if (this.orderProduct.orderId === '00000000-0000-0000-0000-000000000000' ||
            this.orderProduct.productId === '00000000-0000-0000-0000-000000000000') {
            return;
        }

        // Exclude optional fields from this.location
        const { product, ...orderProduct } = this.orderProduct;

        const orderProductHTTPResponse = await BaseService.post<IOrderProduct>('/OrderProducts', orderProduct, store.state);

        if (orderProductHTTPResponse.ok) {
            await this.$router.push('/OrderProducts');
        }
    }

    async mounted(): Promise<void> {
        const orderHTTPResponse = await BaseService.getAll<IOrder>('/Orders', store.state);
        const productHTTPResponse = await BaseService.getAll<IProduct>('/Products', store.state);

        if (orderHTTPResponse.ok) {
            this.orders = orderHTTPResponse.data!;
        }

        if (productHTTPResponse.ok) {
            this.products = productHTTPResponse.data!;
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
