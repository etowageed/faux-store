<script>
import BtnClear from '@/components/BtnClear.vue';
import BtnSolid from '@/components/BtnSolid.vue';
import axios from 'axios';

export default {
    name: "Checkout",
    components: {
        BtnClear, BtnSolid,
    },

    data() {
        return {
            cartItems: [],
            totalPrice: 0,
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
                // this doesnt save to storage because we want the original cart item intact in the cart after deleting items
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
            try {
                const response = await axios.post("http://localhost:3000/create-checkout-session", {
                    items: this.cartItems.map((item) => ({
                        id: item.id,
                        quantity: item.count,
                        price: item.price,
                        title: item.title,
                        image: item.image,
                    }))
                })
                if (response.data.url) {
                    window.location = response.data.url
                }
            } catch (error) {
                console.error("error creating session:", error.response ? error.response.data : error)

                alert("unable to process payment. please try again");
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
    },


}
</script>

<template>
    <div class="px-5">
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
            <h1 class="text-3xl">Complete your payment</h1>

            <p>Total ${{ totalPrice.toFixed(2) }}</p>

            <BtnSolid @click="payEvent()" btnText="Pay now" v-show="totalPrice > 0" type="submit" target="_blank">
            </BtnSolid>


            <BtnClear btnText="Go back to shopping" @click="goBack()"></BtnClear>
            <p>{{ transactionId }}</p>

        </div>



    </div>
</template>



<style></style>