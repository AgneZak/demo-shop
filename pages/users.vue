<template>
    <div>
        <section class="pa-4">
            <h1>Users</h1>
            <div class="d-flex mt-4">
                <v-text-field v-model="limit" name="limit" label="Limit" type="text" placeholder="limit" variant="outlined"></v-text-field>

                <v-radio-group v-model="sort" inline label="Sort">
                    <v-radio label="DESC" value="desc"></v-radio>
                    <v-radio label="ASC" value="asc"></v-radio>
                </v-radio-group>
            </div>
            <v-btn class="mt-4 mr-4" color="primary" @click="loadUsers">Load Users from database</v-btn>
            <v-btn class="mt-4" color="primary" @click="toggleDialog(initUser, true)">Add User</v-btn>
        </section>
        <v-table density="compact" fixed-header height="calc(60vh - 50px)">
            <thead>
                <tr>
                    <th class="text-left">ID</th>
                    <th class="text-left">Name</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">City</th>
                    <th class="text-left">Edit</th>
                    <th class="text-left">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="usersStore.users.length <= 0">
                    <td>Select props and press Get Users</td>
                </tr>
                <tr v-for="user in usersStore.users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name.firstname }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.address.city }}</td>

                    <td>
                        <v-icon icon="mdi-account-edit" @click="toggleDialog(user)"></v-icon>
                    </td>
                    <td><v-icon icon="mdi-account-remove" @click="deleteUser(user)"></v-icon></td>
                </tr>
            </tbody>
        </v-table>
        <UsersModal :show="showDialog" :user="dialogUser" :add="addUser" @close="toggleDialog(initUser)"></UsersModal>
    </div>
</template>

<script setup lang="ts">
    import { useUsersStore } from '~/store/users';
    import { IUser } from '~/types/users/user';

    definePageMeta({
        middleware: 'auth'
    });

    const initUser = {
        id: 0,
        email: '',
        username: '',
        password: '',
        name: {
            firstname: '',
            lastname: ''
        },
        address: {
            city: '',
            street: '',
            number: 0,
            zipcode: '',
            geolocation: {
                lat: '',
                long: ''
            }
        },
        phone: ''
    };

    const usersStore = useUsersStore();
    const limit = ref(0);
    const sort = ref(undefined);

    const showDialog = ref(false);
    const addUser = ref(false);
    const dialogUser = reactive<IUser>(useCloneDeep(initUser));

    function loadUsers() {
        usersStore.loadUsers(limit.value, sort.value);
    }

    function toggleDialog(user: IUser, add?: boolean) {
        Object.assign(dialogUser, useCloneDeep(user));
        addUser.value = add || false;
        showDialog.value = !showDialog.value;
    }

    function deleteUser(user: IUser) {
        usersStore.deleteUser(user);
    }

    usersStore.loadUsers(limit.value, sort.value);
</script>
