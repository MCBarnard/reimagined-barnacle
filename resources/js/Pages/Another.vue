<template>
    <div>
        This is another page
        <br>
        <button @click="setNameToBob">
            Update To Bob
        </button>
    </div>
</template>

<script setup>
import {useStore} from "vuex";
const store = useStore();

const setNameToBob = () => store.dispatch("ACTION_SET_USERNAME", 'bob');
</script>
