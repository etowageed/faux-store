<script>
import BtnClear from './BtnClear.vue';


export default {
    name: "Account",

    components: { BtnClear },

}
</script>

<template>
    <div>
        <router-link to="/login">
            <BtnClear btnText="Sign In/Sign Up" />
        </router-link>
    </div>
</template>

<style></style>