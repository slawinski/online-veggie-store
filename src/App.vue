<template>
  <div id="app">
    <div id="nav" class="nav">
      <div class="links">
        <router-link :to="{ name: 'home' }">Home</router-link> |
        <router-link :to="{ name: 'products' }">Products</router-link>
      </div>
      <Cart></Cart>
    </div>
    <router-view></router-view>
    <Disclaimer></Disclaimer>
  </div>
</template>

<script>
import Cart from "./components/Cart";
import Disclaimer from "./components/Disclaimer";
import store from "./store";

export default {
  name: "app",
  components: {
    Cart,
    Disclaimer
  },
  computed: {
    cart: function() {
      return this.$store.getters.cart;
    }
  },
  store: store
};
</script>

<style>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
