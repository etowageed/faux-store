<script>

export default {
    name: 'BtnClear',

    props: {
        btnText: {
            type: String,
            default: '',
        }
    }

}
</script>


<template>
    <button
        class="border border-primaryCol hover:bg-primaryColpale text-center p-3 text-sm font-semibold text-darkBlue rounded">
        <span class="inline">{{ btnText }}</span>
    </button>

</template>



<style></style>