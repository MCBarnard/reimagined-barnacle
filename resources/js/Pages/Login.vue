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
.login-page {
    width: 100%;
    padding: 20px;
}
/* Add padding to container elements */
.container {
    padding: 20px;
    max-width:500px;
    margin: 100px auto auto;
    border:1px solid #ccc;
    border-radius:10px;
    background:white;
    -webkit-box-shadow: 2px 1px 21px -9px rgba(0,0,0,0.38);
    -moz-box-shadow: 2px 1px 21px -9px rgba(0,0,0,0.38);
    box-shadow: 2px 1px 21px -9px rgba(0,0,0,0.38);
}

/* Full-width input fields */
input[type=text], input[type=password] {
    width: 100%;
    padding: 15px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    background: #f7f7f7;
    font-family: Montserrat,Arial, Helvetica, sans-serif;
}

input[type=text]:focus, input[type=password]:focus, input[type=phone]:focus, select:focus {
    background-color: #ddd;
    outline: none;
}

button {
    background-color: #0eb7f4;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.9;
    font-size:16px;
    font-family: Montserrat,Arial, Helvetica, sans-serif;
    border-radius:10px;
}

button:hover {
    opacity:1;
}


/* Change styles for signup button on extra small screens */
@media screen and (max-width: 300px) {
    .signupbtn {
        width: 100%;
    }
}
</style>
