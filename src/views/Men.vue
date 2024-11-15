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
        getMenProducts() {
            axios.get(`https://fakestoreapi.com/products/category/${"men's clothing"}`)
                .then((response) => {
                    console.log(response.data)

                    this.allProducts = response.data
                })

                .catch((error) => {
                    console.log('somehting not right')
                })
        }
    },

    mounted() {
        this.getMenProducts()
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