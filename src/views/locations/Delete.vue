<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller') && location !== null">
        <h1>{{ getTranslations().views.locations.delete.title }}</h1>
        <h3>{{ getTranslations().views.locations.delete.areYouSure }}</h3>

        <div>
            <h4>{{ getTranslations().views.locations.delete.location }}</h4>
            <hr/>
            <dl class="row">
                <dt class="col-sm-2">
                    {{ getTranslations().views.locations.delete.provider }}
                </dt>
                <dd class="col-sm-10">
                    {{ location.provider.name }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.locations.delete.name }}
                </dt>
                <dd class="col-sm-10">
                    {{ location.name }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.locations.delete.address }}
                </dt>
                <dd class="col-sm-10">
                    {{ location.address }}
                </dd>
            </dl>
        </div>
        <div>
            <input type="submit" v-bind:value="getTranslations().views.locations.delete.title" class="btn btn-danger" v-on:click="this.delete()"/> |
            <router-link v-bind:to="'/Locations'">{{ getTranslations().views.locations.delete.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { ILocation } from '@/domain/ILocation';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class LocationsDelete extends Vue {
    location: ILocation | null = null;

    async delete(): Promise<void> {
        const locationHTTPResponse = await BaseService.delete<ILocation>('/Locations/' + this.$route.params.id as string, store.state);

        if (locationHTTPResponse.ok) {
            await this.$router.push('/Locations');
        }
    }

    async mounted(): Promise<void> {
        const locationHTTPResponse = await BaseService.get<ILocation>('/Locations/' + this.$route.params.id as string, store.state);

        if (locationHTTPResponse.ok) {
            this.location = locationHTTPResponse.data!;
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
