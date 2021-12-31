<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller') && product !== null">
        <h1>{{ getTranslations().views.products.edit.title }}</h1>

        <h4>{{ getTranslations().views.products.edit.product }}</h4>
        <hr/>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.products.edit.category }}</label>
                    <select class="form-control valid" v-model="product.categoryId">
                        <option v-for="category in categories" v-bind:key="category" v-bind:value="category.id">{{ category.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.products.edit.name }}</label>
                    <input class="form-control" type="text" v-model="product.name"/>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.products.edit.description }}</label>
                    <input class="form-control" type="text" v-model="product.description"/>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.products.edit.price }}</label>
                    <input class="form-control" type="number" v-model="product.price"/>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.products.edit.quantity }}</label>
                    <input class="form-control" type="number" v-model="product.quantity"/>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.products.edit.sold }}</label>
                    <input class="form-control" type="number" v-model="product.sold"/>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.products.edit.pictures }}:</label>
                    <br/>

                    <template v-if="product.pictures.length >= 1">
                        <template v-for="picture in product.pictures" v-bind:key="picture">
                            <span>{{ picture.path }}</span>
                            <router-link v-bind:to="'/Pictures/Delete/' + picture.id">{{ getTranslations().views.products.edit.delete }}</router-link>
                            <br/>
                        </template>
                    </template>
                    <template v-else>
                        {{ getTranslations().views.products.edit.none }}
                        <br/>
                    </template>

                    <router-link class="btn btn-success" v-bind:to="'/Pictures/Create/' + product.id">{{ getTranslations().views.products.edit.add }}</router-link>
                    <br/>
                </div>
                <div class="form-group">
                    <input class="btn btn-primary" type="submit" v-bind:value="getTranslations().views.products.edit.save" v-on:click="edit()"/>
                </div>
            </div>
        </div>

        <div>
            <router-link v-bind:to="'/Products'">{{ getTranslations().views.products.edit.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { ICategory } from '@/domain/ICategory';
import { IProduct } from '@/domain/IProduct';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class ProductsEdit extends Vue {
    product: IProduct | null = null;

    categories: ICategory[] | null = null;

    async edit(): Promise<void> {
        if (this.product === null) {
            return;
        }

        // Exclude optional fields from this.product
        const { category, pictures, ...product } = this.product;

        const productHTTPResponse = await BaseService.put<IProduct>('/Products/' + this.$route.params.id as string, product, store.state);

        if (productHTTPResponse.ok) {
            await this.$router.push('/Products');
        }
    }

    async mounted(): Promise<void> {
        const productHTTPResponse = await BaseService.get<IProduct>('/Products/' + this.$route.params.id as string, store.state);
        const categoryHTTPResponse = await BaseService.getAll<ICategory>('/Categories', store.state);

        if (productHTTPResponse.ok && productHTTPResponse.data !== undefined) {
            this.product = productHTTPResponse.data;
        }

        if (categoryHTTPResponse.ok && categoryHTTPResponse.data !== undefined) {
            this.categories = categoryHTTPResponse.data;
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
