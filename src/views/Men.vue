<script>

import Header from '../components/Header.vue'
import Products from '@/components/Products.vue';
import axios from 'axios';


export default {
    name: 'Men',
    components: {
        Header, Products,
    },
    data() {
        return {
            products: [],
        }
    },

    methods: {
        getMenProducts() {
            axios.get(`https://fakestoreapi.com/products/category/${"men's clothing"}`)
                .then((response) => {
                    console.log(response.data)

                    this.products = response.data
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
        <keep-alive>
            <Products :products="products" />

        </keep-alive>
    </div>

</template>



<style></style>