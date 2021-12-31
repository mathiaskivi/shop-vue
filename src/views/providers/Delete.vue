<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller') && provider !== null">
        <h1>{{ getTranslations().views.providers.delete.title }}</h1>
        <h3>{{ getTranslations().views.providers.delete.areYouSure }}</h3>

        <div>
            <h4>{{ getTranslations().views.providers.delete.provider }}</h4>
            <hr/>
            <dl class="row">
                <dt class="col-sm-2">
                    {{ getTranslations().views.providers.delete.name }}
                </dt>
                <dd class="col-sm-10">
                    {{ provider.name }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.providers.delete.price }}
                </dt>
                <dd class="col-sm-10">
                    {{ provider.price }}
                </dd>
            </dl>
        </div>
        <div>
            <input type="submit" v-bind:value="getTranslations().views.providers.delete.title" class="btn btn-danger" v-on:click="this.delete()"/> |
            <router-link v-bind:to="'/Providers'">{{ getTranslations().views.providers.delete.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { IProvider } from '@/domain/IProvider';
import { BaseService } from '@/services/BaseService';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class ProvidersDelete extends Vue {
    provider: IProvider | null = null;

    async delete(): Promise<void> {
        const providerHTTPResponse = await BaseService.delete<IProvider>('/Providers/' + this.$route.params.id as string, store.state);

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
