<script>
import Toast from './Toast.vue';
export default {
    name: "ToastManager",
    components: {
        Toast,
    },
    data() {
        return {
            toasts: [], // this array manages multiple toasts
        };
    },

    methods: {
        addToast(toast) {
            this.toasts.push(toast);
        },

        removeToast(index) {
            this.toasts.splice(index, 1);
        },
    },
}
</script>

<template>
    <div class="toast-container">
        <Toast v-for="(toast, index) in toasts" :key="index" :message="toast.message" :type="toast.type"
            :duration="toast.duration" @close="removeToast(index)" />
    </div>
</template>

<style>
.toast-container {
    position: fixed;
    /* bottom: 20px; */
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>