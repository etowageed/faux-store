<script>
import Cart from '@/components/Cart.vue';
import Account from '@/components/Account.vue'
export default {
    name: 'Header',
    components: {
        Cart, Account,
    },

    data() {
        return {
            isShowing: false,
            isShowingAvatar: false,
        }
    },
    methods: {
        toggleCart() {
            this.isShowing = !this.isShowing

        },

        toggleAvatar() {
            this.isShowingAvatar = !this.isShowingAvatar

        }
    }
}
</script>



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
                <img src="../assets/imgs/image-avatar.png" alt="" class="w-10 h-10 inline cursor-pointer"
                    @click="toggleAvatar()">
            </span>
            <Cart class="fixed top-[10%] right-[23.5%] md:right-[10%] md:top-[8%]"
                :class="{ toggleOff: !isShowing, }" />

            <Account class="fixed top-[30%] right-[29%] md:right-[7%] md:top-[10%]"
                :class="{ toggleOff: !isShowingAvatar, }" />





        </nav>
    </div>
</template>


<style>
.toggleOff {
    display: none;
}
</style>