<template>
    <h1>{{ getTranslations().views.providers.index.title }}</h1>

    <template v-if="getRoles() != null && getRoles().includes('Seller')">
        <p>
            <router-link v-bind:to="'/Providers/Create'">{{ getTranslations().views.providers.index.create }}</router-link>
        </p>
    </template>
    <table class="table">
        <thead>
        <tr>
            <th>
                {{ getTranslations().views.providers.index.name }}
            </th>
            <th>
                {{ getTranslations().views.providers.index.price }}
            </th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="provider in providers" v-bind:key="provider">
            <td>
                {{ provider.name }}
            </td>
            <td>
                {{ provider.price }}
            </td>
            <td>
                <template v-if="getRoles() != null && getRoles().includes('Seller')">
                    <router-link v-bind:to="'/Providers/Edit/' + provider.id">{{ getTranslations().views.providers.index.edit }}</router-link> |
                </template>
                <router-link v-bind:to="'/Providers/Details/' + provider.id">{{ getTranslations().views.providers.index.details }}</router-link>
                <template v-if="getRoles() != null && getRoles().includes('Seller')">
                    | <router-link v-bind:to="'/Providers/Delete/' + provider.id">{{ getTranslations().views.providers.index.delete }}</router-link>
                </template>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { IProvider } from '@/domain/IProvider';
import { BaseService } from '@/services/BaseService';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class ProvidersIndex extends Vue {
    providers: IProvider[] | null = null;

    async mounted(): Promise<void> {
        const providerHTTPResponse = await BaseService.getAll<IProvider>('/Providers', store.state);

        if (providerHTTPResponse.ok && providerHTTPResponse.data !== undefined) {
            this.providers = providerHTTPResponse.data;
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
