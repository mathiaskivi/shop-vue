<template>
    <div class="row" v-if="getTranslations() !== null">
        <div class="col-md-3"></div>
        <div class="col-md-6">
            <h1>{{ getTranslations().areas.identity.pages.account.register.pageTitle }}</h1>
            <h4>{{ getTranslations().areas.identity.pages.account.register.createNewAccount }}</h4>
            <hr />
            <Alert v-bind:class-name="className" v-bind:message="message" />
            <div class="form-group">
                <label>{{ getTranslations().areas.identity.pages.account.register.firstName }}</label>
                <input class="form-control" type="text" v-model="registerRequest.firstName" />
            </div>
            <div class="form-group">
                <label>{{ getTranslations().areas.identity.pages.account.register.lastName }}</label>
                <input class="form-control" type="text" v-model="registerRequest.lastName" />
            </div>
            <div class="form-group">
                <label>{{ getTranslations().areas.identity.pages.account.register.email }}</label>
                <input class="form-control" type="email" v-model="registerRequest.email" />
            </div>
            <div class="form-group">
                <label>{{ getTranslations().areas.identity.pages.account.register.phoneNumber }}</label>
                <input class="form-control" type="text" v-model="registerRequest.phoneNumber" />
            </div>
            <div class="form-group">
                <label>{{ getTranslations().areas.identity.pages.account.register.password }}</label>
                <input class="form-control" type="password" v-model="registerRequest.password" />
            </div>
            <div class="form-group">
                <input type="submit" v-bind:value="getTranslations().areas.identity.pages.account.register.buttonRegister" class="btn btn-primary" v-on:click="register()" />
            </div>
        </div>
        <div class="col-md-3"></div>
    </div>
</template>

<script lang="ts">
import { IdentityService } from '@/services/IdentityService';
import { IRegisterRequest } from '@/types/IRegisterRequest';
import { ITranslations } from '@/domain/internationalization/ITranslations';
import { Options, Vue } from 'vue-class-component';
import Alert from '@/components/Alert.vue';
import store from '@/store/Index';

@Options({
    components: {
        Alert
    }
})

export default class Index extends Vue {
    registerRequest: IRegisterRequest = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: ''
    }

    className = '';
    message = '';

    async register(): Promise<void> {
        if (this.registerRequest.firstName === '') {
            this.className = 'alert-danger';
            this.message = this.getTranslations()!.common.errorMessage_Required.replace('{0}', this.getTranslations()!.areas.identity.pages.account.register.firstName);

            return;
        } else if (this.registerRequest.lastName === '') {
            this.className = 'alert-danger';
            this.message = this.getTranslations()!.common.errorMessage_Required.replace('{0}', this.getTranslations()!.areas.identity.pages.account.register.lastName);

            return;
        } else if (this.registerRequest.email === '') {
            this.className = 'alert-danger';
            this.message = this.getTranslations()!.common.errorMessage_Required.replace('{0}', this.getTranslations()!.areas.identity.pages.account.register.email);

            return;
        } else if (this.registerRequest.phoneNumber === '') {
            this.className = 'alert-danger';
            this.message = this.getTranslations()!.common.errorMessage_Required.replace('{0}', this.getTranslations()!.areas.identity.pages.account.register.phoneNumber);

            return;
        } else if (this.registerRequest.password === '') {
            this.className = 'alert-danger';
            this.message = this.getTranslations()!.common.errorMessage_Required.replace('{0}', this.getTranslations()!.areas.identity.pages.account.register.password);

            return;
        } else {
            this.className = 'alert-info';
            this.message = this.getTranslations()!.areas.identity.pages.account.register.loading + '...';
        }

        const registerResponse = await IdentityService.Register('/Identity/Register', this.registerRequest);

        if (registerResponse.ok && registerResponse.data !== undefined) {
            this.className = 'alert-success';
            this.message = this.getTranslations()!.areas.identity.pages.account.register.success;

            await store.commit('register', registerResponse.data);
            await this.$router.push('/');
        } else {
            this.className = 'alert-danger';
            this.message = registerResponse.messages![0];
        }
    }

    getTranslations(): ITranslations | null {
        return store.state.translations;
    }
}
</script>
