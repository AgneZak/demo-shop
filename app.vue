<template>
    <v-app>
        <NuxtLayout :name="layout">
            <NuxtPage />
        </NuxtLayout>
        <v-footer absolute height="40px">
            <v-row justify="center" no-gutters> &copy; {{ new Date().getFullYear() }} </v-row>
        </v-footer>
    </v-app>
</template>
<script setup lang="ts">
    import { useAuthStore } from './store/auth';

    const authStore = useAuthStore();

    const layout = computed(() => (authStore.active ? 'default' : 'login'));
</script>
