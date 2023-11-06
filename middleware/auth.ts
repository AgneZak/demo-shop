import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    // isAuthenticated() is an example method verifying if a user is authenticated
    if (!useAuthStore().active) {
        return navigateTo('/login');
    }
});
