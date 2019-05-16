<template>
  <div v-if="!isFetching" class="product">
    <div class="header">
      <div class="image is-128x128">
        <img
          :src="
            require(`@/${
              this.product.product[0].variants[
                this.product.product[0].selectedVariant
              ].variantImage
            }`)
          "
          :alt="product.product[0].altText"
        />
      </div>
      <div>
        <h1 class="title">
          {{ title }}
          <span v-show="onSale">On Sale!</span>
        </h1>
        <h2 class="subtitle">{{ product.product[0].description }}</h2>
      </div>
    </div>
    <div class="info">
      <p v-if="inStock">In stock</p>
      <p v-else>Out of stock</p>
      <p>Shipping: {{ shipping }}</p>
      <div class="color-box-wrapper">
        <div
          class="color-box"
          v-for="(variant, index) in product.product[0].variants"
          :key="variant.variantID"
          :style="{ backgroundColor: variant.variantColor }"
          @click="updateProduct(index)"
        ></div>
      </div>
      <b-button
        @click="addToCart"
        :disabled="!inStock"
        :class="{ disabledButton: !inStock }"
      >
        Add to cart
      </b-button>
      <b-button
        @click="removeFromCart"
        :disabled="!inStock"
        :class="{ disabledButton: !inStock }"
      >
        Remove from cart
      </b-button>
      <div>
        <product-tabs :details="product.product[0].details"></product-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductTabs from "../components/ProductTabs";

export default {
  name: "Product",
  components: {
    ProductTabs
  },
  data() {
    return {
      product: {},
      isFetching: true
    };
  },
  async mounted() {
    try {
      const response = await axios.get("/db.json");
      const products = response.data;
      const id = this.$route.params.productId;
      const product = products.filter(obj => {
        return obj.productID == id;
      });
      this.$set(this.product, "product", product);
      this.isFetching = false;
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    addToCart() {
      this.$store.commit(
        "addToCart",
        this.product.product[0].variants[
          this.product.product[0].selectedVariant
        ].variantID
      );
    },
    removeFromCart() {
      this.$store.commit(
        "removeFromCart",
        this.product.product[0].variants[
          this.product.product[0].selectedVariant
        ].variantID
      );
    },
    updateProduct(index) {
      this.product.product[0].selectedVariant = index;
    }
  },
  computed: {
    title() {
      return (
        this.product.product[0].variants[
          this.product.product[0].selectedVariant
        ].variantColor +
        " " +
        this.product.product[0].name
      );
    },
    image() {
      return this.product.product[0].variants[
        this.product.product[0].selectedVariant
      ].variantImage;
    },
    inStock() {
      return this.product.product[0].variants[
        this.product.product[0].selectedVariant
      ].variantQuantity;
    },
    onSale() {
      return this.product.product[0].variants[
        this.product.product[0].selectedVariant
      ].onSale;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      } else {
        return 2.99;
      }
    }
  }
};
</script>

<style>
.color-box-wrapper {
  display: flex;
}
.color-box {
  width: 40px;
  height: 40px;
  margin-right: 5px;
  border: 1px solid grey;
}
.image > img {
  height: 105px;
  width: 105px;
}
.header {
  display: flex;
  align-items: center;
}
</style>
