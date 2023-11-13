<template>
    <div>
        <section class="pa-4">
            <h1>Products</h1>
            <div class="d-flex mt-4">
                <v-text-field v-model="limit" name="limit" label="Limit" type="text" placeholder="limit" variant="outlined"></v-text-field>

                <v-radio-group v-model="sort" inline label="Sort">
                    <v-radio label="DESC" value="desc"></v-radio>
                    <v-radio label="ASC" value="asc"></v-radio>
                </v-radio-group>
            </div>

            <v-btn class="mt-4 mr-4" color="primary" @click="loadProducts">Load Products</v-btn>
            <v-btn class="mt-4" color="primary">
                <v-icon icon="mdi-package-variant-closed-plus"></v-icon>
                <span class="ml-1">Add Product</span>
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
                    <th class="text-left">Description</th>
                    <th class="text-left">Edit</th>
                    <th class="text-left">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="productStore.products.length <= 0">
                    <td>Select props and press Get Products</td>
                </tr>
                <tr v-for="product in productStore.products" :key="product.id">
                    <td>{{ product.id }}</td>
                    <td>{{ product.category }}</td>
                    <td>
                        <v-avatar size="36px">
                            <v-img v-if="product.image" :alt="product.title" :src="product.image"></v-img>
                            <v-icon v-else color="primary" icon="mdi-package-variant-closed"></v-icon>
                        </v-avatar>
                    </td>
                    <td class="wide-20">
                        <p :title="product.title" class="cut-text">{{ product.title }}</p>
                    </td>
                    <td>{{ product.price }}</td>
                    <td>
                        <v-container fluid>
                            <v-textarea
                                label="Description"
                                no-resize
                                readonly
                                bg-color="grey-lighten-2"
                                color="cyan"
                                rows="2"
                                :model-value="product.description"
                            ></v-textarea
                        ></v-container>
                    </td>
                    <td><v-icon icon="mdi-pen" @click="toggleDialog(product)"></v-icon></td>
                    <td><v-icon icon="mdi-package-variant-closed-remove" @click="deleteProduct(product)"></v-icon></td>
                </tr>
            </tbody>
        </v-table>
        <ProductModal :show="showDialog" :product="dialogProduct" :add="addProduct" @close="toggleDialog({} as IProduct)"></ProductModal>
    </div>
</template>

<script setup lang="ts">
    import { useProductsStore } from '~/store/products';
    import { IProduct } from '~/types/products/product';

    definePageMeta({
        middleware: 'auth'
    });

    const initProduct = {
        id: 0,
        title: '',
        price: '',
        category: '',
        description: '',
        image: ''
    };

    const productStore = useProductsStore();
    const limit = ref(0);
    const sort = ref(undefined);

    const showDialog = ref(false);
    const addProduct = ref(false);
    const dialogProduct = reactive<IProduct>(useCloneDeep(initProduct));

    function loadProducts() {
        productStore.loadProducts(limit.value, sort.value);
    }

    function toggleDialog(product: IProduct, add?: boolean) {
        Object.assign(dialogProduct, useCloneDeep(product));
        addProduct.value = add || false;
        showDialog.value = !showDialog.value;
    }

    function deleteProduct(product: IProduct) {
        productStore.deleteProduct(product);
    }

    productStore.loadProducts(limit.value, sort.value);
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
