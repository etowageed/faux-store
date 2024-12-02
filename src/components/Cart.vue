<script>
import BtnCheckout from './BtnCheckout.vue';


export default {
    name: 'Cart',
    components: {
        BtnCheckout,
    },
    data() {
        return {
            cartItems: '',
            totalPrice: '',
        }
    },
    methods: {
        getTotalPrice() {
            this.totalPrice = this.cartItems.reduce((sum, cartItem) => sum + cartItem.price, 0)
            console.log(this.totalPrice)
        },

        deleteCartItem(itemId) {
            // didn't use the immutable approach as it doesn't allow to add items back after deleting
            // this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== itemId);

            // used the mutable approach as it allows to delete and add items back
            const index = this.cartItems.findIndex(cartItem => cartItem.id === itemId)
            if (index !== -1) {
                this.cartItems.splice(index, 1);
            }
        }
    },

    mounted() {
        this.emitter.on('cartEvent', (data) => {
            this.cartItems = data
        });

    },
    updated() {

        this.getTotalPrice()
    }

}
</script>

<template>
    <div
        class="border border-red-300 w-[75%] md:w-96 min-h-52 shadow-lg flex flex-col justify-between py-5 rounded-md bg-white">
        <div class="cart-head border-b px-5 pb-7">
            <h3 class="font-semibold text-darkBlue">Cart</h3>

        </div>
        <div class="cart-items px-5">
            <li v-for="cartItem in cartItems" :key="cartItem">
                <div>
                    <img :src="cartItem.image" alt="" class="w-10 h-10">
                    <p>{{ cartItem.title }}</p>
                    <span>{{ cartItem.price }}</span>

                </div>
                <button @click="deleteCartItem(cartItem.id)"><img src="../assets/imgs/icon-delete.svg" alt=""></button>

            </li>
        </div>
        <p v-show="totalPrice <= 0" class="text-center font-semibold text-darkGrayishBlue">Your cart is empty</p>
        <div class="checkout-cta px-5" v-if="totalPrice > 0">
            <p>Total ${{ totalPrice }}</p>
            <BtnCheckout />
        </div>
    </div>
</template>

<style></style>