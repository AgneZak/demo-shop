import { AxiosError, AxiosResponse } from 'axios';
import { api } from '~/composables/api';

import { IProduct } from '~/types/products/product';
import { SORT } from '~/types/shared';

export const useProductsStore = defineStore('products', {
    state: () => ({
        products: [] as IProduct[],
        categories: [] as string[],
        activeProduct: {} as IProduct
    }),
    actions: {
        loadProducts(limit?: number, sort?: SORT) {
            api({
                method: 'get',
                url: 'products',
                params: {
                    limit,
                    sort
                }
            })
                .then((response: AxiosResponse<IProduct[], any>) => {
                    this.products = response.data;
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        },
        getProductById(id: number) {
            const product = this.products.find((product) => product.id === id);

            if (product) {
                return (this.activeProduct = product);
            }

            api({
                method: 'get',
                url: 'products',
                params: {
                    id
                }
            })
                .then((response: AxiosResponse<IProduct, any>) => {
                    return (this.activeProduct = response.data);
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        },
        addProduct(productInfo: IProduct) {
            api({ method: 'post', url: 'products', data: productInfo })
                .then((response: AxiosResponse<IProduct, any>) => {
                    this.activeProduct = response.data;
                    // To see added user because of faked API
                    this.products.push({ ...productInfo, ...response.data });
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        },
        updateProduct(productInfo: IProduct) {
            api({ method: 'patch', url: `products/${productInfo.id}`, data: productInfo })
                .then((response: AxiosResponse<IProduct, any>) => {
                    this.activeProduct = response.data;
                    // To see updated user data
                    const userIndex = this.products.findIndex((product) => {
                        return product.id === this.activeProduct.id;
                    });

                    if (userIndex !== -1) {
                        this.products[userIndex] = this.activeProduct;
                    }
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        },
        deleteProduct(productInfo: IProduct) {
            api({ method: 'delete', url: `products/${productInfo.id}` })
                .then((response: AxiosResponse<{ id: number }, any>) => {
                    const deletedProduct = response.data ?? productInfo;
                    // To see updated products array
                    const productIndex = this.products.findIndex((product) => {
                        return product.id === deletedProduct.id;
                    });

                    if (productIndex !== -1) {
                        this.products.splice(productIndex, 1);
                    }
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        },
        loadCategories() {
            if (this.categories.length > 0) {
                return;
            }
            api({
                method: 'get',
                url: 'products/categories'
            })
                .then((response: AxiosResponse<string[], any>) => {
                    this.categories = response.data;
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        }
    },
    getters: {
        getProducts(): IProduct[] {
            return this.products;
        },
        getCategories(): string[] {
            return this.categories;
        }
    }
});
