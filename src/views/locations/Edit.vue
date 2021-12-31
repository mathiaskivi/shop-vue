<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller') && location !== null">
        <h1>{{ getTranslations().views.locations.edit.title }}</h1>

        <h4>{{ getTranslations().views.locations.edit.location }}</h4>
        <hr/>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.locations.edit.provider }}</label>
                    <select class="form-control valid" v-model="location.providerId">
                        <option v-for="provider in providers" v-bind:key="provider" v-bind:value="provider.id">{{ provider.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.locations.edit.name }}</label>
                    <input class="form-control" type="text" v-model="location.name"/>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.locations.edit.address }}</label>
                    <input class="form-control" type="text" v-model="location.address"/>
                </div>
                <div class="form-group">
                    <input type="submit" v-bind:value="getTranslations().views.locations.edit.save" class="btn btn-primary" v-on:click="edit()"/>
                </div>
            </div>
        </div>

        <div>
            <router-link v-bind:to="'/Locations'">{{ getTranslations().views.locations.edit.backToList }}</router-link>
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

export default class LocationsEdit extends Vue {
    location: ILocation | null = null;

    providers: IProvider[] | null = null;

    async edit(): Promise<void> {
        if (this.location === null) {
            return;
        }

        // Exclude optional fields from this.location
        const { provider, ...location } = this.location;

        const locationHTTPResponse = await BaseService.put<ILocation>('/Locations/' + this.$route.params.id as string, location, store.state);

        if (locationHTTPResponse.ok) {
            await this.$router.push('/Locations');
        }
    }

    async mounted(): Promise<void> {
        const locationHTTPResponse = await BaseService.get<ILocation>('/Locations/' + this.$route.params.id as string, store.state);
        const providerHTTPResponse = await BaseService.getAll<IProvider>('/Providers', store.state);

        if (locationHTTPResponse.ok) {
            this.location = locationHTTPResponse.data!;
        }

        if (providerHTTPResponse.ok) {
            this.providers = providerHTTPResponse.data!;
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
