<script>
import axios from 'axios';
export default {
    name: "Profile",

    components: {

    },
    data() {
        return {
            user: null,
        };

    },

    async created() {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('https://fakestoreapi.com/users/2', {
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
        <div v-if="user">
            <p>name: {{ user.name }}</p>
        </div>
    </div>
</template>



<style></style>