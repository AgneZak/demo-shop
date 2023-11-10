import { AxiosError, AxiosResponse } from 'axios';
import { api } from '~/composables/api';

interface IUser {
    id: number;
    email: string;
    username: string;
    password: string;
    name: {
        firstname: string;
        lastname: string;
    };
    address: {
        city: string;
        street: string;
        number: number;
        zipcode: string;
        geolocation: {
            lat: string;
            long: string;
        };
    };
    phone: string;
}

export enum SORT {
    DESC = 'desc',
    ASC = 'asc'
}

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [] as IUser[],
        activeUser: {} as IUser
    }),
    actions: {
        loadUsers(limit?: number, sort?: SORT) {
            const mainUrl = 'users';
            const limitParam = limit ? `?limit=${limit}` : '';
            const sortParam = sort ? `?sort=${sort}` : '';
            const url = `${mainUrl}${limitParam}${sortParam}`;

            api({ method: 'get', url })
                .then((response: AxiosResponse<IUser[], any>) => {
                    this.users = response.data;
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        },
        getUserById(id: number) {
            const user = this.users.find((user) => user.id === id);

            if (user) {
                return (this.activeUser = user);
            }

            api({ method: 'get', url: `users/${id}` })
                .then((response: AxiosResponse<IUser, any>) => {
                    return (this.activeUser = response.data);
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        },
        addUser(userInfo: IUser) {
            api({ method: 'post', url: 'users', data: userInfo })
                .then((response: AxiosResponse<IUser, any>) => {
                    this.activeUser = response.data;
                    // To see added user because of faked API
                    this.users.push(response.data);
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        },
        updateUser(userInfo: IUser) {
            api({ method: 'patch', url: `users/${userInfo.id}`, data: userInfo })
                .then((response: AxiosResponse<IUser, any>) => {
                    this.activeUser = response.data;
                    // To see updated user data
                    const userIndex = this.users.findIndex((user) => {
                        return user.id === this.activeUser.id;
                    });

                    if (userIndex !== -1) {
                        this.users[userIndex] = this.activeUser;
                    }
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        },
        deleteUser(userInfo: IUser) {
            api({ method: 'delete', url: `users/${userInfo.id}` })
                .then((response: AxiosResponse<IUser, any>) => {
                    const deletedUser = response.data;
                    // To see updated users array
                    const userIndex = this.users.findIndex((user) => {
                        return user.id === deletedUser.id;
                    });

                    if (userIndex !== -1) {
                        this.users.splice(userIndex, 1);
                    }
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        }
    },
    getters: {
        getUsers(): IUser[] {
            return this.users;
        }
    }
});
