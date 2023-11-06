<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar title="Shop"></v-app-bar>
        <v-navigation-drawer permanent></v-navigation-drawer>
        <v-main> <slot /> </v-main>
        <v-footer></v-footer>
    </v-layout>
</template>
<script setup></script>
