<template>
  <div class="products">
    <div class="productsItemContainer" v-for="product in products">
      <div class="productsItem">
        <div class="image is-128x128">
          <img
            :src="require(`@/${product.variants[0].variantImage}`)"
            :alt="product.altText"
          />
        </div>
        <p>{{ product.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Products",
  data() {
    return {
      products: null,
      premium: false
    };
  },
  mounted() {
    axios.get("/db.json").then(response => {
      this.products = response.data.products;
    });
  }
};
</script>

<style>
.products {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
