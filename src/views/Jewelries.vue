<script>

import Header from '../components/Header.vue'
import Products from '@/components/Products.vue';

import axios from 'axios';
export default {

    name: 'Jewelries',
    components: {
        Header, Products,
    },
    data() {
        return {
            products: [],
        }
    },
    methods: {
        getJeweleryProducts() {
            axios.get('https://fakestoreapi.com/products/category/jewelery')
                .then((response) => {
                    console.log(response.data)

                    this.products = response.data
                })
                .catch((error) => {
                    console.log("somethings not right")
                })
        }
    },

    mounted() {
        this.getJeweleryProducts()
    }
}
</script>


<template>
    <div>
        <Header />
        <keep-alive>
            <Products :products="products" />

        </keep-alive>
    </div>

</template>



<style></style>