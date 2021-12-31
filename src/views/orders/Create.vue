<template>
    <div v-if="getRoles() !== null && getRoles().includes('Admin')">
        <h1>{{ getTranslations().views.orders.create.title }}</h1>

        <h4>{{ getTranslations().views.orders.create.order }}</h4>
        <hr/>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.orders.create.appUser }}</label>
                    <select class="form-control valid" v-model="order.appUserId">
                        <option v-for="appUser in appUsers" v-bind:key="appUser" v-bind:value="appUser.id">{{ appUser.id }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.orders.create.location }}</label>
                    <select class="form-control valid" v-model="order.locationId">
                        <option v-for="location in locations" v-bind:key="location" v-bind:value="location.id">{{ location.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">Status</label>
                    <select class="form-control valid" v-model="order.statusId">
                        <option v-for="status in statuses" v-bind:key="status" v-bind:value="status.id">{{ status.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.orders.create.dateTime }}</label>
                    <input v-model="order.dateTime" class="form-control" type="datetime-local"/>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.orders.create.total }}</label>
                    <input v-model="order.total" class="form-control" type="number"/>
                </div>
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.orders.create.tracking }}</label>
                    <input v-model="order.tracking" class="form-control" type="text"/>
                </div>
                <div class="form-group">
                    <input type="submit" v-bind:value="getTranslations().views.orders.create.title" class="btn btn-primary" v-on:click="create()"/>
                </div>
            </div>
        </div>

        <div>
            <router-link v-bind:to="'/Orders'">{{ getTranslations().views.orders.create.backToList }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { IAppUser } from '@/domain/identity/IAppUser';
import { ILocation } from '@/domain/ILocation';
import { IOrder } from '@/domain/IOrder';
import { IStatus } from '@/domain/IStatus';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class OrdersCreate extends Vue {
    order: IOrder = {
        id: '00000000-0000-0000-0000-000000000000',
        appUserId: '00000000-0000-0000-0000-000000000000',
        locationId: '00000000-0000-0000-0000-000000000000',
        statusId: '00000000-0000-0000-0000-000000000000',
        dateTime: '',
        total: 0.00
    };

    appUsers: IAppUser[] | null = null;
    locations: ILocation[] | null = null;
    statuses: IStatus[] | null = null;

    async create(): Promise<void> {
        if (this.order.appUserId === '00000000-0000-0000-0000-000000000000' ||
            this.order.locationId === '00000000-0000-0000-0000-000000000000' ||
            this.order.statusId === '00000000-0000-0000-0000-000000000000') {
            return;
        }

        // Exclude optional fields from this.order
        const { appUser, location, status, orderProducts, transactions, ...order } = this.order;

        const orderHTTPResponse = await BaseService.post<IOrder>('/Orders', order, store.state);

        if (orderHTTPResponse.ok) {
            await this.$router.push('/Orders');
        }
    }

    async mounted(): Promise<void> {
        const appUserHTTPResponse = await BaseService.getAll<IAppUser>('/Identity/AppUsers', store.state);
        const locationHTTPResponse = await BaseService.getAll<ILocation>('/Locations', store.state);
        const statusHTTPResponse = await BaseService.getAll<IStatus>('/Statuses', store.state);

        if (appUserHTTPResponse.ok) {
            this.appUsers = appUserHTTPResponse.data!;
        }

        if (locationHTTPResponse.ok) {
            this.locations = locationHTTPResponse.data!;
        }

        if (statusHTTPResponse.ok) {
            this.statuses = statusHTTPResponse.data!;
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
