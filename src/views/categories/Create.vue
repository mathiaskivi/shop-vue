<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller')">
        <h1>{{ getTranslations().views.categories.create.title }}</h1>

        <h4>{{ getTranslations().views.categories.create.category }}</h4>
        <hr/>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.categories.create.name }}</label>
                    <input v-model="category.name" class="form-control" type="text"/>
                </div>
                <div class="form-group">
                    <input type="submit" v-bind:value="getTranslations().views.categories.create.title" class="btn btn-primary" v-on:click="create()"/>
                </div>
            </div>
        </div>

        <div>
            <router-link v-bind:to="'/Categories'">{{ getTranslations().views.categories.create.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { ICategory } from '@/domain/ICategory';
import { BaseService } from '@/services/BaseService';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class CategoriesCreate extends Vue {
    category: ICategory = {
        id: '00000000-0000-0000-0000-000000000000',
        nameId: '00000000-0000-0000-0000-000000000000',
        name: ''
    };

    async create(): Promise<void> {
        const categoryHTTPResponse = await BaseService.post<ICategory>('/Categories', this.category, store.state);

        if (categoryHTTPResponse.ok) {
            await this.$router.push('/Categories');
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
