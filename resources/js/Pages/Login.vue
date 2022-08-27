<template>
    <div class="login-page">
        <form @submit.prevent="submitForm">
            <div class="container">
                <h1>Login</h1>
                <label for="email"><b>Email</b></label>
                <input type="text" v-model="email" placeholder="Enter Email" name="email" required>

                <label for="psw"><b>Password</b></label>
                <input type="password" v-model="password" placeholder="Enter Password" name="psw" required>

                <div class="clearfix">
                    <button type="submit" class="btn">Sign In</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';
import {useStore} from "vuex";
const store = useStore();

const email = ref("");
const password = ref("");
const router = useRouter();

const submitForm = async (event) => {
    event.preventDefault();
    const payload = {
        email: email.value,
        password: password.value,
    }

    await axios.get('/sanctum/csrf-cookie').then(async res => {
        await axios.post('api/login', payload)
            .then(async response => {
                if (response.data.status === "success") {
                    await store.dispatch("ACTION_SET_USER_AUTHENTICATED", true);
                    await store.dispatch("ACTION_SET_AUTHENTICATED_USER_DATA", response.data.data);
                    router.push({name: 'another'});
                } else {
                    console.error(response.data.message);
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    })
}
</script>

<style scoped lang="scss">
.container {
    padding: 20px;
    max-width:500px;
    margin: 100px auto auto;
}

input {
    display: block;
}
</style>
