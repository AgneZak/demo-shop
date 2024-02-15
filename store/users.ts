import { AxiosError } from 'axios';
import { api } from '~/composables/api';
import { IUser } from '~/types/users/user';
import { SORT } from '~/types/shared';

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [] as IUser[],
        activeUser: {} as IUser
    }),
    actions: {
        loadUsers(limit?: number, sort?: SORT) {
            api<IUser[]>({
                method: 'get',
                url: 'users',
                params: {
                    limit,
                    sort
                }
            })
                .then((response) => {
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

            api<IUser>({
                method: 'get',
                url: 'users',
                params: {
                    id
                }
            })
                .then((response) => {
                    return (this.activeUser = response.data);
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        },
        addUser(userInfo: IUser) {
            api<IUser, IUser>({ method: 'post', url: 'users', data: userInfo })
                .then((response) => {
                    this.activeUser = response.data;
                    // To see added user because of faked API
                    this.users.push({ ...userInfo, ...response.data });
                })
                .catch((error: AxiosError) => {
                    console.error(error);
                });
        },
        updateUser(userInfo: IUser) {
            api<IUser, IUser>({ method: 'patch', url: `users/${userInfo.id}`, data: userInfo })
                .then((response) => {
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
            api<IUser>({ method: 'delete', url: `users/${userInfo.id}` })
                .then((response) => {
                    const deletedUser = response.data ?? userInfo;
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
