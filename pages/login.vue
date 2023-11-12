<template>
    <div xs12 sm8 md4 class="d-flex justify-center mb-6 mt-6">
        <v-card :class="[mdAndUp ? 'w-50' : 'w-100', 'elevation-12']">
            <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <form ref="form" @submit.prevent="login">
                    <v-text-field
                        v-model="username"
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="username"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="password"
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="password"
                        required
                    ></v-text-field>
                    <v-btn type="submit" class="mt-4" color="primary" value="log in">Login</v-btn>
                </form>
            </v-card-text>
        </v-card>
    </div>
</template>
<script setup lang="ts">
    import { useDisplay } from 'vuetify';
    import { useAuthStore } from '~/store/auth';

    definePageMeta({
        layout: 'login',
        middleware: 'auth'
    });

    const { mdAndUp } = useDisplay();
    const authStore = useAuthStore();

    const username = ref('');
    const password = ref('');

    function login() {
        authStore.login({ username: username.value, password: password.value });
    }
</script>
