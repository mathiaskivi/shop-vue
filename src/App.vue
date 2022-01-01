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
html {
    font-size: 14px;
}

@media (min-width: 768px) {
    html {
        font-size: 16px;
    }
}

html {
    position: relative;
    min-height: 100%;
}

body {
    margin-bottom: 60px;
}

/* Custom
-------------------------------------------------- */

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
    height: 15rem;
    width: 15rem;
    object-fit: cover;
}

.card-image {
    height: 12.5rem;
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
