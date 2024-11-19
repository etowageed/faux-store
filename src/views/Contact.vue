<script>
import { RouterLink, RouterView } from 'vue-router';

import Header from '../components/Header.vue'


export default {
    name: 'Contact',
    components: {
        Header,
    }
}
</script>


<template>
    <div>

        <Header />
        <h1>this is the contact page</h1>
    </div>

    <RouterView />
</template>



<style></style>