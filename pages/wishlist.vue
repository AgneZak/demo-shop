<template>
    <div>
        <section class="pa-4">
            <h1>Wishlist</h1>
            <div class="d-flex mt-4">
                <v-select v-model="wishlistSelect" :items="wishlistSelectProducts" item-value="id" label="Choose item to Add"></v-select>
            </div>

            <v-btn class="mt-4" color="primary" @click="addToWishlist">
                <v-icon icon="mdi-heart-plus"></v-icon>
                <span class="ml-1">Add to Wishlist</span>
            </v-btn>
        </section>
        <v-table density="compact" fixed-header height="calc(60vh - 50px)">
            <thead>
                <tr>
                    <th class="text-left">ID</th>
                    <th class="text-left">Category</th>
                    <th class="text-left">Image</th>
                    <th class="text-left">Title</th>
                    <th class="text-left">Price</th>
                    <th class="text-left">Remove</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in wishlistItems" :key="product?.id">
                    <td>{{ product?.id }}</td>
                    <td>{{ product?.category }}</td>
                    <td>
                        <v-avatar size="36px">
                            <v-img v-if="product?.image" :alt="product.title" :src="product.image"></v-img>
                            <v-icon v-else color="primary" icon="mdi-package-variant-closed"></v-icon>
                        </v-avatar>
                    </td>
                    <td class="wide-20">
                        <p :title="product?.title" class="cut-text">{{ product?.title }}</p>
                    </td>
                    <td>{{ product?.price }}</td>
                    <td><v-icon icon="mdi-heart-remove" @click="removeFromWishlist(product!.id)"></v-icon></td>
                </tr>
            </tbody>
        </v-table>
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

    const wishlistSelect = ref<number>();

    const wishlistSelectProducts = computed(() =>
        productStore.getProducts.filter((product) => !wishlistStore.wishlist.includes(product.id))
    );
    const wishlistItems = computed(() => wishlistStore.wishlist.map((id) => productStore.getProductById(id)));

    function addToWishlist() {
        if (!wishlistSelect.value) {
            return;
        }
        wishlistStore.addToWishlist(wishlistSelect.value);
        wishlistSelect.value = undefined;
    }

    function removeFromWishlist(id: number) {
        wishlistStore.removeFromWishlist(id);
    }

    productStore.loadProducts();
</script>
<style lang="scss">
    .cut-text {
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        word-break: break-all;
        white-space: nowrap;
    }

    .wide-20 {
        max-width: 0;
        width: 20%;
    }
</style>
