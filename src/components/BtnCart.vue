<script>

export default {
    name: 'BtnCart',

    methods: {
        handleClick() {
            this.$emit('addToCart')
        }
    }
}
</script>


<template>
    <button
        class="bg-primaryCol hover:bg-primaryColpale py-3 px-[2%] w-full font-semibold text-darkBlue rounded space-x-3"
        @click="handleClick">
        <span><img src="../assets/imgs/icon-cart.svg" alt="" class="w-4 h-4 inline"></span>
        <span class="inline">Add to cart</span>


    </button>
</template>



<style></style>