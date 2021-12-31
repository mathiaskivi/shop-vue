<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller') && product !== null">
        <h1>{{ getTranslations().views.products.delete.title }}</h1>
        <h3>{{ getTranslations().views.products.delete.areYouSure }}</h3>

        <div>
            <h4>{{ getTranslations().views.products.delete.product }}</h4>
            <hr/>
            <dl class="row">
                <dt class="col-sm-2">
                    {{ getTranslations().views.products.delete.category }}
                </dt>
                <dd class="col-sm-10">
                    {{ product.category.name }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.products.delete.name }}
                </dt>
                <dd class="col-sm-10">
                    {{ product.name }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.products.delete.description }}
                </dt>
                <dd class="col-sm-10">
                    {{ product.description }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.products.delete.price }}
                </dt>
                <dd class="col-sm-10">
                    {{ product.price }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.products.delete.quantity }}
                </dt>
                <dd class="col-sm-10">
                    {{ product.quantity }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.products.delete.sold }}
                </dt>
                <dd class="col-sm-10">
                    {{ product.sold }}
                </dd>
            </dl>
        </div>
        <div>
            <input type="submit" v-bind:value="getTranslations().views.products.delete.title" class="btn btn-danger" v-on:click="this.delete()"/> |
            <router-link v-bind:to="'/Products'">{{ getTranslations().views.products.delete.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { IProduct } from '@/domain/IProduct';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class ProductsDelete extends Vue {
    product: IProduct | null = null;

    async delete(): Promise<void> {
        const productHTTPResponse = await BaseService.delete<IProduct>('/Products/' + this.$route.params.id as string, store.state);

        if (productHTTPResponse.ok) {
            await this.$router.push('/Products');
        }
    }

    async mounted(): Promise<void> {
        const productHTTPResponse = await BaseService.get<IProduct>('/Products/' + this.$route.params.id as string, store.state);

        if (productHTTPResponse.ok) {
            this.product = productHTTPResponse.data!;
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
