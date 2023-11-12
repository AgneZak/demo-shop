<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="1024">
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ title }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="userInfo.name.firstname" label="Legal first name*" required> </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    v-model="userInfo.name.lastname"
                                    label="Legal last name"
                                    hint="example of helper text only on focus"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    v-model="userInfo.username"
                                    label="Username*"
                                    hint="example of persistent helper text"
                                    persistent-hint
                                    required
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="userInfo.email" label="Email*" required> </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="userInfo.password" label="Password*" type="password" required> </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-combobox
                                    v-model="userInfo.address.city"
                                    :items="['Vilnius', 'Kaunas', 'Klaipeda', 'Siauliai', 'Alytus']"
                                    label="City"
                                ></v-combobox>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="close"> Close </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script lang="ts" setup>
    import { useUsersStore } from '~/store/users';

    import { IUser } from '~/types/users/user';

    const props = defineProps<{
        show: boolean;
        add: boolean;
        user: IUser;
    }>();
    const usersStore = useUsersStore();

    const userInfo = reactive<IUser>(props.user || {});

    const dialog = computed(() => props.show);
    const title = computed(() => (props.add ? 'Add User' : 'User Profile'));

    const emit = defineEmits<{
        (e: 'close'): void;
    }>();

    function close() {
        emit('close');
    }

    function save() {
        const user = useCloneDeep(userInfo);
        if (props.add) {
            usersStore.addUser(user);
        } else {
            usersStore.updateUser(user);
        }

        emit('close');
    }
</script>
