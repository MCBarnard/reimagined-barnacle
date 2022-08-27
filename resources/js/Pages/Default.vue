<template>
    <div>
        This is the default page
        <br>
        <button @click="setNameToSam">
            Update To Sam
        </button>
    </div>
</template>

<script setup>
import {useStore} from "vuex";
const store = useStore();
const setNameToSam = () => store.dispatch("ACTION_SET_USERNAME", 'sam');
</script>
