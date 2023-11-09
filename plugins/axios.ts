import axios from 'axios';
import Global from '~/globals/global';

export default defineNuxtPlugin(() => {
    const defaultUrl = Global.backendURL;

    const api = axios.create({
        baseURL: defaultUrl,
        headers: {
            common: {}
        }
    });

    return {
        provide: {
            api
        }
    };
});
