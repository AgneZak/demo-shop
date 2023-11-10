<template>
    <NuxtLayout :name="layout">
        <NuxtPage />
    </NuxtLayout>
</template>
<script setup lang="ts">
    import { useAuthStore } from './store/auth';

    const authStore = useAuthStore();

    const layout = authStore.active ? 'default' : 'login';
</script>
