<template>
    <h1>{{ getTranslations().views.statuses.index.title }}</h1>

    <template v-if="getRoles() != null && getRoles().includes('Seller')">
        <p>
            <router-link v-bind:to="'/Statuses/Create'">{{ getTranslations().views.statuses.index.create }}</router-link>
        </p>
    </template>
    <table class="table">
        <thead>
        <tr>
            <th>
                {{ getTranslations().views.statuses.index.name }}
            </th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="status in statuses" v-bind:key="status">
            <td>
                {{ status.name }}
            </td>
            <td>
                <template v-if="getRoles() != null && getRoles().includes('Seller')">
                    <router-link v-bind:to="'/Statuses/Edit/' + status.id">{{ getTranslations().views.statuses.index.edit }}</router-link> |
                </template>
                <router-link v-bind:to="'/Statuses/Details/' + status.id">{{ getTranslations().views.statuses.index.details }}</router-link>
                <template v-if="getRoles() != null && getRoles().includes('Seller')">
                    | <router-link v-bind:to="'/Statuses/Delete/' + status.id">{{ getTranslations().views.statuses.index.delete }}</router-link>
                </template>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { IStatus } from '@/domain/IStatus';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class StatusesIndex extends Vue {
    statuses: IStatus[] | null = null;

    async mounted(): Promise<void> {
        const statusHTTPResponse = await BaseService.getAll<IStatus>('/Statuses', store.state);

        if (statusHTTPResponse.ok && statusHTTPResponse.data !== undefined) {
            this.statuses = statusHTTPResponse.data;
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
