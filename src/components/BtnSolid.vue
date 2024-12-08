<script>

export default {
    name: 'BtnSolid',
    props: {
        btnText: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        }
    }
}
</script>


<template>
    <button
        class="bg-primaryCol hover:bg-primaryColpale w-full text-sm font-semibold text-darkBlue rounded py-3 px-2 flex justify-center space-x-2">
        <img :src="icon" alt="icon" v-if="icon" class="button-icon h-4 w-4" />
        <span class="inline">{{ btnText }}</span>
    </button>
</template>



<style></style>