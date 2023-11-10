<template>
    <div>
        <section>
            <h1>Users</h1>
            <v-text-field v-model="limit" name="limit" label="Limit" type="text" placeholder="limit"></v-text-field>

            <v-radio-group v-model="sort" inline label="Sort">
                <v-radio label="DESC" value="desc"></v-radio>
                <v-radio label="ASC" value="asc"></v-radio>
            </v-radio-group>

            <v-btn class="mt-4" color="primary" @click="loadUsers">Get Users</v-btn>
        </section>
        <v-table density="compact" fixed-header height="300px">
            <thead>
                <tr>
                    <th class="text-left">ID</th>
                    <th class="text-left">Name</th>
                    <th class="text-left">Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in usersStore.users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name.firstname }}</td>
                    <td>{{ user.email }}</td>
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
