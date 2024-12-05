<script>
import { RouterLink, RouterView } from 'vue-router';

import Header from '../components/Header.vue'
import Products from '@/components/Products.vue';
// import { mapState, mapActions } from 'vuex';


import axios from 'axios';

export default {

    name: 'Electronics',
    components: {
        Header, Products,
    },
    data() {
        return {
            allProducts: [],
        }
    },

    methods: {
        getElectronicsProducts() {
            axios.get('https://fakestoreapi.com/products/category/electronics')
                .then((response) => {
                    console.log(response.data)
                    this.allProducts = response.data;


                })
                .catch((error) => {
                    console.log("somethings not right")
                })
        },

    },

    mounted() {
        this.getElectronicsProducts()
    },


}
</script>


<template>
    <div>

        <Header />

        <!-- declares the data prop of the consumed API to send to products component for display -->
        <keep-alive>
            <Products :allProducts="allProducts" />

        </keep-alive>
    </div>


</template>



<style></style>