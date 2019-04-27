<template>
  <div class="products">
    <div class="cart">
      <p>Cart ({{ cart.length }})</p>
    </div>
    <product :premium="premium"></product>
  </div>
</template>

<script>
import Product from "../components/Product.vue";
export default {
  name: "Products",
  components: {
    Product
  },
  computed: {
    cart: function() {
      return this.$store.getters.cart;
    }
  },
  data() {
    return {
      premium: false
    };
  }
};
</script>
