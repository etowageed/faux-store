<script>

export default {

    name: 'BtnCounter',
    data() {
        return {
            count: 1
        }
    },

    methods: {
        counterUp() {
            this.count++;
            this.$emit('countEvent', this.count);
        },
        counterDown() {
            if (this.count > 1) {
                this.count--;
                this.$emit('countEvent', this.count);

            }

        }
    }

}
</script>


<template>
    <div
        class="bg-lightGrayishBlue text-center whitespace-nowrap font-semibold text-darkBlue rounded flex justify-between">
        <button @click="counterDown"><img src="../assets/imgs/icon-minus.svg" alt=""></button>
        <span>{{ count }}</span>
        <button @click="counterUp"><img src="../assets/imgs/icon-plus.svg" alt=""></button>


    </div>
</template>



<style></style>