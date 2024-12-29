<script>
import BtnSolid from '@/components/BtnSolid.vue';
import BtnClear from '@/components/BtnClear.vue';


export default {
    name: 'Products',
    components: {
        BtnSolid, BtnSolid, BtnClear,
    },
    data() {
        return {
            cartItems: [],
            // detailsAddToCart: ''
            count: 1,
        }
    },

    // takes in a data prop from all the product views
    props: {
        products: {
            type: Array,
            required: true
        },
    },



    methods: {
        viewDetails(productId) {
            this.$router.push({ name: 'detailsPage', params: { id: productId } })
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
            this.$root.showToast('Item added to cart!', 'success')

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
    <!-- products display across various views -->
    <div id="container-products"
        class="border border-red-600 p-5 gap-6 flex flex-wrap mx-auto lg:w-3/4 xl:w-4/5 2xl:w-1/2">


        <!-- single product -->
        <div v-for=" (product, index ) in products" :key="index"
            class="border rounded-md grow w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-3 flex justify-between flex-col">


            <!-- item image -->
            <div class="p-5">
                <img :src="product.image" :alt="product.title" class="md:w-40 md:h-52 mx-auto cursor-pointer"
                    @click="viewDetails(product.id)">

            </div>

            <!-- item details -->
            <div class="space-y-3">
                <p class="text-primaryCol font-medium">{{ product.category }}</p>
                <p class="text-darkBlue font-bold text-lg text-wrap">{{ product.title }}</p>
                <p class="text-darkBlue font-bold ">${{ product.price }}</p>
            </div>

            <!-- cta buttons -->

            <div class="flex space-x-4 my-3">
                <BtnSolid @click="addToCart(product)" btnText="Add to cart" icon="/icon-cart.svg"></BtnSolid>

                <BtnClear btnText="Details" @click="viewDetails(product.id)"></BtnClear>
            </div>

        </div>

    </div>


</template>

<style></style>