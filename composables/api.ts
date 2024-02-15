import { AxiosRequestConfig, AxiosResponse } from 'axios';

export const api = <T, D = void>(config: AxiosRequestConfig<D>): Promise<AxiosResponse<T, D>> => {
    const nuxtApp = useNuxtApp();
    return nuxtApp.$api(config);
};
