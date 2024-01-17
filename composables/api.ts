import { AxiosRequestConfig } from 'axios';

export const api = (config: AxiosRequestConfig<any>) => {
    const nuxtApp = useNuxtApp();
    return nuxtApp.$api(config);
};
