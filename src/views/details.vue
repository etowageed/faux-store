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
            detailsAddToCart: '',
            cartItems: [],
            quantity: 1,

        }
    },
    created() {
        const productId = this.$route.params.id;
        this.loadSingleProduct(productId);

    },

    methods: {
        loadSingleProduct(id) {
            axios.get(`https://fakestoreapi.com/products/${id}`)
                .then((res) => {
                    console.log(res.data)
                    this.productDetails = res.data
                })
                .catch((error) => {
                    console.log(`something's not right`, error)
                })
        },
        updateQuantity(count) {
            this.quantity = count;
        },
        addToCart(productDetails) {
            const cartItem = {
                id: productDetails.id,
                image: productDetails.image,
                title: productDetails.title,
                price: productDetails.price,
                quantity: this.quantity,
            };

            // checking if product already exists in cart
            const existingItemIndex = this.cartItems.findIndex(item => item.id === cartItem.id);

            if (existingItemIndex !== -1) {
                // if item exists, update it's quantity
                this.cartItems[existingItemIndex].quantity += this.quantity;
            } else {
                this.cartItems.push(cartItem);

            }
            this.saveCartToStorage();

            // reset the quantity to 1 after adding to cart
            this.quantity = 1;

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
            <img :src="productDetails.image" alt="" srcset="" class="w-full ">
        </div>

        <div class="lg:w-1/2 flex flex-col justify-between">
            <p>{{ productDetails.category }}</p>
            <p>{{ productDetails.title }}</p>
            <p>{{ productDetails.description }}</p>
            <p>{{ productDetails.price }}</p>
            <BtnCounter @updateCount="updateQuantity" class="mr-3" />
            <BtnCart @click="addToCart(productDetails)" />


        </div>
    </div>



</template>



<style></style>