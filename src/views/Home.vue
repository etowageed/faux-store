<script>
import { RouterLink, RouterView } from 'vue-router';
import Header from '../components/Header.vue'
import Products from '../components/Products.vue';

import axios from 'axios';


export default {
    components: {
        Header, Products,
    },

    data() {
        return {
            allProducts: [],
        }
    },

    methods: {
        getProducts() {
            axios.get('https://fakestoreapi.com/products')
                .then((response) => {

                    this.allProducts = response.data

                    console.log(this.allProducts)

                })

                .catch((error) => {
                    console.log("something wrong")
                })
        }

    },

    mounted() {
        this.getProducts()
    },

    updated() {

    },


}

</script>


<template>
    <div>
        <Header />
        <Products :allProducts="allProducts" />
    </div>

    <RouterView />
</template>



<style></style>