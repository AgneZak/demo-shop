<template>
    <v-row justify="center">
        <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="search" label="Search for product" density="compact" @update:model-value="filterProducts">
            </v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
            <v-select
                v-model="category"
                :items="productStore.categories"
                density="compact"
                label="Choose category"
                clearable
                @update:model-value="findByCategory"
            ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
            <v-select
                v-model="priceSort"
                :items="sortItems"
                item-value="id"
                density="compact"
                label="Sort by price"
                clearable
                @update:model-value="sortByPrice"
            ></v-select>
        </v-col>
    </v-row>
</template>
<script lang="ts" setup>
    import { useProductsStore } from '~/store/products';

    const productStore = useProductsStore();
    const emit = defineEmits<{
        (e: 'search-filter', filter: string): void;
        (e: 'search-category', filter: string): void;
    }>();

    productStore.loadCategories();
    const sortItems = [
        { title: 'From cheapest', id: 0 },
        { title: 'From hightest', id: 1 }
    ];

    const category = ref();
    const priceSort = ref();
    const search = ref();

    function filterProducts() {
        emit('search-filter', search.value);
    }

    function findByCategory() {
        emit('search-category', category.value);
    }

    function sortByPrice() {
        switch (priceSort.value) {
            case 0:
                productStore.products.sort((p1, p2) => (p1.price > p2.price ? 1 : p1.price < p2.price ? -1 : 0));
                break;
            case 1:
                productStore.products.sort((p1, p2) => (p1.price < p2.price ? 1 : p1.price > p2.price ? -1 : 0));
                break;
            default:
                productStore.products.sort((p1, p2) => p1.id - p2.id);
                break;
        }
    }
</script>
