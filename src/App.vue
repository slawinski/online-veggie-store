<template>
  <div id="app">
    <div id="nav" class="nav">
      <div class="links">
        <router-link :to="{ name: 'home' }">Home</router-link> |
        <router-link :to="{ name: 'shop' }">Shop</router-link> |
        <router-link :to="{ name: 'about' }">About</router-link>
      </div>
      <div class="title">
        <p>Online Veggie Store</p>
      </div>
      <cart></cart>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
    <footer class="footer">
      <app-footer></app-footer>
    </footer>
  </div>
</template>

<script>
import store from "./store";
import Cart from "./components/Cart";
import AppFooter from "./components/AppFooter";

export default {
  name: "app",
  components: {
    Cart,
    AppFooter
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
  border-bottom: 1px solid darkgray;
}
</style>
