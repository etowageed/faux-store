<script>
import { RouterLink, RouterView } from 'vue-router';

import Header from '../components/Header.vue'


export default {
    name: 'About',
    components: {
        Header,
    }
}
</script>


<template>
    <div>

        <Header />
        <h1>this is the about page</h1>
    </div>

    <RouterView />
</template>



<style></style>