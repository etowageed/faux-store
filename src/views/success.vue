<script>
import BtnClear from '@/components/BtnClear.vue';
export default {
    name: 'success',
    components: {
        BtnClear,
    },

    data() {
        return {
            transactionId: null,
        }
    },

    created() {
        const urlParams = new URLSearchParams(window.location.search);
        this.transactionId = urlParams.get('transaction_id');
        console.log('Transaction ID:', this.transactionId)
    }
}
</script>

<template>
    <div>
        <p>Successful!</p>
        <P>thanks for purchasing</P>
        <p>Here is your transaction ID: {{ transactionId }}</p>


        <router-link to="/">
            <BtnClear btnText="Continue shopping"></BtnClear>
        </router-link>
    </div>
</template>



<style></style>