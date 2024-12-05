<script>
import BtnCart from '@/components/BtnCart.vue';
import BtnCheckout from '@/components/BtnCheckout.vue';
import BtnClear from '@/components/BtnClear.vue';


export default {
    name: 'Products',
    components: {
        BtnCart, BtnCheckout, BtnClear,
    },
    data() {
        return {
            cartItems: [],
            // detailsAddToCart: ''
        }
    },

    // takes in a data prop from all the product views
    props: {
        allProducts: {
            type: Array,
            required: true
        },
    },



    methods: {
        viewDetails(productId) {
            this.$router.push({ name: 'detailsPage', params: { id: productId } })
        },
        addToCart(product) {
            const cartItem = {
                id: product.id,
                image: product.image,
                title: product.title,
                price: product.price
            }
            this.cartItems.push(cartItem);
            this.saveCartToStorage();
            console.log(this.cartItems)
        },

        emitCartItems() {
            this.emitter.emit('cartEvent', this.cartItems)
        },

        saveCartToStorage() {
            localStorage.setItem('cart_Items_key', JSON.stringify(this.cartItems));
        },
        loadCartFromStorage() {
            const savedCart = localStorage.getItem('cart_Items_key');
            if (savedCart) {
                this.cartItems = JSON.parse(savedCart);
            }
        }

    },

    mounted() {

        this.loadCartFromStorage();
        this.emitCartItems();

    }
}

</script>

<template>
    <div class="border border-red-600 lg:w-1/3 md:flex md:flex-wrap mx-auto">
        <div v-for="(product, index ) in allProducts" :key="product.id"
            class="border border-primaryCol grow md:w-1/3 m-6 p-3 flex justify-between flex-col">

            <div class="border border-red-600">
                <img :src="product.image" :alt="product.title" class="md:w-40 md:h-52 mx-auto cursor-pointer"
                    @click="viewDetails(product.id)">

            </div>

            <div>
                <p class="text-primaryCol font-medium">{{ product.category }}</p>
                <p class="text-darkBlue font-bold text-lg">{{ product.title }}</p>
                <p class="text-darkBlue font-bold ">{{ product.price }}</p>
            </div>

            <div class="flex space-x-4">

                <BtnCart @click="addToCart(product)" />

                <BtnClear @click="viewDetails(product.id)" />

            </div>

        </div>

    </div>


</template>

<style></style>