<script>
import Cart from '@/components/Cart.vue';
import Account from '@/components/Account.vue'
import CartBadge from '@/components/CartBadge.vue';
export default {
    name: 'Header',
    components: {
        Cart, Account, CartBadge,
    },

    data() {
        return {
            isShowing: false,
            isShowingAvatar: false,
            isShowingSideNav: false,
        }
    },
    methods: {
        toggleCart() {
            this.isShowing = !this.isShowing

        },

        toggleAvatar() {
            this.isShowingAvatar = !this.isShowingAvatar

        },

        toggleSideNav() {
            this.isShowingSideNav = !this.isShowingSideNav

        }
    }
}
</script>



<template>
    <!-- side nav -->

    <div id="container_sideNav" class="md:hidden" :class="{ toggleOff: !isShowingSideNav }">
        <div id="mobile_nav" class="bg-white w-2/3 h-full p-5 fixed z-50">
            <div id="close_sideNav">
                <img class="cursor-pointer" src="../assets/imgs/icon-close.svg" alt="" srcset=""
                    @click="toggleSideNav()">
            </div>
            <nav class="mt-12">
                <span class="font-bold flex flex-col space-y-5">
                    <RouterLink to="/">Collections</RouterLink>
                    <RouterLink to="/men">Men</RouterLink>
                    <RouterLink to="/women">Women</RouterLink>
                    <RouterLink to="/jewelries">Jewelries</RouterLink>
                    <RouterLink to="/electronics">Electronics</RouterLink>
                    <RouterLink to="/about">About</RouterLink>
                    <RouterLink to="/contact">Contact</RouterLink>
                </span>
            </nav>

        </div>

        <!-- overlay -->
        <div class="fixed top-0 left-0 w-full h-screen bg-black opacity-95 z-40">

        </div>
    </div>



    <!-- header -->
    <div id="header_items" class="border-b p-3 md:py-5 md:px-10 flex justify-between bg-white w-full">

        <!-- hamburger menu -->

        <div id="hamburger_icon" class="items-center p-3 border cursor-pointer md:hidden">
            <img src="../assets/imgs/icon-menu.svg" alt="" srcset="" @click="toggleSideNav()">
        </div>

        <!-- logo -->
        <div id="logo" class=" items-baseline p-3">
            <RouterLink to="/">
                <img src="../assets/imgs/logo.svg" alt="Sneakers Logo">

            </RouterLink>
        </div>


        <!-- nav links -->
        <nav class="hidden md:block p-3 text-center">
            <span class="space-x-5 text-base font-semibold">
                <RouterLink to="/" @click="toggleSideNav()">Collections</RouterLink>
                <RouterLink to="/men" @click="toggleSideNav()">Men</RouterLink>
                <RouterLink to="/women" @click="toggleSideNav()">Women</RouterLink>
                <RouterLink to="/jewelries" @click="toggleSideNav()">Jewelries</RouterLink>
                <RouterLink to="/electronics" @click="toggleSideNav()">Electronics</RouterLink>
                <RouterLink to="/about" @click="toggleSideNav()">About</RouterLink>
                <RouterLink to="/contact" @click="toggleSideNav()">Contact</RouterLink>
            </span>
        </nav>

        <!-- cart and avatar section -->
        <div id="container-cart_and_avatar" class="flex justify-between md:w-28 items-center space-x-7 px-3 mx-5">


            <div id="container-cart_and_Badge" class="relative flex items-center">
                <div class="cartAndBadge cursor-pointer" @click="toggleCart()">
                    <CartBadge class="absolute top-0 left-3" />

                    <img src="../assets/imgs/icon-cart.svg" alt="cart icon" class="w-5 h-5 cursor-pointer">
                </div>
                <div>
                    <Cart class="absolute" :class="{ toggleOff: !isShowing, }" />
                </div>

            </div>
            <div>
                <img src="../assets/imgs/image-avatar.png" alt="" class="w-7 h-7 md:w-10 md:h-10 inline cursor-pointer"
                    @click="toggleAvatar()">

            </div>


            <Account class="fixed top-[30%] right-[29%] md:right-[7%] md:top-[10%]"
                :class="{ toggleOff: !isShowingAvatar, }" />

        </div>
    </div>

</template>


<style>
.toggleOff {
    display: none;
}
</style>