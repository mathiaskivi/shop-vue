<template>
    <header>
        <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div class="container">
                <router-link class="navbar-brand" v-bind:to="'/'">{{ getTranslations().views.shared._Layout.brand }}</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul class="navbar-nav flex-grow-1">
                        <li class="nav-item">
                            <router-link class="nav-link text-dark" v-bind:to="'/Products'">{{ getTranslations().views.shared._Layout.products }}</router-link>
                        </li>
                    </ul>

                    <ul class="navbar-nav">
                        <li class="nav-item" v-if="getToken() === null">
                            <router-link v-bind:to="'/Identity/Account/Register'" class="nav-link text-dark">{{ getTranslations().views.shared._LoginPartial.register }}</router-link>
                        </li>
                        <li class="nav-item" v-if="getToken() === null">
                            <router-link v-bind:to="'/Identity/Account/Login'" class="nav-link text-dark">{{ getTranslations().views.shared._LoginPartial.login }}</router-link>
                        </li>
                        <li class="nav-item dropdown" v-if="getToken() !== null">
                            <a class="nav-link dropdown-toggle text-dark" href="#" data-toggle="dropdown">
                                {{ getFullName() }}
                            </a>
                            <div class="dropdown-menu">
                                <router-link class="nav-link text-dark" v-bind:to="'/Orders'">{{ getTranslations().views.shared._LoginPartial.orders }}</router-link>
                                <template v-if="getRoles() !== null && getRoles().includes('Admin')">
                                    <hr class="m-2">
                                    <router-link class="nav-link text-dark" v-bind:to="'/Categories'">{{ getTranslations().views.shared._LoginPartial.categories }}</router-link>
                                    <router-link class="nav-link text-dark" v-bind:to="'/Locations'">{{ getTranslations().views.shared._LoginPartial.locations }}</router-link>
                                    <router-link class="nav-link text-dark" v-bind:to="'/OrderProducts'">{{ getTranslations().views.shared._LoginPartial.orderProducts }}</router-link>
                                    <router-link class="nav-link text-dark" v-bind:to="'/Pictures'">{{ getTranslations().views.shared._LoginPartial.pictures }}</router-link>
                                    <router-link class="nav-link text-dark" v-bind:to="'/Providers'">{{ getTranslations().views.shared._LoginPartial.providers }}</router-link>
                                    <router-link class="nav-link text-dark" v-bind:to="'/Statuses'">{{ getTranslations().views.shared._LoginPartial.statuses }}</router-link>
                                    <router-link class="nav-link text-dark" v-bind:to="'/Transactions'">{{ getTranslations().views.shared._LoginPartial.transactions }}</router-link>
                                </template>
                            </div>
                        </li>
                        <li class="nav-item" v-if="getToken() !== null">
                            <a href="#" class="nav-link text-dark" v-on:click.prevent="logout()">{{ getTranslations().views.shared._LoginPartial.logout }}</a>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link text-dark" v-bind:to="'/Cart'">{{ getTranslations().views.shared._CartPartial.cart }}{{ getCart().entries.length >= 1 ? ' (' + getCart().entries.length + ')' : '' }}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script lang="ts">
import { ICart } from '@/domain/checkout/ICart';
import { ITranslations } from '@/domain/internationalization/ITranslations';
import { Vue } from 'vue-class-component';
import store from '@/store/Index';

export default class Header extends Vue {
    getCart(): ICart {
        return store.state.cart;
    }

    getFullName(): string | null {
        return store.state.fullName;
    }

    getRoles(): string[] | null {
        return store.state.roles;
    }

    getToken(): string | null {
        return store.state.token;
    }

    getTranslations(): ITranslations | null {
        return store.state.translations;
    }

    logout(): void {
        store.commit('logout');
        this.$router.push('/');
    }
}
</script>
