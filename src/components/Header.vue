<template>
    <div class="border-b py-10">
        <nav class="md:w-3/4 flex justify-between mx-auto items-baseline">
            <span>
                <img src="../assets/imgs/logo.svg" alt="Sneakers Logo">
            </span>

            <span class="space-x-5 text-base">
                <RouterLink to="/">Collections</RouterLink>
                <RouterLink to="/men">Men</RouterLink>
                <RouterLink to="/women">Women</RouterLink>
                <RouterLink to="/jewelries">Jewelries</RouterLink>
                <RouterLink to="/electronics">Electronics</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/contact">Contact</RouterLink>
            </span>



            <span class="flex justify-between w-28">
                <img src="../assets/imgs/icon-cart.svg" alt="cart icon" class="w-5 h-5 my-auto cursor-pointer"
                    @click="toggleCart">
                <img src="../assets/imgs/image-avatar.png" alt="" class="w-10 h-10 inline">
            </span>
            <Cart class="fixed right-[10%] top-[7%]" :class="{ toggleOff: !isShowing, }" />



        </nav>
    </div>
</template>

<script>
import Cart from '@/components/Cart.vue';

export default {
    components: {
        Cart,
    },

    data() {
        return {
            isShowing: false,
        }
    },
    methods: {
        toggleCart() {
            this.isShowing = !this.isShowing

        }
    }
}
</script>

<style>
.toggleOff {
    display: none;
}
</style>