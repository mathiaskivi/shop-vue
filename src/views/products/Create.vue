<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller')">
        <h1>{{ getTranslations().views.products.create.title }}</h1>

        <h4>{{ getTranslations().views.products.create.product }}</h4>
        <hr/>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.products.create.category }}</label>
                    <select class="form-control valid" v-model="product.categoryId">
                        <option v-for="category in categories" v-bind:key="category" v-bind:value="category.id">{{ category.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.products.create.name }}</label>
                    <input v-model="product.name" class="form-control" type="text"/>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.products.create.description }}</label>
                    <input v-model="product.description" class="form-control" type="text"/>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.products.create.price }}</label>
                    <input v-model="product.price" class="form-control" type="number"/>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.products.create.quantity }}</label>
                    <input v-model="product.quantity" class="form-control" type="number"/>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.products.create.sold }}</label>
                    <input v-model="product.sold" class="form-control" type="number"/>
                </div>
                <div class="form-group">
                    <input type="submit" v-bind:value="getTranslations().views.products.create.title" class="btn btn-primary" v-on:click="create()"/>
                </div>
            </div>
        </div>

        <div>
            <router-link v-bind:to="'/Products'">{{ getTranslations().views.products.create.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { IProduct } from '@/domain/IProduct';
import { ICategory } from '@/domain/ICategory';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class ProductsCreate extends Vue {
    product: IProduct = {
        id: '00000000-0000-0000-0000-000000000000',
        categoryId: '00000000-0000-0000-0000-000000000000',
        nameId: '00000000-0000-0000-0000-000000000000',
        name: '',
        descriptionId: '00000000-0000-0000-0000-000000000000',
        description: '',
        price: 0.00,
        quantity: 0,
        sold: 0
    };

    categories: ICategory[] | null = null;

    async create(): Promise<void> {
        if (this.product.categoryId === '00000000-0000-0000-0000-000000000000') {
            return;
        }

        // Exclude optional fields from this.product
        const { category, pictures, ...product } = this.product;

        const productHTTPResponse = await BaseService.post<IProduct>('/Products', product, store.state);

        if (productHTTPResponse.ok) {
            await this.$router.push('/Products');
        }
    }

    async mounted(): Promise<void> {
        const categoryHTTPResponse = await BaseService.getAll<ICategory>('/Categories', store.state);

        if (categoryHTTPResponse.ok) {
            this.categories = categoryHTTPResponse.data!;
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
