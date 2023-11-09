import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    const { active } = storeToRefs(useAuthStore());
    const token = useCookie('token');

    if (token.value) {
        active.value = true;
    }

    if (active.value && to?.name === 'login') {
        return navigateTo('/');
    }

    if (!active.value && to?.name !== 'login') {
        abortNavigation();
        return navigateTo('/login');
    }
});
