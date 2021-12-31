<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller') && category !== null">
        <h1>{{ getTranslations().views.categories.edit.title }}</h1>

        <h4>{{ getTranslations().views.categories.edit.category }}</h4>
        <hr/>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.categories.edit.name }}</label>
                    <input class="form-control" type="text" v-model="category.name"/>
                </div>
                <div class="form-group">
                    <input type="submit" v-bind:value="getTranslations().views.categories.edit.save" class="btn btn-primary" v-on:click="edit()"/>
                </div>
            </div>
        </div>

        <div>
            <router-link v-bind:to="'/Categories'">{{ getTranslations().views.categories.edit.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { ICategory } from '@/domain/ICategory';
import { BaseService } from '@/services/BaseService';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class CategoriesEdit extends Vue {
    category: ICategory | null = null;

    async edit(): Promise<void> {
        if (this.category === null) {
            return;
        }

        const categoryHTTPResponse = await BaseService.put<ICategory>('/Categories/' + this.$route.params.id as string, this.category, store.state);

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
