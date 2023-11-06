export const useAuthStore = defineStore('auth', {
    state: () => ({
        authToken: '',
        active: false
    }),
    actions: {
        signInWithToken(token: string): void {
            this.active = true;
            this.authToken = token;
        }
    }
});
