<script>
import BtnCheckout from './BtnCheckout.vue';


export default {
    components: {
        BtnCheckout,
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
            <h1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eveniet magni doloremque mollitia
                cumque rem dolore placeat quibusdam, natus expedita accusantium praesentium necessitatibus. Libero aut
                dignissimos, pariatur debitis ratione dolorem.

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui veniam corporis modi fugiat repudiandae a
                assumenda dignissimos quaerat in voluptate id, saepe neque unde suscipit possimus est expedita, facere
                placeat.
            </h1>
        </div>
        <div class="checkout-cta px-5">
            <BtnCheckout />
        </div>
    </div>
</template>

<style></style>