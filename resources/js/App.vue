<template>
    <div>
        <router-link :to="{name: 'default'}">
            Default Route
        </router-link>
        |
        <router-link :to="{name: 'another'}">
            Another Route
        </router-link>
        |
        <span v-if="!signedIn" >
            <router-link :to="{name: 'login'}">
                Login
            </router-link>
            |
            <router-link :to="{name: 'register'}">
                Register
            </router-link>
        </span>
        <button @click="signOut" v-if="signedIn">
            Sign Out
        </button>
        <hr style="background: #1a202c; height:1px;">
        {{ store.getters.userName }}
        <hr style="background: #1a202c; height:1px;">
        <router-view />
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from "vue";
import { useRouter } from 'vue-router';
import axios from "axios";

const store = useStore();
const router = useRouter();

const signedIn = computed(() => store.getters.userAuthenticated);
const signOut = async () => {
    await axios.post("/api/logout").then(response => {
        if (response.data.status === "success") {
            window.Authentication.logged_in = false;
            window.Authentication.user = undefined;
            store.dispatch("ACTION_SET_USER_AUTHENTICATED", false);
            store.dispatch("ACTION_SET_AUTHENTICATED_USER_DATA", undefined);
            router.push({name: "default"});
        }
    })
}
</script>
