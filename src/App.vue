<template>
    <template v-if="getTranslations() === null">
        <div class="container h-100 d-flex justify-content-center">
            <div class="mt-lg-5">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    </template>
    <template v-if="getTranslations() !== null">
        <Header />

        <div class="container">
            <main role="main" class="pb-3">
                <router-view v-bind:key="this.$store.state.language" />
            </main>
        </div>

        <Footer />
    </template>
</template>

<script lang="ts">
import { ITranslations } from '@/domain/internationalization/ITranslations';
import { Options, Vue } from 'vue-class-component';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import store from '@/store/Index';

@Options({
    components: {
        Footer,
        Header
    }
})

export default class App extends Vue {
    async mounted(): Promise<void> {
        await store.dispatch('setLanguage', store.state.language);
    }

    getTranslations(): ITranslations | null {
        return store.state.translations;
    }
}
</script>

<style>
/* Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
for details on configuring this project to bundle and minify static web assets. */

a.navbar-brand {
    white-space: normal;
    text-align: center;
    word-break: break-all;
}

/* Provide sufficient contrast against white background */
a {
    color: #0366d6;
}

.btn-primary {
    color: #fff;
    background-color: #1b6ec2;
    border-color: #1861ac;
}

.nav-pills .nav-link.active, .nav-pills .show > .nav-link {
    color: #fff;
    background-color: #1b6ec2;
    border-color: #1861ac;
}

/* Sticky footer styles
-------------------------------------------------- */
html {
    font-size: 14px;
}
@media (min-width: 768px) {
    html {
        font-size: 16px;
    }
}

.border-top {
    border-top: 1px solid #e5e5e5;
}
.border-bottom {
    border-bottom: 1px solid #e5e5e5;
}

.box-shadow {
    box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05);
}

button.accept-policy {
    font-size: 1rem;
    line-height: inherit;
}

/* Sticky footer styles
-------------------------------------------------- */
html {
    position: relative;
    min-height: 100%;
}

body {
    /* Margin bottom by footer height */
    margin-bottom: 60px;
}

.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    white-space: nowrap;
    line-height: 60px; /* Vertically center the text there */
}

@media (min-width:768px) {
    .banner {
        padding-bottom: 100px;
        padding-top: 100px;
    }
}

.banner {
    padding-bottom: 50px;
    padding-top: 50px;
}

.banner-image {
    height: 50%;
    width: 50%;
    object-fit: cover;
}

.card-image {
    height: auto;
    width: 100%;
    object-fit: cover;
}

.gradient {
    background: linear-gradient(120deg, #1b1e21, #95999c);
    color: #ffffff;
}

.new-line {
    width: 100%;
}

.cart-image {
    max-height: 10%;
    max-width: 10%;
}
</style>
