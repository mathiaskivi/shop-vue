<template>
    <div class="row" v-if="getTranslations() !== null">
        <div class="col-md-3"></div>
        <div class="col-md-6">
            <h1>{{ getTranslations().areas.identity.pages.account.login.logIn }}</h1>
            <h4>{{ getTranslations().areas.identity.pages.account.login.useLocalAccount }}</h4>
            <hr />
            <Alert v-bind:class-name="className" v-bind:message="message" />
            <div class="form-group">
                <label>{{ getTranslations().areas.identity.pages.account.login.email }}</label>
                <input class="form-control" type="email" v-model="loginRequest.email" />
            </div>
            <div class="form-group">
                <label>{{ getTranslations().areas.identity.pages.account.login.password }}</label>
                <input class="form-control" type="password" v-model="loginRequest.password" />
            </div>
            <div class="form-group">
                <input type="submit" v-bind:value="getTranslations().areas.identity.pages.account.login.logIn" class="btn btn-primary" v-on:click="login()" />
            </div>
            <div class="form-group">
                <p>
                    <router-link v-bind:to="'/Identity/Account/Register'">{{ getTranslations().areas.identity.pages.account.login.registerNewUser }}</router-link>
                </p>
            </div>
        </div>
        <div class="col-md-3"></div>
    </div>
</template>

<script lang="ts">
import { IdentityService } from '@/services/IdentityService';
import { ILoginRequest } from '@/types/ILoginRequest';
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
    loginRequest: ILoginRequest = {
        email: '',
        password: ''
    }

    className = '';
    message = '';

    async login(): Promise<void> {
        if (this.loginRequest.email === '') {
            this.className = 'alert-danger';
            this.message = this.getTranslations()!.common.errorMessage_Required.replace('{0}', this.getTranslations()!.areas.identity.pages.account.login.email);

            return;
        } else if (this.loginRequest.password === '') {
            this.className = 'alert-danger';
            this.message = this.getTranslations()!.common.errorMessage_Required.replace('{0}', this.getTranslations()!.areas.identity.pages.account.login.password);

            return;
        } else {
            this.className = 'alert-info';
            this.message = this.getTranslations()!.areas.identity.pages.account.login.loading + '...';
        }

        const loginResponse = await IdentityService.Login('/Identity/Login', this.loginRequest);

        if (loginResponse.ok && loginResponse.data !== undefined) {
            this.className = 'alert-success';
            this.message = this.getTranslations()!.areas.identity.pages.account.login.success;

            await store.commit('login', loginResponse.data);
            await this.$router.push('/');
        } else {
            this.className = 'alert-danger';
            this.message = loginResponse.messages![0];
        }
    }

    getTranslations(): ITranslations | null {
        return store.state.translations;
    }
}
</script>
