<template>
  <div class="products">
    <div class="cart">
      <p>Cart ({{ cart.length }})</p>
    </div>
    <product
      :premium="premium"
      @add-to-cart="updateCart"
      @remove-from-cart="updateCartNegatively"
    ></product>
  </div>
</template>

<script>
import Product from "../components/Product.vue";
export default {
  name: "Products",
  components: {
    Product
  },
  data() {
    return {
      premium: false,
      cart: []
    };
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    updateCartNegatively(id) {
      this.cart.pop(id);
    }
  }
};
</script>
