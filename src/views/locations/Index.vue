<template>
    <h1>{{ getTranslations().views.locations.index.title }}</h1>

    <template v-if="getRoles() != null && getRoles().includes('Seller')">
        <p>
            <router-link v-bind:to="'/Locations/Create'">{{ getTranslations().views.locations.index.create }}</router-link>
        </p>
    </template>
    <table class="table">
        <thead>
        <tr>
            <th>
                {{ getTranslations().views.locations.index.provider }}
            </th>
            <th>
                {{ getTranslations().views.locations.index.name }}
            </th>
            <th>
                {{ getTranslations().views.locations.index.address }}
            </th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="location in locations" v-bind:key="location">
            <td>
                {{ location.provider.name }}
            </td>
            <td>
                {{ location.name }}
            </td>
            <td>
                {{ location.address }}
            </td>
            <td>
                <template v-if="getRoles() != null && getRoles().includes('Seller')">
                    <router-link v-bind:to="'/Locations/Edit/' + location.id">{{ getTranslations().views.locations.index.edit }}</router-link> |
                </template>
                <router-link v-bind:to="'/Locations/Details/' + location.id">{{ getTranslations().views.locations.index.details }}</router-link>
                <template v-if="getRoles() != null && getRoles().includes('Seller')">
                    | <router-link v-bind:to="'/Locations/Delete/' + location.id">{{ getTranslations().views.locations.index.delete }}</router-link>
                </template>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { ILocation } from '@/domain/ILocation';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class LocationsIndex extends Vue {
    locations: ILocation[] | null = null;

    async mounted(): Promise<void> {
        const locationHTTPResponse = await BaseService.getAll<ILocation>('/Locations', store.state);

        if (locationHTTPResponse.ok) {
            this.locations = locationHTTPResponse.data!;
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
