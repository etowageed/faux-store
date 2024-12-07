<script>
import Header from '../components/Header.vue'
import Products from '../components/Products.vue';

import axios from 'axios';


export default {

    name: 'Home',
    components: {
        Header, Products,
    },

    data() {
        return {
            products: [],
        }
    },

    methods: {
        getProducts() {
            axios.get('https://fakestoreapi.com/products')
                .then((response) => {

                    this.products = response.data

                    console.log(this.products)

                })

                .catch((error) => {
                    console.log("something wrong")
                })
        }

    },

    mounted() {
        this.getProducts()
    },
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