<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller')">
        <h1>{{ getTranslations().views.providers.create.title }}</h1>

        <h4>{{ getTranslations().views.providers.create.provider }}</h4>
        <hr/>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.providers.create.name }}</label>
                    <input v-model="provider.name" class="form-control" type="text"/>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.providers.create.price }}</label>
                    <input v-model="provider.price" class="form-control" type="number"/>
                </div>
                <div class="form-group">
                    <input type="submit" v-bind:value="getTranslations().views.providers.create.title" class="btn btn-primary" v-on:click="create()"/>
                </div>
            </div>
        </div>

        <div>
            <router-link v-bind:to="'/Providers'">{{ getTranslations().views.providers.create.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { IProvider } from '@/domain/IProvider';
import { BaseService } from '@/services/BaseService';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class ProvidersCreate extends Vue {
    provider: IProvider = {
        id: '00000000-0000-0000-0000-000000000000',
        nameId: '00000000-0000-0000-0000-000000000000',
        name: '',
        price: 0.00
    };

    async create(): Promise<void> {
        const providerHTTPResponse = await BaseService.post<IProvider>('/Providers', this.provider, store.state);

        if (providerHTTPResponse.ok) {
            await this.$router.push('/Providers');
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
