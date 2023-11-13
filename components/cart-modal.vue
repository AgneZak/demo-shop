<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="1024">
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ title }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="cartInfo.id" label="Cart ID" hint="Readonly" readonly></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="cartInfo.userId" label="User" hint="Choose user id"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <template v-for="product in cartInfo.products" :key="product.produtId">
                                    <v-chip color="primary">
                                        <v-icon icon="mdi-package-variant"></v-icon
                                        ><span>{{ productStore.getProductById(product.productId)?.title || product.productId }} &</span>
                                        <span>& Quantity: {{ product.quantity }}</span>
                                        <template #append>
                                            <v-btn class="ml-1" icon color="primary" @click="updateQuantity(product, false)">
                                                <v-icon>mdi-package-variant-minus</v-icon>
                                            </v-btn>
                                            <v-btn class="ml-1" icon color="primary" @click="updateQuantity(product, true)">
                                                <v-icon>mdi-package-variant-plus</v-icon>
                                            </v-btn>
                                        </template>
                                    </v-chip>
                                </template>
                            </v-col>
                            <v-col cols="12">
                                <v-select
                                    v-model="selectProduct"
                                    :items="productSelect"
                                    item-value="id"
                                    label="Add Product to cart"
                                    @update:model-value="addProduct"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="close"> Close </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script lang="ts" setup>
    import { useCartStore } from '~/store/cart';
    import { useProductsStore } from '~/store/products';

    import { ICart } from '~/types/carts/cart';

    const props = defineProps<{
        show: boolean;
        add: boolean;
        cart: ICart;
    }>();
    const cartStore = useCartStore();
    const productStore = useProductsStore();

    const cartInfo = reactive<ICart>(props.cart || {});

    const dialog = computed(() => props.show);
    const selectProduct = ref();
    const title = computed(() => (props.add ? 'Add Cart' : 'Cart'));
    const productSelect = computed(() =>
        productStore.getProducts.filter((product) => cartInfo.products.find((cartProduct) => cartProduct.productId !== product.id))
    );

    const emit = defineEmits<{
        (e: 'close'): void;
    }>();

    function close() {
        emit('close');
    }

    function save() {
        const cart = useCloneDeep(cartInfo);
        if (props.add) {
            cartStore.addCart(cart);
        } else {
            cartStore.updateCart(cart);
        }

        emit('close');
    }

    function updateQuantity(product: any, add: boolean) {
        add ? product.quantity++ : product.quantity--;

        if (product.quantity <= 0) {
            const productIndex = cartInfo.products.findIndex((cartProduct) => {
                return cartProduct.productId === product.productId;
            });

            if (productIndex !== -1) {
                cartInfo.products.splice(productIndex, 1);
            }
        }
    }

    function addProduct(val: any) {
        selectProduct.value = undefined;
        cartInfo.products.push({ productId: val, quantity: 1 });
    }
</script>
