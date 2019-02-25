Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">
    <div class="image">
      <img :src="image" :alt="altText" />
    </div>
    <div class="product-info">
      <h1>{{ title }} <span v-show="onSale">On Sale!</span></h1>
      <h2>{{ description }}</h2>

      <p v-if="inStock">In stock</p>
      <p v-else="!inStock">Out of stock</p>
      <div class="color-box-wrapper">
        <div
          class="color-box"
          v-for="(variant, index) in variants"
          :key="variant.variantID"
          :style="{ backgroundColor: variant.variantColor }"
          @mouseover="updateProduct(index)"
        ></div>
      </div>
      <button
        @click="addToCart"
        :disabled="!inStock"
        :class="{ disabledButton: !inStock }"
      >
        Add to cart
      </button>
      <button
        @click="removeFromCart"
        :disabled="!inStock"
        :class="{ disabledButton: !inStock }"
      >
        Remove from cart
      </button>
      <p>Shipping: {{shipping}}</p>
      <ul>
        <li v-for="details in details">{{ details }}</li>
      </ul>
    </div>
  </div>
  `,
  data() {
    return {
      product: "Bell Pepper",
      type: "Genetically modified",
      description: "Tastiest bell peppers on the market!",
      selectedVariant: 0,
      altText: "Bell peppers",
      details: ["Firm", "Fresh", "Healthy"],
      variants: [
        {
          variantID: 123,
          variantColor: "yellow",
          variantImage: "./bell-pepper-yellow.png",
          variantQuantity: 10,
          onSale: false
        },
        {
          variantID: 124,
          variantColor: "red",
          variantImage: "./bell-pepper-red.png",
          variantQuantity: 0,
          onSale: false
        },
        {
          variantID: 125,
          variantColor: "green",
          variantImage: "./bell-pepper-green.png",
          variantQuantity: 5,
          onSale: true
        }
      ]
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    removeFromCart() {
      this.$emit(
        "remove-from-cart",
        this.variants[this.selectedVariant].variantId
      );
    },
    updateProduct(index) {
      this.selectedVariant = index;
    }
  },
  computed: {
    title() {
      return this.type + " " + this.product;
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
});

var app = new Vue({
  el: "#app",
  data: {
    premium: false,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    updateCartNegatively(id) {
      this.cart.pop(id);
    }
  }
});
