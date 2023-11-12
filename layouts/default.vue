<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar title="Shop"></v-app-bar>
        <v-navigation-drawer permanent>
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
    const menuItems = [
        { text: 'Cart', id: 'cart', icon: 'mdi-cart-outline' },
        { text: 'Products', id: 'products', icon: 'mdi-package-variant-closed' },
        { text: 'Users', id: 'users', icon: 'mdi-account' }
    ];

    function goTo(id: string) {
        navigateTo(`/${id}`);
    }
</script>
<style lang="scss">
    .full-height {
        height: calc(100vh - 40px);
        overflow: auto;
    }
</style>
