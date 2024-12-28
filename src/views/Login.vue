<script>
import BtnClear from '@/components/BtnClear.vue';
import BtnSolid from '@/components/BtnSolid.vue';
import Profile from '@/views/Profile.vue';


import axios from 'axios';
export default {

    name: "Login",
    components: {
        BtnSolid, BtnClear, Profile,
    },

    data() {
        return {
            formData: {
                username: '',
                password: ''
            },

            errorMsg: null,
            successMsg: null
        }
    },

    methods: {
        async logIn() {

            try {
                this.errorMsg = null;
                this.successMsg = null;

                const response = await axios.post('https://fakestoreapi.com/auth/login', this.formData);

                this.successMsg = 'Login successful';

                const token = response.data.token;
                localStorage.setItem('authToken', token);

                this.$router.push('/profile')
                console.log('Response:', response.data)
            } catch (error) {
                this.errorMsg = 'Login failed. Please check your credentials';
                console.error('Error:', error);
            }
            // alerts for status messages
            if (this.successMsg) {
                this.$root.showToast(this.successMsg, 'success')

            } else {
                this.$root.showToast(this.errorMsg, 'error')
            };

            this.emitter.emit('formEvent', this.formData)
        }

    }

}
</script>

<template>
    <div>
        <h1>Login</h1>

        <div>
            <form @submit.prevent="logIn()">
                <label for="username">Username</label>
                <input type="text" id="username" v-model="formData.username" required />
                <label for="password">Password</label>
                <input type="password" id="password" v-model="formData.password" required />
                <BtnSolid type="submit" btnText="Login" />
                <BtnClear btnText="Create account" />
            </form>

        </div>
    </div>
</template>


<style>
/* .error {
    color: red;
} */

/* .success {
    color: green;
} */
</style>