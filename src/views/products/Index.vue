<template>
    <section class="banner gradient pb-4 pt-4">
        <div class="row no-gutters">
            <div class="col-2"></div>
            <div class="col-8 text-center">
                <h3 class="font-weight-light m-auto">{{ getTranslations().views.products.index.products.toUpperCase() }}</h3>
            </div>
            <div class="col-2">
                <template v-if="getRoles() !== null && getRoles().includes('Seller')">
                    <router-link class="btn btn-light float-right mr-4" v-bind:to="'/Products/Create'">➕</router-link>
                </template>
            </div>
        </div>
    </section>
    <br>

    <div class="row">
        <div class="col-2">
            <h5>
                {{ getTranslations().views.products.index.category }}
                <template v-if="categoryId">
                    <br />
                    <a class="font-weight-light text-decoration-none" href="#" v-on:click.prevent="filter('', sortBy)">({{ getTranslations().views.products.index.clear }})</a>
                </template>
            </h5>
            <template v-for="category in categories" v-bind:key="category">
                <a v-bind:class="categoryId !== null && categoryId === category.id ? 'font-italic text-decoration-none' : 'text-decoration-none'" href="#" v-on:click.prevent="filter(category.id)">{{ category.name }}</a>
                <br>
            </template>
        </div>
        <div class="col-10">
            <div class="row no-gutters mb-3">
                <div class="ml-auto">
                    <select class="custom-select" id="sortBy" v-on:change.prevent="filter(categoryId, $event.target.value)">
                        <option value="" selected="selected">{{ getTranslations().views.products.index.sortBy }}...</option>
                        <option value="best-sellers">{{ getTranslations().views.products.index.sortByBestSellers }}</option>
                        <option value="title-ascending">{{ getTranslations().views.products.index.sortByAlphabeticallyAZ }}</option>
                        <option value="title-descending">{{ getTranslations().views.products.index.sortByAlphabeticallyZA }}</option>
                        <option value="price-ascending">{{ getTranslations().views.products.index.sortByPriceLH }}</option>
                        <option value="price-descending">{{ getTranslations().views.products.index.sortByPriceHL }}</option>
                    </select>
                </div>
            </div>

            <div class="text-center">
                <div class="d-flex flex-wrap justify-content-between">
                    <div v-for="product in productsFiltered" v-bind:key="product" class="card mb-5" style="width: 12.5rem;">
                        <img v-bind:src="product.pictures.length >= 1 ? product.pictures[0].path : require('@/assets/placeholder.png')" class="p-2 card-image" alt="">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title mb-1">
                                <router-link class="stretched-link text-dark text-decoration-none" v-bind:to="'/Products/Details/' + product.id">{{ product.name }}</router-link>
                            </h5>
                            <p class="card-text mb-auto">{{ product.price.toFixed(2) }}€</p>
                            <template v-if="product.quantity >= 1">
                                <a class="btn btn-dark mt-3" data-quantity="1" href="#" v-on:click.prevent="(event) => addEntry(product, parseInt(event.target.dataset.quantity))" style="position: relative; z-index: 1000;">{{ getTranslations().views.products.index.addToCart }}</a>
                            </template>
                            <template v-else>
                                <a class="btn btn-danger mt-3" href="#" style="position: relative; z-index: 1000;" v-on:click.prevent="">{{ getTranslations().views.products.index.outOfStock }}</a>
                            </template>
                        </div>
                    </div>

                    <template v-if="productsFiltered.length % 4 !== 0">
                        <div v-for="index in (4 - productsFiltered.length % 4)" v-bind:key="index" style="width: 12.5rem;"></div>
                    </template>
                </div>
            </div>
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

export default class ProductsIndex extends Vue {
    categoryId = '';
    sortBy = '';

    categories: ICategory[] = [];
    products: IProduct[] = [];
    productsFiltered: IProduct[] = [];

    async mounted(): Promise<void> {
        const categoryHTTPResponse = await BaseService.getAll<ICategory>('/Categories', store.state);
        const productHTTPResponse = await BaseService.getAll<IProduct>('/Products', store.state);

        if (categoryHTTPResponse.ok && categoryHTTPResponse.data !== undefined) {
            this.categories = categoryHTTPResponse.data;
        }

        if (productHTTPResponse.ok && productHTTPResponse.data !== undefined) {
            this.products = productHTTPResponse.data;
            this.productsFiltered = productHTTPResponse.data;
        }
    }

    getRoles(): string[] | null {
        return store.state.roles;
    }

    getTranslations(): ITranslations | null {
        return store.state.translations;
    }

    addEntry(product: IProduct, quantity: number): void {
        const entry = {
            productId: product.id,
            productName: product.name,
            productPrice: product.price,
            productQuantity: product.quantity,
            quantity,
            total: product.price * quantity
        }

        store.commit('addEntry', entry);
    }

    filter(categoryId: string, sortBy: string): void {
        let productsFiltered = this.products;
        if (categoryId !== '') {
            productsFiltered = this.products.filter(product => product.categoryId === categoryId);
        }

        if (sortBy === 'best-sellers') {
            productsFiltered = productsFiltered.sort((productA, productB) => productB.sold - productA.sold);
        } else if (sortBy === 'title-ascending') {
            productsFiltered = productsFiltered.sort((productA, productB) => productA.name.localeCompare(productB.name));
        } else if (sortBy === 'title-descending') {
            productsFiltered = productsFiltered.sort((productA, productB) => productB.name.localeCompare(productA.name));
        } else if (sortBy === 'price-ascending') {
            productsFiltered = productsFiltered.sort((productA, productB) => productA.price - productB.price);
        } else if (sortBy === 'price-descending') {
            productsFiltered = productsFiltered.sort((productA, productB) => productB.price - productA.price);
        }

        this.categoryId = categoryId;
        this.sortBy = sortBy;
        this.productsFiltered = productsFiltered;
    }
}
</script>
