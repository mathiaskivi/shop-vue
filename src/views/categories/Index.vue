<template>
    <h1>{{ getTranslations().views.categories.index.title }}</h1>

    <template v-if="getRoles() != null && getRoles().includes('Seller')">
        <p>
            <router-link v-bind:to="'/Categories/Create'">{{ getTranslations().views.categories.index.create }}</router-link>
        </p>
    </template>
    <table class="table">
        <thead>
        <tr>
            <th>
                {{ getTranslations().views.categories.index.name }}
            </th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="category in categories" v-bind:key="category">
            <td>
                {{ category.name }}
            </td>
            <td>
                <template v-if="getRoles() != null && getRoles().includes('Seller')">
                    <router-link v-bind:to="'/Categories/Edit/' + category.id">{{ getTranslations().views.categories.index.edit }}</router-link> |
                </template>
                <router-link v-bind:to="'/Categories/Details/' + category.id">{{ getTranslations().views.categories.index.details }}</router-link>
                <template v-if="getRoles() != null && getRoles().includes('Seller')">
                    | <router-link v-bind:to="'/Categories/Delete/' + category.id">{{ getTranslations().views.categories.index.delete }}</router-link>
                </template>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { ICategory } from '@/domain/ICategory';
import { BaseService } from '@/services/BaseService';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class CategoriesIndex extends Vue {
    categories: ICategory[] | null = null;

    async mounted(): Promise<void> {
        const categoryHTTPResponse = await BaseService.getAll<ICategory>('/Categories', store.state);

        if (categoryHTTPResponse.ok) {
            this.categories = categoryHTTPResponse.data!;
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
