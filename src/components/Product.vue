<template>
  <div class="product">
    <div class="header">
      <div class="image">
        <img :src="image" :alt="altText" />
      </div>
      <div class="title">
        <h1>{{ title }} <span v-show="onSale">On Sale!</span></h1>
        <h2>{{ description }}</h2>
      </div>
    </div>
    <div class="info">
      <p v-if="inStock">In stock</p>
      <p v-else>Out of stock</p>
      <div class="color-box-wrapper">
        <div
          class="color-box"
          v-for="(variant, index) in variants"
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
      <p>Shipping: {{ shipping }}</p>
      <ul>
        <li v-for="detail in details" :key="detail.index">{{ detail }}</li>
      </ul>
      <div>
        <h2>Reviews</h2>
        <product-tabs :reviews="reviews"></product-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import ProductTabs from "../components/ProductTabs";
export default {
  name: "Product",
  components: {
    ProductTabs
  },
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      product: "Bell Pepper",
      type: "Genetically modified",
      description: "Tastiest bell peppers on the market!",
      selectedVariant: 0,
      altText: "Bell peppers",
      details: ["Firm", "Fresh", "Healthy"],
      reviews: [],
      variants: [
        {
          variantID: 123,
          variantColor: "Yellow",
          variantImage: require("../assets/bell-pepper-yellow.png"),
          variantQuantity: 10,
          onSale: false
        },
        {
          variantID: 124,
          variantColor: "Red",
          variantImage: require("../assets/bell-pepper-red.png"),
          variantQuantity: 0,
          onSale: false
        },
        {
          variantID: 125,
          variantColor: "Green",
          variantImage: require("../assets/bell-pepper-green.png"),
          variantQuantity: 5,
          onSale: true
        }
      ]
    };
  },
  methods: {
    addToCart() {
      this.$store.commit(
        "addToCart",
        this.variants[this.selectedVariant].variantID
      );
    },
    removeFromCart() {
      this.$store.commit(
        "removeFromCart",
        this.variants[this.selectedVariant].variantID
      );
    },
    updateProduct(index) {
      this.selectedVariant = index;
    }
  },
  computed: {
    title() {
      return (
        this.variants[this.selectedVariant].variantColor + " " + this.product
      );
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    onSale() {
      return this.variants[this.selectedVariant].onSale;
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
}
.image > img {
  height: 105px;
}
.header {
  display: flex;
  align-items: center;
}
</style>
