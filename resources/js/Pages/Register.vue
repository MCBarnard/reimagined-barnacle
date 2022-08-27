<template>
    <div class="register-page">
        <form @submit.prevent="submitForm">
            <div class="container">
                <h1>Register</h1>
                <label for="email"><b>Username</b></label>
                <input type="text" v-model="username" name="username" placeholder="Enter Username" required>
                <label for="email"><b>Email</b></label>
                <input type="text" v-model="email" placeholder="Enter Email" name="email" required>

                <label for="psw"><b>Password</b></label>
                <input type="password" v-model="password" placeholder="Enter Password" name="psw" required>

                <div class="clearfix">
                    <button type="submit" class="btn">Sign Up</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";

const username = ref("");
const email = ref("");
const password = ref("");

const submitForm = async (event) => {
    event.preventDefault();
    const payload = {
        name: username.value,
        email: email.value,
        password: password.value,
    }

    await axios.get('/sanctum/csrf-cookie').then(async response => {
        await axios.post("/api/register", payload)
            .then(response => {
                if (response.data.status === "success") {
                    window.location.href = "/login";
                } else {
                    console.error(response.data.message);
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    });
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
