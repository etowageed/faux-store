<script>
import BtnCart from '@/components/BtnCart.vue';
import BtnCheckout from '@/components/BtnCheckout.vue';
import BtnClear from '@/components/BtnClear.vue';

export default {

    components: {
        BtnCart, BtnCheckout, BtnClear,
    },
    props: {
        allProducts: {
            type: Array,
            required: true
        }
    },

    methods: {
        viewDetails(productId) {
            this.$router.push({ name: 'detailsPage', params: { id: productId } })
        }
    }
}

</script>

<template>
    <div class="border border-red-600 lg:w-1/3 md:flex md:flex-wrap mx-auto">
        <div v-for="(product, index ) in allProducts" :key="product.id"
            class="border border-primaryCol grow md:w-1/3 m-6 p-3 flex justify-between flex-col">

            <div class="border border-red-600">
                <img :src="product.image" :alt="product.title" class="md:w-40 md:h-52 mx-auto cursor-pointer"
                    @click="viewDetails(product.id)">

            </div>

            <div>
                <!-- <p>{{ product.id }}</p> -->
                <p class="text-primaryCol font-medium">{{ product.category }}</p>
                <p class="text-darkBlue font-bold text-lg">{{ product.title }}</p>
                <p class="text-darkBlue font-bold ">{{ product.price }}</p>
                <!-- <p>{{ product.description }}</p> -->
            </div>

            <div class="flex space-x-4">

                <BtnCart />

                <BtnClear @click="viewDetails(product.id)" />

            </div>

        </div>
    </div>
    <RouterView />
</template>

<style></style>