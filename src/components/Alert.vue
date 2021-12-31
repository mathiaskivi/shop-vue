<template>
    <template v-if="className !== '' && message !== ''">
        <div v-bind:class="'alert ' + className" role="alert">{{ message }}</div>
    </template>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        className: String,
        message: String,
    }
})

export default class Alert extends Vue {
    className!: string;
    message!: string;
}
</script>
