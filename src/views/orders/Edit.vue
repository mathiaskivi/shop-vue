<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller') && order !== null">
        <h1>{{ getTranslations().views.orders.edit.title }}</h1>

        <h4>{{ getTranslations().views.orders.edit.order }}</h4>
        <hr/>
        <div class="row">
            <div class="col-md-4">
                <template v-if="getRoles() !== null && getRoles().includes('Admin')">
                    <div class="form-group">
                        <label class="control-label">{{ getTranslations().views.orders.edit.appUser }}</label>
                        <select class="form-control valid" v-model="order.appUserId">
                            <option v-for="appUser in appUsers" v-bind:key="appUser" v-bind:value="appUser.id">{{ appUser.id }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label">{{ getTranslations().views.orders.edit.location }}</label>
                        <select class="form-control valid" v-model="order.locationId">
                            <option v-for="location in locations" v-bind:key="location" v-bind:value="location.id">{{ location.name }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label">{{ getTranslations().views.orders.edit.status }}</label>
                        <select class="form-control valid" v-model="order.statusId">
                            <option v-for="status in statuses" v-bind:key="status" v-bind:value="status.id">{{ status.name }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label">{{ getTranslations().views.orders.edit.dateTime }}</label>
                        <input v-model="order.dateTime" class="form-control" type="datetime-local"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label">{{ getTranslations().views.orders.edit.total }}</label>
                        <input v-model="order.total" class="form-control" type="number"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label">{{ getTranslations().views.orders.edit.tracking }}</label>
                        <input v-model="order.tracking" class="form-control" type="text"/>
                    </div>
                    <div class="form-group">
                        <input type="submit" v-bind:value="getTranslations().views.orders.edit.save" class="btn btn-primary" v-on:click="edit()"/>
                    </div>
                </template>
                <template v-else-if="getRoles() !== null && getRoles().includes('Seller')">
                    <div class="form-group">
                        <label class="control-label">{{ getTranslations().views.orders.edit.status }}</label>
                        <select class="form-control valid" v-model="order.statusId">
                            <option v-for="status in statuses" v-bind:key="status" v-bind:value="status.id">{{ status.name }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label">{{ getTranslations().views.orders.edit.tracking }}</label>
                        <input v-model="order.tracking" class="form-control" type="text"/>
                    </div>
                    <div class="form-group">
                        <input type="submit" v-bind:value="getTranslations().views.orders.edit.save" class="btn btn-primary" v-on:click="edit()"/>
                    </div>
                </template>
            </div>
        </div>

        <div>
            <router-link v-bind:to="'/Orders'">{{ getTranslations().views.orders.edit.backToList }}</router-link>
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

export default class OrdersEdit extends Vue {
    order: IOrder | null = null;

    appUsers: IAppUser[] | null = null;
    locations: ILocation[] | null = null;
    statuses: IStatus[] | null = null;

    async edit(): Promise<void> {
        if (this.order === null) {
            return;
        }

        if (this.order.appUserId === '00000000-0000-0000-0000-000000000000' ||
            this.order.locationId === '00000000-0000-0000-0000-000000000000' ||
            this.order.statusId === '00000000-0000-0000-0000-000000000000') {
            return;
        }

        // Exclude optional fields from this.order
        const { appUser, location, status, orderProducts, transactions, ...order } = this.order;

        const orderHTTPResponse = await BaseService.put<IOrder>('/Orders/' + this.$route.params.id as string, order, store.state);

        if (orderHTTPResponse.ok) {
            await this.$router.push('/Orders');
        }
    }

    async mounted(): Promise<void> {
        const orderHTTPResponse = await BaseService.get<IOrder>('/Orders/' + this.$route.params.id as string, store.state);
        const appUserHTTPResponse = await BaseService.getAll<IAppUser>('/Identity/AppUsers', store.state);
        const locationHTTPResponse = await BaseService.getAll<ILocation>('/Locations', store.state);
        const statusHTTPResponse = await BaseService.getAll<IStatus>('/Statuses', store.state);

        if (orderHTTPResponse.ok && orderHTTPResponse.data !== undefined) {
            this.order = orderHTTPResponse.data;
        }

        if (appUserHTTPResponse.ok && appUserHTTPResponse.data !== undefined) {
            this.appUsers = appUserHTTPResponse.data;
        }

        if (locationHTTPResponse.ok && locationHTTPResponse.data !== undefined) {
            this.locations = locationHTTPResponse.data;
        }

        if (statusHTTPResponse.ok && statusHTTPResponse.data !== undefined) {
            this.statuses = statusHTTPResponse.data;
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
