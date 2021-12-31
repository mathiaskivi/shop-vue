<template>
    <div v-if="provider !== null">
        <h1>{{ getTranslations().views.providers.details.title }}</h1>

        <div>
            <h4>{{ getTranslations().views.providers.details.provider }}</h4>
            <hr/>
            <dl class="row">
                <dt class="col-sm-2">
                    {{ getTranslations().views.providers.details.name }}
                </dt>
                <dd class="col-sm-10">
                    {{ provider.name }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.providers.details.price }}
                </dt>
                <dd class="col-sm-10">
                    {{ provider.price }}
                </dd>
            </dl>
        </div>

        <div>
            <template v-if="getRoles() != null && getRoles().includes('Seller')">
                <router-link v-bind:to="'/Providers/Edit/' + provider.id">{{ getTranslations().views.providers.details.edit }}</router-link> |
            </template>
            <router-link v-bind:to="'/Providers'">{{ getTranslations().views.providers.details.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { IProvider } from '@/domain/IProvider';
import { BaseService } from '@/services/BaseService';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class ProvidersDetails extends Vue {
    provider: IProvider | null = null;

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
