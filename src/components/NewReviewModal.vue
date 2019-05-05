<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">New Review</p>
      </header>
      <section class="modal-card-body">
        <b-field label="name">
          <b-input v-model="name" placeholder="Your name"> </b-input>
        </b-field>

        <b-field label="rating">
          <b-select v-model.number="rating" placeholder="Pick one">
            <option v-for="(rating, index) in 5" :key="index">{{
              rating
            }}</option>
          </b-select>
        </b-field>

        <b-field label="recommendation">
          <b-radio v-model="recommendation" native-value="Yes">
            Yes
          </b-radio>
          <b-radio v-model="recommendation" native-value="No">
            No
          </b-radio>
        </b-field>

        <b-field label="review">
          <b-input
            maxlength="200"
            type="textarea"
            v-model="review"
            placeholder="Your review"
            required
          >
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          Close
        </button>
        <button class="button is-primary" @click="onSubmit()">Submit</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: "NewReviewModal",
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
