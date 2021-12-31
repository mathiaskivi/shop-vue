<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller') && status !== null">
        <h1>{{ getTranslations().views.statuses.delete.title }}</h1>
        <h3>{{ getTranslations().views.statuses.delete.areYouSure }}</h3>

        <div>
            <h4>{{ getTranslations().views.statuses.delete.status }}</h4>
            <hr/>
            <dl class="row">
                <dt class="col-sm-2">
                    {{ getTranslations().views.statuses.delete.name }}
                </dt>
                <dd class="col-sm-10">
                    {{ status.name }}
                </dd>
            </dl>
        </div>
        <div>
            <input type="submit" v-bind:value="getTranslations().views.statuses.delete.title" class="btn btn-danger" v-on:click="this.delete()"/> |
            <router-link v-bind:to="'/Statuses'">{{ getTranslations().views.statuses.delete.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { IStatus } from '@/domain/IStatus';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class StatusesDelete extends Vue {
    status: IStatus | null = null;

    async delete(): Promise<void> {
        const statusHTTPResponse = await BaseService.delete<IStatus>('/Statuses/' + this.$route.params.id as string, store.state);

        if (statusHTTPResponse.ok) {
            await this.$router.push('/Statuses');
        }
    }

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
