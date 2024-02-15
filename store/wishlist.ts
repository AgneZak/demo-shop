export const useWishlistStore = defineStore('wishlist', {
    state: () => ({
        wishlist: [] as number[]
    }),
    actions: {
        addToWishlist(id: number) {
            this.wishlist.push(id);
        },
        removeFromWishlist(id: number) {
            this.wishlist = this.wishlist.filter((wishId) => wishId !== id);
        }
    }
});
