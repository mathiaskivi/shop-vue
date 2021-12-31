<template>
    <footer class="border-top footer text-muted">
        <div class="container">
            &copy; 2021 - {{ getTranslations().views.shared._Layout.brand }}
            <div class="dropdown float-right" v-if="getLanguages() !== null">
                <a class="nav-link dropdown-toggle text-dark p-0" href="#" data-toggle="dropdown">
                    {{ getTranslations().views.shared._LanguagePartial.language }}
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item text-dark" href="#" v-for="language in getLanguages()" v-bind:key="language" v-on:click.prevent="setLanguage(language.name, language.nativeName)">{{ language.nativeName }}</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import { ILanguage } from '@/domain/internationalization/ILanguage';
import { ITranslations } from '@/domain/internationalization/ITranslations';
import { Vue } from 'vue-class-component';
import store from '@/store/Index';

export default class Footer extends Vue {
    async setLanguage(name: string, nativeName: string): Promise<void> {
        const language = {
            name,
            nativeName
        }

        await store.dispatch('setLanguage', language);
    }

    getLanguages(): ILanguage[] | null {
        return store.state.languages;
    }

    getTranslations(): ITranslations | null {
        return store.state.translations;
    }
}
</script>
