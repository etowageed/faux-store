<script>
import axios from 'axios';
import BtnCart from '@/components/BtnCart.vue';
import Header from '@/components/Header.vue'
import BtnCounter from '@/components/BtnCounter.vue';


export default {

    components: {
        BtnCart, Header, BtnCounter,
    },
    data() {
        return {
            productDetails: '',
            detailsAddToCart: ''

        }
    },
    created() {
        const productId = this.$route.params.id;
        this.loadSingleProduct(productId);
        this.emitter.on('addCartEvent', (data) => {
            this.addToCart = data;
        })

    },

    methods: {
        loadSingleProduct(id) {
            axios.get(`https://fakestoreapi.com/products/${id}`)
                .then((res) => {
                    console.log(res.data)
                    this.productDetails = res.data
                })
                .catch((error) => {
                    console.log(`something's not right`)
                })
        },

        emitDetailsAddToCart() {
            this.emitter.emit('detailsAddToCart', this.detailsAddToCart)
        },

        goBack() {
            this.$router.go(-1)
        },

    },

    mounted() {
        this.emitDetailsAddToCart()
    }

}
</script>


<template>
    <Header />
    <div class="lg:w-1/3 mx-auto md:flex border border-red-500">
        <div class="md:w-1/3 lg:w-1/2">
            <img :src="productDetails.image" alt="" srcset="" class="w-full ">
        </div>

        <div class="lg:w-1/2 flex flex-col justify-between">
            <p>{{ productDetails.category }}</p>
            <p>{{ productDetails.title }}</p>
            <p>{{ productDetails.description }}</p>
            <p>{{ productDetails.price }}</p>
            <BtnCounter class="mr-3" />
            <BtnCart @click="addToCart()" />
        </div>
    </div>



</template>



<style></style>