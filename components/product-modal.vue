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
                                <v-text-field v-model="productInfo.id" label="Product ID" hint="Readonly" readonly></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="productInfo.image" label="Image" hint="Add image url"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-img
                                    v-if="product.image"
                                    :alt="product.title"
                                    :src="product.image"
                                    width="150"
                                    aspect-ratio="4/3"
                                ></v-img>
                            </v-col>

                            <v-col cols="12">
                                <v-select
                                    v-model="productInfo.category"
                                    :items="productStore.getCategories"
                                    label="Choose category"
                                ></v-select
                            ></v-col>
                            <v-col cols="12">
                                <v-textarea v-model="productInfo.description" label="Description" no-resize rows="4"></v-textarea>
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
    import { useProductsStore } from '~/store/products';
    import { IProduct } from '~/types/products/product';

    const props = defineProps<{
        show: boolean;
        add: boolean;
        product: IProduct;
    }>();
    const productStore = useProductsStore();

    const productInfo = reactive<IProduct>(props.product || {});

    const dialog = computed(() => props.show);
    const title = computed(() => (props.add ? 'Add Product' : 'Product'));

    const emit = defineEmits<{
        (e: 'close'): void;
    }>();

    function close() {
        emit('close');
    }

    function save() {
        const product = useCloneDeep(productInfo);
        if (props.add) {
            productStore.addProduct(product);
        } else {
            productStore.updateProduct(product);
        }

        emit('close');
    }
    productStore.loadCategories();
</script>
