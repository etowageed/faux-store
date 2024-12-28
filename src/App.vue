<script>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import ToastManager from './components/ToastManager.vue';
export default {
  name: 'App',
  components: {
    Header, ToastManager,
  },

  methods: {
    // this enables the toast to be applied globally in the app
    showToast(message, type = 'success', duration = 3000) {
      this.$refs.toastManager.addToast({ message, type, duration });
    },
  },
};

</script>

<template>
  <div id="app">
    <RouterView />
    <ToastManager ref="toastManager" />
  </div>
</template>

<style></style>
