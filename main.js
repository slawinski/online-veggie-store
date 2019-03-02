var eventBus = new Vue();

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
      <div>
      <h2>Reviews</h2>
      <product-tabs :reviews="reviews"></product-tabs>
     </div>

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
      reviews: [],
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
  },
  mounted() {
    eventBus.$on("review-submitted", productReview => {
      this.reviews.push(productReview);
    });
  }
});

Vue.component("product-review", {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
  <p>
    <label for="name">Name:</label>
    <input id="name" v-model="name" placeholder="name">
  </p>

  <p>
    <label for="review">Review:</label>
    <textarea id="review" v-model="review"></textarea>
  </p>

  <p>
    <label for="recommendation">Do you recommend this product:</label>
    <input type="radio" id="recommendation" v-model="recommendation" value="Yes"> Yes
    <input type="radio" id="recommendation" v-model="recommendation" value="No"> No
  </p>

  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  </p>

  <p>
    <input type="submit" value="Submit">
  </p>
  <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>

</form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommendation: null,
      errors: []
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommendation: this.recommendation
        };
        eventBus.$emit("review-submitted", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommendation = null;
      } else {
        if (!this.name) this.errors.push("Name required.");
        if (!this.review) this.errors.push("Review required.");
        if (!this.rating) this.errors.push("Rating required.");
        if (!this.recommendation) this.errors.push("Recommendation required.");
      }
    }
  }
});

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: false
    }
  },
  template: `
    <div>
      <div>
        <span class="tab"
          :class="{ activeTab: selectedTab === tab }"
          v-for="(tab, index) in tabs"
          @click="selectedTab = tab"
        >{{ tab }}</span>
      </div>
      <div v-show="selectedTab === 'Reviews'">
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
          <p>{{ review.name }}</p>
          <p>Rating: {{ review.rating }}</p>
          <p>{{ review.review }}</p>
          <p>Is product recommended? {{ review.recommendation }}</p>
          </li>
        </ul>
      </div>
      <div v-show="selectedTab === 'Make a Review'">
        <product-review></product-review>
      </div>
    </div>
  `,
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: "Reviews" // set from @click
    };
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
