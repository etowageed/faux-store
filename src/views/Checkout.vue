<script>
import BtnClear from '@/components/BtnClear.vue';
import BtnSolid from '@/components/BtnSolid.vue';
import { onDeactivated } from 'vue';
export default {
    name: "Checkout",
    components: {
        BtnClear, BtnSolid,
    },

    data() {
        return {
            cartItems: [],
            totalPrice: 0,
            // count: '',
        }
    },
    methods: {
        loadCartFromStorage() {
            const savedCart = localStorage.getItem('cart_Items_key');
            if (savedCart) {
                this.cartItems = JSON.parse(savedCart);
            }
        },

        saveCartToStorage() {
            localStorage.setItem('cart_Items_key', JSON.stringify(this.cartItems));
        },

        getTotalPrice() {
            this.totalPrice = this.cartItems.reduce((sum, cartItem) => sum + (cartItem.price * cartItem.count), 0)

        },
        deleteCartItem(itemId) {
            const index = this.cartItems.findIndex(cartItem => cartItem.id === itemId)
            if (index !== -1) {
                this.cartItems.splice(index, 1);
                // this doesnt save to storage because we want the original cart item intact in the cart
                // this.saveCartToStorage();
                this.getTotalPrice();
            }
        },

        incrementItem(cartItem) {
            cartItem.count++;
            this.saveCartToStorage();
            this.getTotalPrice();
        },

        decrementItem(cartItem) {

            if (cartItem.count > 1) {
                cartItem.count--;
                this.saveCartToStorage();
                this.getTotalPrice();
            }
            else {
                this.deleteCartItem(cartItem.id);
            }


        },

        goBack() {
            this.$router.go(-1)
        },
        payEvent() {

        }
    },
    created() {
        if (this.$route.params.cartItems) {
            this.cartItems = this.$route.params.cartItems;

        } else {
            this.loadCartFromStorage();
        }

        this.getTotalPrice();
    }
}
</script>

<template>
    <div>
        <h1>Order Summary</h1>
        <div id="summary">
            <li v-for="cartItem in cartItems" :key="cartItem.id">
                <div>
                    <img :src="cartItem.image" alt="" class="w-10 h-10">
                    <p>{{ cartItem.title }} (x{{ cartItem.count }})</p>
                    <span>${{ (cartItem.price * cartItem.count).toFixed(2) }}</span>

                </div>
                <button @click="decrementItem(cartItem)">-</button>
                <span class="px-5">{{ cartItem.count }}</span>
                <button @click="incrementItem(cartItem)">+</button>

            </li>


        </div>

        <div id="payment">
            <div class="checkout-cta px-5">
                <p>Total ${{ totalPrice.toFixed(2) }}</p>
                <BtnSolid @click="payEvent()" btnText="Pay now" v-show="totalPrice > 0"></BtnSolid>
            </div>
            <BtnClear btnText="Go back to shopping" @click="goBack()"></BtnClear>

        </div>
    </div>
</template>



<style></style>