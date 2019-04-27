<template>
  <form class="review-form" @submit.prevent="onSubmit">
    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name" />
    </p>

    <p>
      <label for="review">Review:</label>
      <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
      <label for="recommendation">Do you recommend this product:</label>
      <input
        type="radio"
        id="recommendation"
        v-model="recommendation"
        value="Yes"
      />
      Yes
      <input
        type="radio"
        id="recommendation"
        v-model="recommendation"
        value="No"
      />
      No
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
      <input type="submit" value="Submit" />
    </p>

    <div v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error.index">{{ error }}</li>
      </ul>
    </div>
  </form>
</template>

<script>
export default {
  name: "ProductReview",
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
        this.$store.commit("addReview", productReview);
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
};
</script>

<style></style>
