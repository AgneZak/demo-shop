<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar title="Login"></v-app-bar>
        <v-main class="full-height"> <slot /></v-main>
    </v-layout>
</template>
<style lang="scss">
    .full-height {
        height: calc(100vh - 40px);
    }
</style>
