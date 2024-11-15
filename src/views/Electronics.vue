<script>
import { RouterLink, RouterView } from 'vue-router';

import Header from '../components/Header.vue'
import Products from '@/components/Products.vue';

import axios from 'axios';

export default {
    components: {
        Header, Products,
    },
    data() {
        return {
            allProducts: '',
        }
    },
    methods: {
        getElectronicsProducts() {
            axios.get('https://fakestoreapi.com/products/category/electronics')
                .then((response) => {
                    console.log(response.data)
                    this.allProducts = response.data
                })
                .catch((error) => {
                    console.log("somethings not right")
                })
        }
    },

    mounted() {
        this.getElectronicsProducts()
    }
}
</script>


<template>
    <div>

        <Header />
        <h1>this is the electronics page</h1>
        <Products :allProducts="allProducts" />
    </div>

    <RouterView />
</template>



<style></style>