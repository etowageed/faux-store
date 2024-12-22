<script>
import axios from 'axios';
import BtnSolid from '@/components/BtnSolid.vue';
import Header from '@/components/Header.vue'
import BtnCounter from '@/components/BtnCounter.vue';
import BtnClear from '@/components/BtnClear.vue';


export default {

    components: {
        BtnSolid, Header, BtnCounter, BtnClear,
    },
    data() {
        return {
            product: {},
            cartItems: [],
            count: 1,
            isActive: false,
            lightBoxImgs: [

            ],
            currentimageIndex: 0,

        }
    },


    methods: {
        loadSingleProduct(id) {
            axios.get(`https://fakestoreapi.com/products/${id}`)
                .then((res) => {
                    console.log(res.data)
                    this.product = res.data;

                    // since we have just one image per product and want to duplicate into 4 on the lightbox
                    this.lightBoxImgs = Array(4).fill(this.product.image)
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

        toggleLightBox() {
            this.isActive = !this.isActive
        },

        toggleLightBoxDiv() {
            this.isActive = !this.isActive;


        },
        nextImage() {
            if (this.currentimageIndex < this.lightBoxImgs.length - 1) {
                this.currentimageIndex++;
            }
        },
        prevImage() {
            if (this.currentimageIndex > 0) {
                this.currentimageIndex--;
            }
        }



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
            <img :src="product.image" alt="" srcset="" class="w-full cursor-pointer" @click="toggleLightBox()">

            <div class=" flex justify-between">
                <img :src="product.image" alt="" srcset="" class=" h-14 w-14 cursor-pointer" @click="toggleLightBox()">
                <img :src="product.image" alt="" srcset="" class=" h-14 w-14 cursor-pointer" @click="toggleLightBox()">
                <img :src="product.image" alt="" srcset="" class=" h-14 w-14 cursor-pointer" @click="toggleLightBox()">
                <img :src="product.image" alt="" srcset="" class=" h-14 w-14 cursor-pointer" @click="toggleLightBox()">

            </div>
        </div>

        <div class="lg:w-1/2 flex flex-col justify-between">
            <p>{{ product.category }}</p>
            <p>{{ product.title }}</p>
            <p>{{ product.description }}</p>
            <p>${{ product.price }}</p>
            <BtnCounter @countEvent="count = $event" class="mr-3" />
            <BtnSolid @click="addToCart(product)" btnText="Add to cart" icon="/icon-cart.svg"></BtnSolid>


        </div>
    </div>
    <!-- lightbox -->

    <div :class="{ lightbox: !isActive }" class="fixed flex z-50 top-0 w-full h-full bg-neutral-600 opacity-95"
        @click="toggleLightBoxDiv()">

        <!-- click.stop prevents the event from the image propagation to the parent lightbox div -->
        <img :src="lightBoxImgs[currentimageIndex]" class="w-80 h-80 mx-auto my-auto" @click.stop>

        <div @click.stop>
            <BtnClear btnText="prev" @click="prevImage()" :aria-disabled="currentimageIndex === 0" />
            <BtnClear btnText="next" @click="nextImage()" :disabled="currentimageIndex === lightBoxImgs.length - 1" />
        </div>
    </div>



</template>



<style>
.lightbox {
    display: none;

}
</style>