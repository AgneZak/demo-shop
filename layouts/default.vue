<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar title="Management">
            <template #prepend>
                <v-app-bar-nav-icon color="primary" @click.stop="drawer = !drawer"> <v-icon icon="mdi-menu"></v-icon> </v-app-bar-nav-icon>
            </template>
            <v-btn color="primary" @click="logout"> <v-icon icon="mdi-logout"></v-icon> </v-btn>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" :permanent="!mobile" :temporary="mobile">
            <v-list>
                <v-list-subheader>Menu</v-list-subheader>

                <v-list-item v-for="(item, i) in menuItems" :key="i" :value="item" color="primary" variant="plain" @click="goTo(item.id)">
                    <template #prepend>
                        <v-icon :icon="item.icon"></v-icon>
                    </template>

                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main class="full-height"> <slot /> </v-main>
    </v-layout>
</template>
<script setup lang="ts">
    import { useDisplay } from 'vuetify';
    import { useAuthStore } from '~/store/auth';

    const menuItems = [
        { text: 'Wishlist', id: 'wishlist', icon: 'mdi-heart' },
        { text: 'Wishlist Shop', id: '', icon: 'mdi-cart-heart' },
        { text: 'Manage Carts', id: 'cart', icon: 'mdi-basket-outline' },
        { text: 'Manage Products', id: 'products', icon: 'mdi-package-variant-closed' },
        { text: 'Manage Users', id: 'users', icon: 'mdi-account' }
    ];

    const { mobile } = useDisplay();

    const authStore = useAuthStore();

    const drawer = ref(true);

    function goTo(id: string) {
        navigateTo(`/${id}`);
    }

    function logout() {
        authStore.logout();
        navigateTo('/login');
    }
</script>
<style lang="scss">
    .full-height {
        height: calc(100vh - 40px);
        overflow: auto;
        overflow: auto;
    }
</style>
