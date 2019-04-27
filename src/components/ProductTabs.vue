<template>
  <div>
    <div>
      <span
        class="tab"
        :class="{ activeTab: selectedTab === tab }"
        v-for="tab in tabs"
        :key="tab.index"
        @click="selectedTab = tab"
        >{{ tab }}</span
      >
    </div>
    <div v-show="selectedTab === 'Reviews'">
      <p v-if="!reviews.length">There are no reviews yet.</p>
      <ul>
        <li v-for="review in reviews" :key="review.index">
          <p>{{ review.review }}</p>
        </li>
      </ul>
    </div>
    <div v-show="selectedTab === 'Make a Review'">
      <product-review></product-review>
    </div>
  </div>
</template>

<script>
import ProductReview from "../components/ProductReview";
export default {
  name: "product-tab",
  components: { ProductReview },
  computed: {
    reviews: function() {
      return this.$store.getters.reviews;
    }
  },
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: "Reviews" // set from @click
    };
  }
};
</script>

<style></style>
