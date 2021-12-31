<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller') && picture !== null">
        <h1>{{ getTranslations().views.pictures.delete.title }}</h1>
        <h3>{{ getTranslations().views.pictures.delete.areYouSure }}</h3>

        <div>
            <h4>{{ getTranslations().views.pictures.delete.picture }}</h4>
            <hr/>
            <dl class="row">
                <dt class="col-sm-2">
                    {{ getTranslations().views.pictures.delete.product }}
                </dt>
                <dd class="col-sm-10">
                    {{ getProduct(picture.productId) }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.pictures.delete.path }}
                </dt>
                <dd class="col-sm-10">
                    {{ picture.path }}
                </dd>
            </dl>
        </div>
        <div>
            <input type="submit" v-bind:value="getTranslations().views.pictures.delete.title" class="btn btn-danger" v-on:click="this.delete()"/> |
            <router-link v-bind:to="'/Products/Edit/' + picture.productId">{{ getTranslations().views.pictures.delete.cancel }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { IPicture } from '@/domain/IPicture';
import { IProduct } from '@/domain/IProduct';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class PicturesDelete extends Vue {
    picture: IPicture | null = null;

    products: IProduct[] | null = null;

    async delete(): Promise<void> {
        if (this.picture === null) {
            return;
        }

        const pictureHTTPResponse = await BaseService.delete<IPicture>('/Pictures/' + this.$route.params.id as string, store.state);

        if (pictureHTTPResponse.ok) {
            await this.$router.push('/Products/Edit/' + this.picture.productId);
        }
    }

    async mounted(): Promise<void> {
        const pictureHTTPResponse = await BaseService.get<IPicture>('/Pictures/' + this.$route.params.id as string, store.state);
        const productHTTPResponse = await BaseService.getAll<IProduct>('/Products', store.state);

        if (pictureHTTPResponse.ok) {
            this.picture = pictureHTTPResponse.data!;
        }

        if (productHTTPResponse.ok) {
            this.products = productHTTPResponse.data!;
        }
    }

    getProduct(productId: string): string {
        if (this.products === null) {
            return '';
        }

        for (const product of this.products) {
            if (product.id === productId) {
                return product.name;
            }
        }

        return '';
    }

    getRoles(): string[] | null {
        return store.state.roles;
    }

    getTranslations(): ITranslations | null {
        return store.state.translations;
    }
}
</script>
