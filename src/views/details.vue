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
            // this adds the toast to this component
            this.$root.showToast('Item added to cart!', 'success')

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

    <div v-if="lightBoxImgs.length" :class="{ lightbox: !isActive }" class="fixed flex z-40 top-0 w-full h-full"
        @click="toggleLightBox()">
        <!-- overlay -->
        <div class="absolute top-0 left-0 w-full h-full bg-black opacity-95">

        </div>


        <!-- lightbox -->
        <!-- click.stop prevents the event from the image propagation to the parent lightbox div -->

        <div class="relative mx-auto my-auto w-3/5 md:w-2/6 lg:w-2/12 space-y-14">
            <div class="p-6 bg-white ">
                <transition name=" slide" mode="out-in">
                    <img :key="currentimageIndex" :src="lightBoxImgs[currentimageIndex]" @click.stop>
                </transition>
                <BtnClear btnText=" prev" @click.stop="prevImage()" :disabled="currentimageIndex === 0"
                    class="absolute left-0 top-1/2 transform translate-y-1/2" />
                <BtnClear btnText="next" @click.stop="nextImage()"
                    :disabled="currentimageIndex === lightBoxImgs.length - 1"
                    class="absolute right-0 top-1/2 transform translate-y-1/2" />

            </div>
            <div class=" flex justify-center space-x-10">
                <img :src="product.image" alt="" srcset="" class=" h-24 w-24 cursor-pointer" @click="toggleLightBox()"
                    :class="{ isSelected: currentimageIndex === 0 }">
                <img :src="product.image" alt="" srcset="" class=" h-24 w-24 cursor-pointer" @click="toggleLightBox()"
                    :class="{ isSelected: currentimageIndex === 1 }">
                <img :src="product.image" alt="" srcset="" class=" h-24 w-24 cursor-pointer" @click="toggleLightBox()"
                    :class="{ isSelected: currentimageIndex === 2 }">
                <img :src="product.image" alt="" srcset="" class=" h-24 w-24 cursor-pointer" @click="toggleLightBox()"
                    :class="{ isSelected: currentimageIndex === 3 }">

            </div>


        </div>



    </div>



</template>



<style scoped>
.lightbox {
    display: none;

}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.5s;
    /* position: absolute; */
    /* width: 100%; */
}

.slide-enter {
    transform: translateX(100%);
}

.slide-leave-to {
    transform: translateX(-50%);
}

.isSelected {
    border: 3px solid hsl(26, 100%, 55%);
    opacity: 0.2;
    border-radius: 10%;
}
</style>