<script>
import axios from 'axios';
export default {
    name: "Profile",

    components: {

    },
    data() {
        return {
            user: null,
            formData: '',
        };

    },

    async created() {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('https://fakestoreapi.com/users/1', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            this.user = response.data;
        } catch (error) {
            console.error('failed to fetch user data:', error);
            this.$router.push('/login');
        }
    }




}
</script>

<template>
    <div>
        <h1>Welcome to your profile</h1>
    </div>
</template>



<style></style>