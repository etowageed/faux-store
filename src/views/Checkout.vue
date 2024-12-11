<script>
import BtnClear from '@/components/BtnClear.vue';
import BtnSolid from '@/components/BtnSolid.vue';
import { loadStripe } from '@stripe/stripe-js';

export default {
    name: "Checkout",
    components: {
        BtnClear, BtnSolid,
    },

    data() {
        return {
            cartItems: [],
            totalPrice: 0,
            stripe: null,
            cardElement: null,
            error: null,
            success: null,
            clientSecret: null,
            isProcessing: false,
        }
    },

    async mounted() {
        this.stripe = await loadStripe("pk_test_51QUcd1AsoR3EF3WoXU8bGLklW5FcKHvUjmxNygDUghGbqiOk6z4aTFLEmXlkW84VhhPCw58FH1sNC9OY1WxdCik800CB7IOvpH")
        const elements = this.stripe.elements();
        this.cardElement = elements.create("card")
        this.cardElement.mount("#card-element");

        // fetching client service from backend

        const response = await fetch("http://localhost:5173/create-payment-intent", {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({ amount: 5000 }),
        });
        const { clientSecret } = await response.json();
        this.clientSecret = clientSecret;
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

        async payEvent() {
            this.isProcessing = true;

            const { error, paymentIntent } = await this.stripe.confirmCardpayment(this.clientSecret, {
                payment_method: {
                    card: this.cardElement,
                },
            });

            this.isProcessing = false;

            if (error) {
                this.error = error.message;
                this.success = null;
            } else if (paymentIntent.status === "succeeded") {
                this.success = "payment successful!";
                this.error = null;

            }
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
            <h1>Complete your payment</h1>
            <form class="checkout-cta px-5" @submit.prevent="payEvent">

                <p>Total ${{ totalPrice.toFixed(2) }}</p>
                <br>
                <div id="card-element"></div>
                <br>
                <BtnSolid @click="payEvent()" btnText="Pay now" v-show="totalPrice > 0" type="submit"
                    :disabled="isProcessing"></BtnSolid>


            </form>
            <BtnClear btnText="Go back to shopping" @click="goBack()"></BtnClear>

            <div v-if="error" class="error-message">{{ error }}</div>
            <div v-if="success" class="success-message">{{ success }}</div>
        </div>
    </div>
</template>



<style></style>