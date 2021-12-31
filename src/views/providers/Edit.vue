<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller') && provider !== null">
        <h1>{{ getTranslations().views.providers.edit.title }}</h1>

        <h4>{{ getTranslations().views.providers.edit.provider }}</h4>
        <hr/>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.providers.edit.name }}</label>
                    <input class="form-control" type="text" v-model="provider.name"/>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.providers.edit.price }}</label>
                    <input class="form-control" type="number" v-model="provider.price"/>
                </div>
                <div class="form-group">
                    <input type="submit" v-bind:value="getTranslations().views.providers.edit.save" class="btn btn-primary" v-on:click="edit()"/>
                </div>
            </div>
        </div>

        <div>
            <router-link v-bind:to="'/Providers'">{{ getTranslations().views.providers.edit.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { IProvider } from '@/domain/IProvider';
import { BaseService } from '@/services/BaseService';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class ProvidersEdit extends Vue {
    provider: IProvider | null = null;

    async edit(): Promise<void> {
        if (this.provider === null) {
            return;
        }

        const providerHTTPResponse = await BaseService.put<IProvider>('/Providers/' + this.$route.params.id as string, this.provider, store.state);

        if (providerHTTPResponse.ok) {
            await this.$router.push('/Providers');
        }
    }

    async mounted(): Promise<void> {
        const providerHTTPResponse = await BaseService.get<IProvider>('/Providers/' + this.$route.params.id as string, store.state);

        if (providerHTTPResponse.ok && providerHTTPResponse.data !== undefined) {
            this.provider = providerHTTPResponse.data;
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
