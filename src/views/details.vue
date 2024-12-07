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
            product: {},
            cartItems: [],
            count: 1,

        }
    },


    methods: {
        loadSingleProduct(id) {
            axios.get(`https://fakestoreapi.com/products/${id}`)
                .then((res) => {
                    console.log(res.data)
                    this.product = res.data
                })
                .catch((error) => {
                    console.log(`something's not right`, error)
                })
        },

        addToCart(product) {
            const existingItem = this.cartItems.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.count += this.count;
            } else {
                this.cartItems.push({
                    id: product.id,
                    image: product.image,
                    title: product.title,
                    price: product.price,
                    count: this.count,
                });

            }
            this.saveCartToStorage();

            console.log(this.cartItems)
        },

        saveCartToStorage() {
            localStorage.setItem('cart_Items_key', JSON.stringify(this.cartItems));
        },
        loadCartFromStorage() {
            const savedCart = localStorage.getItem('cart_Items_key');
            if (savedCart) {
                this.cartItems = JSON.parse(savedCart);
            }
        },

        emitCartItems() {
            this.emitter.emit('cartEvent', this.cartItems)
        },


        goBack() {
            this.$router.go(-1)
        },

    },

    created() {
        const productId = this.$route.params.id;
        this.loadSingleProduct(productId);

    },

    mounted() {
        this.loadCartFromStorage(),
            this.emitCartItems()
    }

}
</script>


<template>
    <Header />
    <div class="lg:w-1/3 mx-auto md:flex border border-red-500">
        <div class="md:w-1/3 lg:w-1/2">
            <img :src="product.image" alt="" srcset="" class="w-full ">
        </div>

        <div class="lg:w-1/2 flex flex-col justify-between">
            <p>{{ product.category }}</p>
            <p>{{ product.title }}</p>
            <p>{{ product.description }}</p>
            <p>${{ product.price }}</p>
            <BtnCounter @countEvent="count = $event" class="mr-3" />
            <BtnCart @click="addToCart(product)" />


        </div>
    </div>



</template>



<style></style>