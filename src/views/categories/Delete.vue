<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller') && category !== null">
        <h1>{{ getTranslations().views.categories.delete.title }}</h1>
        <h3>{{ getTranslations().views.categories.delete.areYouSure }}</h3>

        <div>
            <h4>{{ getTranslations().views.categories.delete.category }}</h4>
            <hr/>
            <dl class="row">
                <dt class="col-sm-2">
                    {{ getTranslations().views.categories.delete.name }}
                </dt>
                <dd class="col-sm-10">
                    {{ category.name }}
                </dd>
            </dl>
        </div>
        <div>
            <input type="submit" v-bind:value="getTranslations().views.categories.delete.title" class="btn btn-danger" v-on:click="this.delete()"/> |
            <router-link v-bind:to="'/Categories'">{{ getTranslations().views.categories.delete.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { ICategory } from '@/domain/ICategory';
import { BaseService } from '@/services/BaseService';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class CategoriesDelete extends Vue {
    category: ICategory | null = null;

    async delete(): Promise<void> {
        const categoryHTTPResponse = await BaseService.delete<ICategory>('/Categories/' + this.$route.params.id as string, store.state);

        if (categoryHTTPResponse.ok) {
            await this.$router.push('/Categories');
        }
    }

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
