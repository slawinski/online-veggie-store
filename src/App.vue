<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'home' }">Home</router-link> |
      <router-link :to="{ name: 'products' }">Products</router-link>
    </div>
    <router-view />
    <Disclaimer />
  </div>
</template>

<script>
import Disclaimer from "./components/Disclaimer";

export default {
  name: "app",
  components: {
    Disclaimer
  }
};
</script>

<style></style>
