<template>
  <div class="cart">
    <p>Cart ({{ cart.length }})</p>
  </div>
</template>

<script>
export default {
  name: "cart",
  computed: {
    cart: function() {
      return this.$store.getters.cart;
    }
  }
};
</script>

<style></style>
