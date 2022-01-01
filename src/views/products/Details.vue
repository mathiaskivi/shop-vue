<template>
    <div v-if="product !== null">
        <section class="banner gradient pb-4 pt-4">
            <div class="row no-gutters">
                <div class="col-2"></div>
                <div class="col-8 text-center">
                    <h3 class="font-weight-light m-auto">{{ product.name }}</h3>
                </div>
                <div class="col-2 pr-4">
                    <template v-if="getRoles() !== null && getRoles().includes('Seller')">
                        <router-link class="btn btn-light float-right" v-bind:to="'/Products/Delete/' + product.id">❌</router-link>
                        <router-link class="btn btn-light float-right mr-2" v-bind:to="'/Products/Edit/' + product.id">✏️</router-link>
                    </template>
                </div>
            </div>
        </section>
        <br>

        <div class="row">
            <div class="col-5">
                <div id="carousel" class="carousel slide" data-interval="false" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <template v-if="product.pictures.length > 1">
                            <li v-for="index in product.pictures.length" v-bind:key="index" v-bind:class="index === 0 ? ' active' : ''" v-bind:data-slide-to="index" data-target="carousel"></li>
                        </template>
                    </ol>
                    <div class="carousel-inner">
                        <template v-if="product.pictures.length >= 1">
                            <div v-for="(picture, index) in product.pictures" v-bind:key="picture" v-bind:class="index === 0 ? 'carousel-item active' : 'carousel-item'">
                                <img class="d-block w-100" v-bind:src="picture.path" alt="">
                            </div>
                        </template>
                        <template v-else>
                            <div class="carousel-item active">
                                <img class="d-block w-100" src="@/assets/placeholder.png" alt="" title="">
                            </div>
                        </template>
                    </div>
                    <template v-if="product.pictures.length > 1">
                        <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
                            <span class="carousel-control-next-icon"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </template>
                </div>
            </div>
            <div class="col-7">
                <div class="row no-gutters mb-3">
                    <div class="col">
                        <h3>{{ product.price.toFixed(2) }}€</h3>
                        <h6>{{ getTranslations().views.products.details.inStock }}: {{ product.quantity }}</h6>
                        <hr>
                        <span>{{ product.description }}</span>

                        <div class="row no-gutters mt-3">
                            <template v-if="product.quantity >= 1">
                                <a class="btn btn-dark" data-quantity="1" href="#" id="add-to-cart" v-on:click.prevent="(event) => addEntry(product, parseInt(event.target.dataset.quantity))">{{ getTranslations().views.products.details.addToCart }}</a>
                                <input class="col-1 d-flex form-control ml-3 pl-2" min="1" step="1" type="number" v-bind:max="product.quantity" v-on:input="(event) => changeQuantity(event.target.value)" value="1">
                            </template>
                            <template v-else>
                                <a class="btn btn-danger" href="#" v-on:click.prevent="">{{ getTranslations().views.products.details.outOfStock }}</a>
                            </template>
                        </div>
                    </div>
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
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class ProductsDetails extends Vue {
    product: IProduct | null = null;

    async mounted(): Promise<void> {
        const productHTTPResponse = await BaseService.get<IProduct>('/Products/' + this.$route.params.id as string, store.state);

        if (productHTTPResponse.ok && productHTTPResponse.data !== undefined) {
            this.product = productHTTPResponse.data;
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

    changeQuantity(quantity: number): void {
        const addToCartElement = document.getElementById('add-to-cart');
        if (addToCartElement !== null) {
            addToCartElement.dataset.quantity = quantity.toString();
        }
    }
}
</script>

<style scoped>
.carousel-control-prev-icon {
    background-image: url(~@/assets/arrow-left-circle-fill.svg);
    height: 1.5rem;
    width: 1.5rem;
    max-height: 1.5rem;
    max-width: 1.5rem;
}

.carousel-control-next-icon {
    background-image: url(~@/assets/arrow-right-circle-fill.svg);
    height: 1.5rem;
    width: 1.5rem;
    max-height: 1.5rem;
    max-width: 1.5rem;
}
</style>
