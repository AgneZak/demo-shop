<template>
    <div>
        <h1 class="pa-4">{{ prepProduct.title }}</h1>
        <v-btn color="red" @click="toggleWishlist(prepProduct.id)"> <v-icon :icon="prepProduct.icon"></v-icon> </v-btn>

        <v-container> <v-btn @click="goToShop">Back to Shop</v-btn></v-container>
    </div>
</template>

<script setup lang="ts">
    import { useProductsStore } from '~/store/products';
    import { useWishlistStore } from '~/store/wishlist';
    import { IProduct } from '~/types/products/product';

    definePageMeta({
        middleware: 'auth'
    });

    const route = useRoute();

    const productStore = useProductsStore();
    const wishlistStore = useWishlistStore();

    const productId = ref(Number(route.params.id));

    const prepProduct = computed(() => {
        const product = productStore.getProductById(productId.value) as IProduct;
        const hearted = wishlistStore.wishlist.find((id) => product!.id === id);
        const icon = hearted ? 'mdi-heart-off' : 'mdi-heart-plus-outline';
        return { ...product, icon };
    });

    function toggleWishlist(id: number) {
        const hearted = wishlistStore.wishlist.find((wishId) => wishId === id);
        hearted ? wishlistStore.removeFromWishlist(id) : wishlistStore.addToWishlist(id);
    }

    function goToShop() {
        navigateTo('/');
    }
</script>
<style lang="scss"></style>
