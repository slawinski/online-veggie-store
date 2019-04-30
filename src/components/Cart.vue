<template>
  <div class="cart">
    <p>
      <span><b-icon icon="cart"> </b-icon></span> ({{ cart.length }})
    </p>
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
