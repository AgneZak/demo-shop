import { AxiosError } from 'axios';
import { api } from '~/composables/api';

interface IUserParams {
    username: string;
    password: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authToken: '',
        active: false
    }),
    actions: {
        signInWithToken(tokenValue: string): void {
            const token = useCookie('token');
            token.value = tokenValue;
            this.active = true;
            this.authToken = tokenValue;
        },
        login(loginParams: IUserParams) {
            api<{ token: string }, IUserParams>({ method: 'post', url: 'auth/login', data: loginParams })
                .then((response) => {
                    const token = response.data.token;
                    this.signInWithToken(token);
                    navigateTo('/');
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        },
        logout() {
            const token = useCookie('token');
            this.active = false;
            token.value = null;
        }
    }
});
