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
        getWomenProducts() {
            axios.get(`https://fakestoreapi.com/products/category/${"women's clothing"}`)
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
        this.getWomenProducts()
    }
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