<template>
    <div v-if="category !== null">
        <h1>{{ getTranslations().views.categories.details.title }}</h1>

        <div>
            <h4>{{ getTranslations().views.categories.details.category }}</h4>
            <hr/>
            <dl class="row">
                <dt class="col-sm-2">
                    {{ getTranslations().views.categories.details.name }}
                </dt>
                <dd class="col-sm-10">
                    {{ category.name }}
                </dd>
            </dl>
        </div>

        <div>
            <template v-if="getRoles() != null && getRoles().includes('Seller')">
                <router-link v-bind:to="'/Categories/Edit/' + category.id">{{ getTranslations().views.categories.details.edit }}</router-link> |
            </template>
            <router-link v-bind:to="'/Categories'">{{ getTranslations().views.categories.details.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { ICategory } from '@/domain/ICategory';
import { BaseService } from '@/services/BaseService';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class CategoriesDetails extends Vue {
    category: ICategory | null = null;

    async mounted(): Promise<void> {
        const categoryHTTPResponse = await BaseService.get<ICategory>('/Categories/' + this.$route.params.id as string, store.state);

        if (categoryHTTPResponse.ok) {
            this.category = categoryHTTPResponse.data!;
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
