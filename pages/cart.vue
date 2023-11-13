<template>
    <div>
        <section class="pa-4">
            <h1>Carts</h1>
            <div class="d-flex mt-4">
                <v-text-field v-model="limit" name="limit" label="Limit" type="text" placeholder="limit" variant="outlined"></v-text-field>

                <v-radio-group v-model="sort" inline label="Sort">
                    <v-radio label="DESC" value="desc"></v-radio>
                    <v-radio label="ASC" value="asc"></v-radio>
                </v-radio-group>

                <v-checkbox v-model="showCalendar" label="Pick date range"></v-checkbox>
            </div>
            <v-row v-if="showCalendar" justify="space-around">
                <v-date-picker v-model="date" :min="minDate" :max="maxDate" multiple @update:model-value="pickDates(date)"></v-date-picker>
            </v-row>
            <v-btn class="mt-4 mr-4" color="primary" @click="loadCarts">Load Carts</v-btn>
            <v-btn class="mt-4" color="primary" @click="toggleDialog(initCart, true)">
                <v-icon icon="mdi-cart-plus"></v-icon>
                <span class="ml-1">Add Cart</span>
            </v-btn>
        </section>
        <v-table density="compact" fixed-header height="calc(60vh - 50px)">
            <thead>
                <tr>
                    <th class="text-left">ID</th>
                    <th class="text-left">UserID</th>
                    <th class="text-left">Date</th>
                    <th class="text-left">Products</th>
                    <th class="text-left">Edit</th>
                    <th class="text-left">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="cartStore.carts.length <= 0">
                    <td>Select props and press Get Carts</td>
                </tr>
                <tr v-for="cart in cartStore.carts" :key="cart.id">
                    <td>{{ cart.id }}</td>
                    <td>{{ cart.userId }}</td>
                    <td>{{ cart.date }}</td>
                    <td>
                        <template v-for="product in cart.products" :key="product.produtId">
                            <v-chip color="primary">
                                <v-icon icon="mdi-package-variant"></v-icon>
                                <span>{{ productStore.getProductById(product.productId)?.title || product.productId }} & </span>
                                <span>& Quantity: {{ product.quantity }}</span>
                            </v-chip></template
                        >
                    </td>
                    <td><v-icon icon="mdi-pen" @click="toggleDialog(cart)"></v-icon></td>
                    <td><v-icon icon="mdi-cart-off" @click="deleteCart(cart)"></v-icon></td>
                </tr>
            </tbody>
        </v-table>

        <CartModal :show="showDialog" :cart="dialogCart" :add="addCart" @close="toggleDialog({} as ICart)"></CartModal>
    </div>
</template>

<script setup lang="ts">
    import { useCartStore } from '~/store/cart';
    import { useProductsStore } from '~/store/products';

    import { ICart } from '~/types/carts/cart';

    definePageMeta({
        middleware: 'auth'
    });

    const initCart = { id: 0, userId: 0, date: new Date(), products: [] };

    const cartStore = useCartStore();
    const productStore = useProductsStore();

    const limit = ref(0);
    const sort = ref(undefined);
    const date = ref();
    const showCalendar = ref(false);
    const minDate = ref('2020-01-01');
    const maxDate = ref(new Date().toJSON().slice(0, 10));

    const showDialog = ref(false);
    const addCart = ref(false);
    const dialogCart = reactive<ICart>(useCloneDeep(initCart));

    function loadCarts() {
        cartStore.loadCarts(limit.value, sort.value, date.value);
    }

    function toggleDialog(cart: ICart, add?: boolean) {
        Object.assign(dialogCart, useCloneDeep(cart));
        addCart.value = add || false;
        showDialog.value = !showDialog.value;
    }

    function deleteCart(cart: ICart) {
        cartStore.deleteCart(cart);
    }

    function pickDates(modelDate: any) {
        if (modelDate.length > 2) {
            date.value = undefined;
            maxDate.value = new Date().toJSON().slice(0, 10);
            minDate.value = '';
            return;
        }

        minDate.value = modelDate[0];

        if (modelDate[1]) {
            maxDate.value = modelDate[1];
        }

        if (modelDate.length === 0) {
            maxDate.value = new Date().toJSON().slice(0, 10);
        }
    }

    cartStore.loadCarts(limit.value, sort.value);
    productStore.loadProducts();
</script>
