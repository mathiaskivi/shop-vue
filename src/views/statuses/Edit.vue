<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller') && status !== null">
        <h1>{{ getTranslations().views.statuses.edit.title }}</h1>

        <h4>{{ getTranslations().views.statuses.edit.status }}</h4>
        <hr/>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.statuses.edit.name }}</label>
                    <input class="form-control" type="text" v-model="status.name"/>
                </div>
                <div class="form-group">
                    <input type="submit" v-bind:value="getTranslations().views.statuses.edit.save" class="btn btn-primary" v-on:click="edit()"/>
                </div>
            </div>
        </div>

        <div>
            <router-link v-bind:to="'/Statuses'">{{ getTranslations().views.statuses.edit.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { IStatus } from '@/domain/IStatus';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class StatusesEdit extends Vue {
    status: IStatus | null = null;

    async edit(): Promise<void> {
        if (this.status === null) {
            return;
        }

        const statusHTTPResponse = await BaseService.put<IStatus>('/Statuses/' + this.$route.params.id as string, this.status, store.state);

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
