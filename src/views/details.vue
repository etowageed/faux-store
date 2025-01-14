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
    <!-- content -->

    <div id="detailsContent"
        class="mx-auto md:w-4/5 xl:w-2/5 flex flex-col md:flex-row p-3 justify-between space-y-10 md:items-center">
        <!-- product image -->
        <div id="imageDiv" class="xl:w-2/5">
            <img :src="product.image" alt="" srcset="" class="w-3/5 md:w-full mx-auto cursor-pointer"
                @click="toggleLightBox()">

            <div class=" flex w-4/5 mx-auto justify-between mt-5">
                <img :src="product.image" alt="" srcset="" class=" h-14 w-14 cursor-pointer" @click="toggleLightBox()">
                <img :src="product.image" alt="" srcset="" class=" h-14 w-14 cursor-pointer" @click="toggleLightBox()">
                <img :src="product.image" alt="" srcset="" class=" h-14 w-14 cursor-pointer" @click="toggleLightBox()">
                <img :src="product.image" alt="" srcset="" class=" h-14 w-14 cursor-pointer" @click="toggleLightBox()">

            </div>
        </div>

        <!-- text/button content -->
        <div class="lg:w-1/2 md:py-60 flex flex-col space-y-5 md:space-y-10 p-5">
            <div>
                <p class="font-bold text-s text-textCol opacity-65">{{ product.category }}</p>
                <p class="text-darkBlue font-bold text-2xl text-wrap mt-2 md:mt-5 mb-5 md:mb-10">{{ product.title }}</p>
                <p class="text-textCol text-base mb-5">{{ product.description }}</p>

                <div class="flex justify-between items-baseline">
                    <span class="space-x-4">
                        <span class="text-darkBlue font-bold text-xl">${{ product.price }}</span> <span
                            class="text-xs font-bold rounded p-1 text-white bg-darkBlue">50%</span>

                    </span>
                    <span v-if="product.price" class="line-through text-textCol text-sm font-bold inline">$250.00</span>

                </div>
            </div>

            <div class="space-y-4 md:space-y-0 md:flex">
                <BtnCounter @countEvent="count = $event" class="w-full md:w-2/3 md:mr-3 py-3 px-3" />
                <BtnSolid @click="addToCart(product)" btnText="Add to cart" icon="/icon-cart.svg"></BtnSolid>

            </div>

        </div>
    </div>
    <!-- lightbox -->

    <div v-if="lightBoxImgs.length" :class="{ lightbox: !isActive }" class="fixed flex z-40 top-0 w-full h-full"
        @click="toggleLightBox()">
        <!-- overlay -->
        <div class="absolute top-0 left-0 w-full h-full bg-black opacity-95">

        </div>


        <!-- overlay content -->
        <!-- click.stop prevents the event from the image propagation to the parent lightbox div -->

        <div class="relative md:w-2/4 xl:w-1/3 2xl:w-1/5 mx-auto my-auto space-y-14">
            <div class="p-6 bg-white">
                <transition name=" slide" mode="out-in">
                    <img :key="currentimageIndex" :src="lightBoxImgs[currentimageIndex]" @click.stop>
                </transition>

                <button @click.stop="prevImage()" :disabled="currentimageIndex === lightBoxImgs.length - 0"
                    class="absolute left-2 bg-white top-1/3 transform translate-y-1/2 border border-primaryCol rounded-full p-4"><img
                        src="../assets/imgs/icon-previous.svg" alt="" srcset=""></button>

                <button @click.stop="nextImage()" :disabled="currentimageIndex === lightBoxImgs.length - 1"
                    class="absolute right-2 bg-white top-1/3 transform translate-y-1/2 border border-primaryCol rounded-full p-4"><img
                        src="../assets/imgs/icon-next.svg" alt="" srcset=""></button>

            </div>


            <div class=" p-2 flex w-5/6 md:w-full mx-auto justify-between">

                <img :src="product.image" alt="" srcset="" class=" h-14 w-14 md:h-20 md:w-20 cursor-pointer"
                    @click="toggleLightBox()" :class="{ isSelected: currentimageIndex === 0 }">
                <img :src="product.image" alt="" srcset="" class=" h-14 w-14 md:h-20 md:w-20 cursor-pointer"
                    @click="toggleLightBox()" :class="{ isSelected: currentimageIndex === 1 }">
                <img :src="product.image" alt="" srcset="" class=" h-14 w-14 md:h-20 md:w-20 cursor-pointer"
                    @click="toggleLightBox()" :class="{ isSelected: currentimageIndex === 2 }">
                <img :src="product.image" alt="" srcset="" class=" h-14 w-14 md:h-20 md:w-20 cursor-pointer"
                    @click="toggleLightBox()" :class="{ isSelected: currentimageIndex === 3 }">

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