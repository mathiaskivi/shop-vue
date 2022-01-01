<template>
    <div v-if="nowAvailable !== null && bestSellers !== null">
        <section class="banner gradient">
            <div class="container">
                <div class="align-items-center offset-1 pr-5 row">
                    <div class="col-6">
                        <span>{{ getTranslations().views.home.index.nowAvailable.toUpperCase() }}!</span>
                        <h4>{{ nowAvailable.name }}</h4>
                        <p>{{ getTranslations().views.home.index.nowAvailablePrice.replace('{0}', nowAvailable.price.toFixed(2)) }}€</p>

                        <router-link class="btn btn-light mt-1" v-bind:to="'/Products/Details/' + nowAvailable.id">{{ getTranslations().views.home.index.takeALook }}</router-link>
                    </div>
                    <div class="col-6">
                        <img v-bind:src="nowAvailable.pictures.length >= 1 ? nowAvailable.pictures[0].path : require('@/assets/placeholder.png')" class="float-right banner-image rounded-circle" alt="">
                    </div>
                </div>
            </div>
        </section>
        <br>
        <br>

        <div class="text-center">
            <h2 class="font-weight-light">{{ getTranslations().views.home.index.bestSellers.toUpperCase() }}</h2>
            <br>

            <div class="d-flex flex-wrap justify-content-between">
                <div v-for:="bestSeller in bestSellers" class="card mb-5" style="width: 12.5rem;">
                    <img class="p-2 card-image" v-bind:src="bestSeller.pictures.length >= 1 ? bestSeller.pictures[0].path : require('@/assets/placeholder.png')" alt="Card image cap">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title mb-1"><router-link class="stretched-link text-dark text-decoration-none" v-bind:to="'/Products/Details/' + bestSeller.id">{{ bestSeller.name }}</router-link></h5>
                        <p class="card-text mb-auto">{{ bestSeller.price.toFixed(2) }}€</p>
                        <template v-if="bestSeller.quantity >= 1">
                            <a class="btn btn-dark mt-3" data-quantity="1" href="#" v-on:click.prevent="(event) => addEntry(bestSeller, parseInt(event.target.dataset.quantity))" style="position: relative; z-index: 1000;">{{ getTranslations().views.home.index.addToCart }}</a>
                        </template>
                        <template v-else>
                            <a class="btn btn-danger mt-3" href="#" style="position: relative; z-index: 1000;" v-on:click.prevent="">{{ getTranslations().views.home.index.outOfStock }}</a>
                        </template>
                    </div>
                </div>

                <template v-if="bestSellers.length % 5 !== 0">
                    <div v-for="index in (5 - bestSellers.length % 5)" v-bind:key="index" style="width: 12.5rem;"></div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { BaseService } from '@/services/BaseService';
import store from '@/store/Index';
import { IProduct } from '@/domain/IProduct';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class Home extends Vue {
    nowAvailable: IProduct | null = null;
    bestSellers: IProduct[] | null = null;

    async mounted(): Promise<void> {
        const productHTTPResponse = await BaseService.getAll<IProduct>('/Products', store.state);

        if (productHTTPResponse.ok && productHTTPResponse.data !== undefined) {
            const providers = productHTTPResponse.data;

            if (providers.length >= 1) {
                this.nowAvailable = providers[providers.length - 1];
                this.bestSellers = providers.sort((productA, productB) => productB.sold - productA.sold);
            }
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
}
</script>
