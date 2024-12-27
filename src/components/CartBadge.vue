<script>
export default {
    name: "Badge",
    data() {
        return {
            cartCount: ''
        }
    },
    methods: {
        emitCount() {
            this.emitter.on('cartCountEvent', (data) => {
                this.cartCount = data
            })
        }
    },
    mounted() {
        this.emitCount()
    }
}
</script>

<template>
    <span v-if="cartCount > 0" class="bg-primaryCol text-white font-semibold rounded-full px-1 text-sm">{{ cartCount
        }}</span>
</template>


<style></style>