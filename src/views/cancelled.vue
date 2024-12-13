<script>
import BtnClear from '@/components/BtnClear.vue';
export default {
    name: 'Cancelled',
    components: {
        BtnClear,
    },

    data() {
        return {
            cancelReason: null,
        }
    },

    created() {
        const urlParams = new URLSearchParams(window.location.search);
        this.cancelReason = urlParams.get('reason') || 'Unknown';
        console.log('Transaction ID:', this.cancelReason)
    }
}
</script>

<template>
    <div>
        <p>Payment cancelled</p>
        <P>your transaction was not completed</P>
        <p>Reason: {{ cancelReason }}</p>


        <router-link to="/">
            <BtnClear btnText="Continue shopping"></BtnClear>
        </router-link>
    </div>
</template>



<style></style>