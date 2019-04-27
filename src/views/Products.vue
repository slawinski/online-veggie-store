<template>
  <div class="products">
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
  data() {
    return {
      premium: false
    };
  }
};
</script>
