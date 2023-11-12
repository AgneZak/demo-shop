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
            <v-btn class="mt-4" color="primary" @click="loadUsers">Get Users</v-btn>
        </section>
        <v-table density="compact" fixed-header height="calc(60vh - 50px)">
            <thead>
                <tr>
                    <th class="text-left">ID</th>
                    <th class="text-left">Name</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">Edit</th>
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
                    <td><v-icon icon="mdi-pen"></v-icon></td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script setup lang="ts">
    import { useUsersStore } from '~/store/users';

    definePageMeta({
        middleware: 'auth'
    });

    const usersStore = useUsersStore();
    const limit = ref(0);
    const sort = ref(undefined);

    function loadUsers() {
        usersStore.loadUsers(limit.value, sort.value);
    }
</script>
