<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller')">
        <h1>{{ getTranslations().views.statuses.create.title }}</h1>

        <h4>{{ getTranslations().views.statuses.create.status }}</h4>
        <hr/>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.statuses.create.name }}</label>
                    <input v-model="status.name" class="form-control" type="text"/>
                </div>
                <div class="form-group">
                    <input type="submit" v-bind:value="getTranslations().views.statuses.create.title" class="btn btn-primary" v-on:click="create()"/>
                </div>
            </div>
        </div>

        <div>
            <router-link v-bind:to="'/Statuses'">{{ getTranslations().views.statuses.create.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { IStatus } from '@/domain/IStatus';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class StatusesCreate extends Vue {
    status: IStatus = {
        id: '00000000-0000-0000-0000-000000000000',
        nameId: '00000000-0000-0000-0000-000000000000',
        name: ''
    };

    async create(): Promise<void> {
        const statusHTTPResponse = await BaseService.post<IStatus>('/Statuses', this.status, store.state);

        if (statusHTTPResponse.ok) {
            await this.$router.push('/Statuses');
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
