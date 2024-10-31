<script>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
      <RouterLink to="/jewelries">Jewelries</RouterLink>
      <RouterLink to="/men">Men</RouterLink>
      <RouterLink to="/women">Women</RouterLink>
      <RouterLink to="/electronics">Electronics</RouterLink>

    </nav>
  </div>


  <RouterView />
</template>

<style></style>
