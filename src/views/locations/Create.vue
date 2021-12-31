<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller')">
        <h1>{{ getTranslations().views.locations.create.title }}</h1>

        <h4>{{ getTranslations().views.locations.create.location }}</h4>
        <hr/>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.locations.create.provider }}</label>
                    <select class="form-control valid" v-model="location.providerId">
                        <option v-for="provider in providers" v-bind:key="provider" v-bind:value="provider.id">{{ provider.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.locations.create.name }}</label>
                    <input v-model="location.name" class="form-control" type="text"/>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.locations.create.address }}</label>
                    <input v-model="location.address" class="form-control" type="text"/>
                </div>
                <div class="form-group">
                    <input type="submit" v-bind:value="getTranslations().views.locations.create.title" class="btn btn-primary" v-on:click="create()"/>
                </div>
            </div>
        </div>

        <div>
            <router-link v-bind:to="'/Locations'">{{ getTranslations().views.locations.create.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { ILocation } from '@/domain/ILocation';
import { IProvider } from '@/domain/IProvider';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class LocationsCreate extends Vue {
    location: ILocation = {
        id: '00000000-0000-0000-0000-000000000000',
        providerId: '00000000-0000-0000-0000-000000000000',
        nameId: '00000000-0000-0000-0000-000000000000',
        name: '',
        addressId: '00000000-0000-0000-0000-000000000000',
        address: ''
    };

    providers: IProvider[] | null = null;

    async create(): Promise<void> {
        if (this.location.providerId === '00000000-0000-0000-0000-000000000000') {
            return;
        }

        // Exclude optional fields from this.location
        const { provider, ...location } = this.location;

        const locationHTTPResponse = await BaseService.post<ILocation>('/Locations', location, store.state);

        if (locationHTTPResponse.ok) {
            await this.$router.push('/Locations');
        }
    }

    async mounted(): Promise<void> {
        const providerHTTPResponse = await BaseService.getAll<IProvider>('/Providers', store.state);

        if (providerHTTPResponse.ok && providerHTTPResponse.data !== undefined) {
            this.providers = providerHTTPResponse.data;
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
