<template>
  <div class="products">
    <div
      class="productsItemContainer"
      v-for="product in products"
      :key="product.name"
    >
      <a :href="'shop/' + product.productID">
        <div class="productsItem">
          <div class="image is-128x128">
            <img
              :src="require(`@/${product.variants[0].variantImage}`)"
              :alt="product.altText"
            />
          </div>
          <p>{{ product.name }}</p>
        </div></a
      >
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
  async mounted() {
    try {
      const response = await axios.get("/db.json");
      this.products = response.data;
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style>
.products {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
