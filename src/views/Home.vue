<script>
import { RouterLink, RouterView } from 'vue-router';
import Header from '../components/Header.vue'
import axios from 'axios';


export default {
    components: {
        Header,
    },

    data() {
        return {
            allProducts: '',
        }
    },

    methods: {
        getProducts() {
            axios.get('https://fakestoreapi.com/products')
                .then((response) => {
                    console.log(response.data)

                    this.allProducts = response.data
                })

                .catch((error) => {
                    console.log("something wrong")
                })
        }

    },

    mounted() {
        this.getProducts()
    }
}

</script>


<template>
    <div>

        <Header />
        <h1>this is the Home page</h1>

        <div class="flex flex-wrap md:w-4/5 mx-auto border">
            <div v-for="(product, index ) in allProducts" :key="index"
                class="md:w-1/6 m-10 border border-primaryCol flex-grow">
                <p>{{ product.id }}</p>
                <p>{{ product.title }}</p>
                <p>{{ product.price }}</p>
                <p>{{ product.category }}</p>
                <p>{{ product.description }}</p>
                <img :src="product.image" :alt="product.title">
            </div>
        </div>


    </div>

    <RouterView />
</template>



<style></style>