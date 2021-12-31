<template>
    <div v-if="location !== null">
        <h1>{{ getTranslations().views.locations.details.title }}</h1>

        <div>
            <h4>{{ getTranslations().views.locations.details.location }}</h4>
            <hr/>
            <dl class="row">
                <dt class="col-sm-2">
                    {{ getTranslations().views.locations.details.provider }}
                </dt>
                <dd class="col-sm-10">
                    {{ location.provider.name }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.locations.details.name }}
                </dt>
                <dd class="col-sm-10">
                    {{ location.name }}
                </dd>
                <dt class="col-sm-2">
                    {{ getTranslations().views.locations.details.address }}
                </dt>
                <dd class="col-sm-10">
                    {{ location.address }}
                </dd>
            </dl>
        </div>

        <div>
            <template v-if="getRoles() != null && getRoles().includes('Seller')">
                <router-link v-bind:to="'/Locations/Edit/' + location.id">{{ getTranslations().views.locations.details.edit }}</router-link> |
            </template>
            <router-link v-bind:to="'/Locations'">{{ getTranslations().views.locations.details.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { ILocation } from '@/domain/ILocation';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class LocationsDetails extends Vue {
    location: ILocation | null = null;

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
