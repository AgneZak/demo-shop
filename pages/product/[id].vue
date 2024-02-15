<template>
    <div>
        <section class="pa-4">
            <h2>{{ product.title }}</h2>
            <v-btn @click="goToShop">Back to Shop</v-btn>

            <v-btn class="ml-4" color="red" @click="toggleWishlist(product.id)"> <v-icon :icon="product.icon"></v-icon> </v-btn>
        </section>
        <v-container>
            <v-card class="mx-auto" max-width="800">
                <div class="d-flex align-center" :class="{ 'flex-column': mobile }">
                    <v-col cols="12" sm="6">
                        <v-card-item>
                            <v-img class="align-end text-white bg-white w-full" height="250" :src="product.image"> </v-img>
                        </v-card-item>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-card-item>
                            <v-card-text>
                                <p><span class="font-weight-bold">Category: </span>{{ product.category }}</p>
                                <h3 class="ma-4 text-center">{{ product.price }} €</h3>
                                <p class="font-weight-bold mb-4">Description:</p>
                                <p>{{ product.description }}</p>
                            </v-card-text>
                        </v-card-item>
                    </v-col>
                </div>
            </v-card>
        </v-container>
    </div>
</template>

<script setup lang="ts">
    import { useDisplay } from 'vuetify';

    import { useProductsStore } from '~/store/products';
    import { useWishlistStore } from '~/store/wishlist';
    import { IProduct } from '~/types/products/product';

    definePageMeta({
        middleware: 'auth'
    });

    const { mobile } = useDisplay();
    const route = useRoute();

    const productStore = useProductsStore();
    const wishlistStore = useWishlistStore();

    const productId = ref(Number(route.params.id));

    const product = computed(() => {
        const productById = productStore.getProductById(productId.value) as IProduct;
        const hearted = wishlistStore.wishlist.find((id) => productById!.id === id);
        const icon = hearted ? 'mdi-heart-off' : 'mdi-heart-plus-outline';

        return { ...productById, icon };
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
