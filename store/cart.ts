import { AxiosError, AxiosResponse } from 'axios';
import { api } from '~/composables/api';
import { SORT } from '~/types/shared';

export const useCartStore = defineStore('cart', {
    state: () => ({
        carts: [],
        activeCart: {}
    }),
    actions: {
        loadCarts(limit?: number, sort?: SORT) {
            api({
                method: 'get',
                url: 'carts',
                params: {
                    limit,
                    sort
                }
            })
                .then((response: AxiosResponse<any, any>) => {
                    this.carts = response.data;
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        },
        getCartById(id: number) {
            const cart = this.carts.find((cart) => cart.id === id);

            if (cart) {
                return (this.activeCart = cart);
            }

            api({
                method: 'get',
                url: 'carts',
                params: {
                    id
                }
            })
                .then((response: AxiosResponse<any, any>) => {
                    return (this.activeCart = response.data);
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        },
        addCart(cartInfo: any) {
            api({ method: 'post', url: 'carts', data: cartInfo })
                .then((response: AxiosResponse<any, any>) => {
                    this.activeCart = response.data;
                    // To see added user because of faked API
                    this.carts.push({ ...cartInfo, ...response.data });
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        },
        updateCart(cartInfo: any) {
            api({ method: 'patch', url: `carts/${cartInfo.id}`, data: cartInfo })
                .then((response: AxiosResponse<any, any>) => {
                    this.activeCart = response.data;
                    // To see updated user data
                    const userIndex = this.carts.findIndex((user) => {
                        return user.id === this.activeUser.id;
                    });

                    if (userIndex !== -1) {
                        this.carts[userIndex] = this.activeUser;
                    }
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        },
        deleteCart(cartInfo: any) {
            api({ method: 'delete', url: `carts/${cartInfo.id}` })
                .then((response: AxiosResponse<IUser, any>) => {
                    const deletedCart = response.data ?? cartInfo;
                    // To see updated carts array
                    const cartIndex = this.carts.findIndex((cart) => {
                        return cart.id === deletedCart.id;
                    });

                    if (cartIndex !== -1) {
                        this.carts.splice(cartIndex, 1);
                    }
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        }
    },
    getters: {
        getCarts(): any[] {
            return this.carts;
        }
    }
});
