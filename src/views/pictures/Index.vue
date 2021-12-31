<template>
    <h1>{{ getTranslations().views.pictures.index.title }}</h1>

    <p></p>
    <table class="table">
        <thead>
        <tr>
            <th>
                {{ getTranslations().views.pictures.index.product }}
            </th>
            <th>
                {{ getTranslations().views.pictures.index.path }}
            </th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="picture in pictures" v-bind:key="picture">
            <td>
                {{ getProduct(picture.productId) }}
            </td>
            <td>
                {{ picture.path }}
            </td>
            <td></td>
        </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { IPicture } from '@/domain/IPicture';
import { IProduct } from '@/domain/IProduct';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class PicturesIndex extends Vue {
    pictures: IPicture[] | null = null;

    products: IProduct[] | null = null;

    async mounted(): Promise<void> {
        const pictureHTTPResponse = await BaseService.getAll<IPicture>('/Pictures', store.state);
        const productHTTPResponse = await BaseService.getAll<IProduct>('/Products', store.state);

        if (pictureHTTPResponse.ok) {
            this.pictures = pictureHTTPResponse.data!;
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
