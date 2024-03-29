import { AxiosError } from 'axios';
import { api } from '~/composables/api';

import { ICart } from '~/types/carts/cart';
import { SORT } from '~/types/shared';

export const useCartStore = defineStore('cart', {
    state: () => ({
        carts: [] as ICart[],
        activeCart: {} as ICart
    }),
    actions: {
        loadCarts(limit?: number, sort?: SORT, date?: Date[]) {
            const startdate = date?.[0].toJSON().slice(0, 10);
            const enddate = date?.[1].toJSON().slice(0, 10);

            api<ICart[]>({
                method: 'get',
                url: 'carts',
                params: {
                    limit,
                    sort,
                    startdate,
                    enddate
                }
            })
                .then((response) => {
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

            api<ICart>({
                method: 'get',
                url: 'carts',
                params: {
                    id
                }
            })
                .then((response) => {
                    return (this.activeCart = response.data);
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        },
        addCart(cartInfo: ICart) {
            api<ICart, ICart>({ method: 'post', url: 'carts', data: cartInfo })
                .then((response) => {
                    this.activeCart = response.data;
                    // To see added user because of faked API
                    this.carts.push({ ...cartInfo, ...response.data });
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        },
        updateCart(cartInfo: ICart) {
            api<ICart, ICart>({ method: 'patch', url: `carts/${cartInfo.id}`, data: cartInfo })
                .then((response) => {
                    this.activeCart = response.data;
                    // To see updated user data
                    const userIndex = this.carts.findIndex((cart) => {
                        return cart.id === this.activeCart.id;
                    });

                    if (userIndex !== -1) {
                        this.carts[userIndex] = this.activeCart;
                    }
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        },
        deleteCart(cartInfo: ICart) {
            api<{ id: number }, ICart>({ method: 'delete', url: `carts/${cartInfo.id}` })
                .then((response) => {
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
        getCarts(): ICart[] {
            return this.carts;
        }
    }
});
