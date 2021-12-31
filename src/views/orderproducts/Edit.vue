<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller') && orderProduct !== null">
        <h1>{{ getTranslations().views.orderProducts.edit.title }}</h1>

        <h4>{{ getTranslations().views.orderProducts.edit.orderProduct }}</h4>
        <hr/>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.orderProducts.edit.order }}</label>
                    <select class="form-control valid" v-model="orderProduct.orderId">
                        <option v-for="order in orders" v-bind:key="order" v-bind:value="order.id">{{ order.id }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.orderProducts.edit.product }}</label>
                    <select class="form-control valid" v-model="orderProduct.productId">
                        <option v-for="product in products" v-bind:key="product" v-bind:value="product.id">{{ product.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.orderProducts.edit.quantity }}</label>
                    <input class="form-control" type="number" v-model="orderProduct.quantity"/>
                </div>
                <div class="form-group">
                    <input type="submit" v-bind:value="getTranslations().views.orderProducts.edit.save" class="btn btn-primary" v-on:click="edit()"/>
                </div>
            </div>
        </div>

        <div>
            <router-link v-bind:to="'/OrderProducts'">{{ getTranslations().views.orderProducts.edit.backToList }}</router-link>
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

export default class OrderProductsEdit extends Vue {
    orderProduct: IOrderProduct | null = null;

    orders: IOrder[] | null = null;
    products: IProduct[] | null = null;

    async edit(): Promise<void> {
        if (this.orderProduct === null) {
            return;
        }

        // Exclude optional fields from this.location
        const { product, ...orderProduct } = this.orderProduct;

        const orderProductHTTPResponse = await BaseService.put<IOrderProduct>('/OrderProducts/' + this.$route.params.id as string, orderProduct, store.state);

        if (orderProductHTTPResponse.ok) {
            await this.$router.push('/OrderProducts');
        }
    }

    async mounted(): Promise<void> {
        const orderProductHTTPResponse = await BaseService.get<IOrderProduct>('/OrderProducts/' + this.$route.params.id as string, store.state);
        const orderHTTPResponse = await BaseService.getAll<IOrder>('/Orders', store.state);
        const productHTTPResponse = await BaseService.getAll<IProduct>('/Products', store.state);

        if (orderProductHTTPResponse.ok) {
            this.orderProduct = orderProductHTTPResponse.data!;
        }

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
