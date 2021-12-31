<template>
    <div v-if="status !== null">
        <h1>{{ getTranslations().views.statuses.details.title }}</h1>

        <div>
            <h4>{{ getTranslations().views.statuses.details.status }}</h4>
            <hr/>
            <dl class="row">
                <dt class="col-sm-2">
                    {{ getTranslations().views.statuses.details.name }}
                </dt>
                <dd class="col-sm-10">
                    {{ status.name }}
                </dd>
            </dl>
        </div>

        <div>
            <template v-if="getRoles() != null && getRoles().includes('Seller')">
                <router-link v-bind:to="'/Statuses/Edit/' + status.id">{{ getTranslations().views.statuses.details.edit }}</router-link> |
            </template>
            <router-link v-bind:to="'/Statuses'">{{ getTranslations().views.statuses.details.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { IStatus } from '@/domain/IStatus';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class StatusesDetails extends Vue {
    status: IStatus | null = null;

    async mounted(): Promise<void> {
        const statusHTTPResponse = await BaseService.get<IStatus>('/Statuses/' + this.$route.params.id as string, store.state);

        if (statusHTTPResponse.ok && statusHTTPResponse.data !== undefined) {
            this.status = statusHTTPResponse.data;
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
