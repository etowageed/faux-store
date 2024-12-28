<script>
export default {
    name: "Toast",
    components: {
    },

    props: {
        message: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            default: 'success',
        },
        duration: {
            type: Number,
            default: 3000, // time in milliseconds
        },

    },
    data() {
        return {
            visible: true,
        }
    },

    mounted() {
        setTimeout(() => {
            this.visible = false;
            this.$emit('close'); // this notifies the parent when the toast closes
        }, this.duration);
    }
}
</script>

<template>
    <div v-if="visible" class="toast" :class="type">
        {{ message }}
    </div>
</template>

<style>
.toast {
    position: fixed;
    /* bottom: 20px; */
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    color: #fff;
    font-weight: bold;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: fade-in 0.3s ease-in-out;
}

.toast.success {
    background-color: #4caf50;
}

.toast.error {
    background-color: #f44336;
}

.toast.info {
    background-color: #2196f3;
}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>