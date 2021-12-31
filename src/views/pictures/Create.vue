<template>
    <div v-if="getRoles() !== null && getRoles().includes('Seller')">
        <h1>{{ getTranslations().views.pictures.create.title }}</h1>

        <h4>{{ getTranslations().views.pictures.create.picture }}</h4>
        <hr/>
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="control-label">{{ getTranslations().views.pictures.create.path }}</label>
                    <input v-model="picture.path" class="form-control" type="text"/>
                </div>
                <div class="form-group">
                    <input type="submit" v-bind:value="getTranslations().views.pictures.create.title" class="btn btn-primary" v-on:click="create()"/>
                </div>
            </div>
        </div>

        <div>
            <router-link v-bind:to="'/Products/Edit/' + picture.productId">{{ getTranslations().views.pictures.create.cancel }}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import store from '@/store/Index';
import { BaseService } from '@/services/BaseService';
import { IPicture } from '@/domain/IPicture';
import { ITranslations } from '@/domain/internationalization/ITranslations';

export default class PicturesCreate extends Vue {
    picture: IPicture = {
        id: '00000000-0000-0000-0000-000000000000',
        productId: '00000000-0000-0000-0000-000000000000',
        path: ''
    };

    async create(): Promise<void> {
        if (this.picture.productId === '00000000-0000-0000-0000-000000000000') {
            return;
        }

        const pictureHTTPResponse = await BaseService.post<IPicture>('/Pictures', this.picture, store.state);

        if (pictureHTTPResponse.ok) {
            await this.$router.push('/Products/Edit/' + this.picture.productId);
        }
    }

    async mounted(): Promise<void> {
        this.picture.productId = this.$route.params.id as string;
    }

    getRoles(): string[] | null {
        return store.state.roles;
    }

    getTranslations(): ITranslations | null {
        return store.state.translations;
    }
}
</script>
