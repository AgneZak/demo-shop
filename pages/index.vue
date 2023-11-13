<template>
    <div>
        <h1>Welcome to your dashboard</h1>

        <v-container class="bg-surface-variant">
            <v-row no-gutters>
                <v-col v-for="product in prepProducts" :key="product.id" cols="12" sm="4">
                    <v-sheet class="ma-2 pa-2">
                        <v-card class="mx-auto" max-width="400" theme="dark">
                            <v-img class="align-end text-white" height="400" :src="product.image" cover>
                                <v-card-title class="transparent-bg text-body-2 rounded-t-xl">{{ product.title }}</v-card-title>
                            </v-img>

                            <v-card-subtitle class="pt-4"> {{ product.category }}</v-card-subtitle>
                            <v-card-text>
                                <div class="d-flex justify-center">
                                    <p class="font-weight-black text-h6">{{ product.price }} €</p>
                                </div>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="primary"> More </v-btn>
                                <v-btn color="red"> <v-icon :icon="product.icon"></v-icon> </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
    import { useProductsStore } from '~/store/products';
    import { useWishlistStore } from '~/store/wishlist';

    definePageMeta({
        middleware: 'auth'
    });

    const productStore = useProductsStore();
    const wishlistStore = useWishlistStore();

    const prepProducts = computed(() =>
        productStore.getProducts.map((product) => {
            const hearted = wishlistStore.wishlist.find((id) => product.id === id);
            const icon = hearted ? 'mdi-heart-off' : 'mdi-heart-plus-outline';
            return { ...product, icon };
        })
    );
</script>
<style lang="scss">
    .transparent-bg {
        background-color: rgba(#607d8b, 0.8);
    }
</style>
