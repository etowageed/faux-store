<script>
import BtnSolid from './BtnSolid.vue';


export default {
    name: 'Cart',
    components: {
        BtnSolid,
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
            console.log(this.totalPrice)
        },

        deleteCartItem(itemId) {
            // didn't use the immutable approach as it doesn't allow to add items back after deleting
            // this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== itemId);

            // used the mutable approach as it allows to delete and add items back
            const index = this.cartItems.findIndex(cartItem => cartItem.id === itemId)
            if (index !== -1) {
                this.cartItems.splice(index, 1);
                this.saveCartToStorage();
                this.getTotalPrice();
            }
        },
        closeCart() {
            // to figure out how to implement this
        },

        checkOut() {
            this.$router.push({
                name: 'Checkout',
                params: { cartItems: JSON.parse(JSON.stringify(this.cartItems)) },
            });
        },
    },

    mounted() {
        this.loadCartFromStorage();
        this.emitter.on('cartEvent', (data) => {
            this.cartItems = data;
        });
    },

    updated() {
        this.getTotalPrice();
        this.emitter.emit('cartCountEvent', this.cartCount)




    },
    computed: {
        cartCount() {
            return this.cartItems.reduce((total, item) => total + item.count, 0);
        }

    }

}
</script>

<template>
    <div id="cart"
        class="border border-red-300 w-[75%] md:w-96 min-h-52 shadow-lg flex flex-col justify-between py-5 rounded-md bg-white">
        <div class="cart-head border-b px-5 pb-7">
            <h3 class="font-semibold text-darkBlue">Cart</h3>
            <img src="../assets/imgs/icon-close.svg" alt="" srcset="" @click="closeCart()" class="cursor-pointer">
        </div>
        <div class="cart-items px-5">
            <li v-for="cartItem in cartItems" :key="cartItem">
                <div>
                    <img :src="cartItem.image" alt="" class="w-10 h-10">
                    <p>{{ cartItem.title }} (x{{ cartItem.count }})</p>
                    <span>${{ (cartItem.price * cartItem.count).toFixed(2) }}</span>

                </div>
                <button @click="deleteCartItem(cartItem.id)" class="cursor-pointer"><img
                        src="../assets/imgs/icon-delete.svg" alt=""></button>

            </li>
        </div>
        <p v-show="totalPrice <= 0" class="text-center font-semibold text-darkGrayishBlue">Your cart is empty</p>
        <div class="checkout-cta px-5" v-if="totalPrice > 0">
            <p>Total ${{ totalPrice.toFixed(2) }}</p>
            <BtnSolid @click="checkOut()" btnText="Checkout"></BtnSolid>
        </div>
    </div>
</template>

<style></style>