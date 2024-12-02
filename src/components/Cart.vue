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
            totalPrice: ''
        }
    },
    methods: {
        getTotalPrice() {
            this.totalPrice = this.cartItems.reduce((sum, cartItem) => sum + cartItem.price, 0)
            console.log(this.totalPrice)
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

                    <button><img src="../assets/imgs/icon-delete.svg" alt=""></button>
                </div>

            </li>
        </div>
        <div class="checkout-cta px-5">
            <p>Total {{ totalPrice }}</p>
            <BtnCheckout />
        </div>
    </div>
</template>

<style></style>