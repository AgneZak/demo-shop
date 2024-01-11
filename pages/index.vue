<template>
    <div>
        <h1 class="pa-4">Welcome to your Shop</h1>

        <v-container>
            <product-filters @search-filter="searchByTitle" @search-category="searchByCategory"></product-filters>
            <v-row no-gutters>
                <v-col v-for="product in prepProducts" :key="product.id" cols="12" sm="4">
                    <v-sheet class="ma-2 pa-2">
                        <v-card class="mx-auto" max-width="400" theme="dark">
                            <v-img class="align-end text-white bg-white w-full" height="250" :src="product.image">
                                <v-card-title class="transparent-bg text-body-2 rounded-t-xl">{{ product.title }}</v-card-title>
                            </v-img>

                            <v-card-subtitle class="pt-4"> {{ product.category }}</v-card-subtitle>
                            <v-card-text>
                                <div class="d-flex justify-center">
                                    <p class="font-weight-black text-h6">{{ product.price }} €</p>
                                </div>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="primary" @click="goToProduct(product.id)"> More </v-btn>
                                <v-btn color="red" @click="toggleWishlist(product.id)"> <v-icon :icon="product.icon"></v-icon> </v-btn>
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
    // To see changes from product management - do not reload if filled
    // fake api so would need to save to local storage
    if (productStore.products.length <= 0) {
        productStore.loadProducts();
    }
    const searchFilter = ref();
    const searchCategory = ref();

    const prepProducts = computed(() => {
        let products = productStore.getProducts.map((product) => {
            const hearted = wishlistStore.wishlist.find((id) => product.id === id);
            const icon = hearted ? 'mdi-heart-off' : 'mdi-heart-plus-outline';
            return { ...product, icon };
        });

        if (searchFilter.value) {
            products = products.filter((product) => product.title.toLowerCase().includes(searchFilter.value.toLowerCase()));
        }
        if (searchCategory.value) {
            products = products.filter((product) => product.category === searchCategory.value);
        }

        return products;
    });

    function toggleWishlist(id: number) {
        const hearted = wishlistStore.wishlist.find((wishId) => wishId === id);
        hearted ? wishlistStore.removeFromWishlist(id) : wishlistStore.addToWishlist(id);
    }

    function searchByTitle(filter: string) {
        searchFilter.value = filter;
    }

    function searchByCategory(filter: string) {
        searchCategory.value = filter;
    }

    function goToProduct(id: number) {
        navigateTo(`/product/${id}`);
    }
</script>
<style lang="scss">
    .transparent-bg {
        background-color: rgba(#607d8b, 0.8);
    }
</style>
