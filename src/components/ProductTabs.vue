<template>
  <section>
    <b-tabs type="is-boxed" v-model="activeTab">
      <b-tab-item label="Details">
        <ol>
          <li v-for="detail in details" :key="detail.index">
            {{ detail }}
          </li>
        </ol>
      </b-tab-item>
      <b-tab-item label="Reviews">
        <section>
          <button
            class="button is-primary"
            @click="isComponentModalActive = true"
          >
            New Review
          </button>
          <b-modal :active.sync="isComponentModalActive" has-modal-card>
            <new-review-modal></new-review-modal>
          </b-modal>
        </section>
        <section>
          <p v-if="!reviews.length">There are no reviews yet.</p>
          <div class="box" v-for="review in reviews" :key="review.index">
            <p>
              <strong>{{ review.name }}</strong> said:
            </p>
            <p>{{ review.review }}</p>
            <p>Do you recommend it? {{ review.recommendation }}!</p>
            <p>Rating: {{ review.rating }}/5</p>
          </div>
        </section>
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import NewReviewModal from "../components/NewReviewModal";
export default {
  name: "ProductTab",
  data() {
    return {
      activeTab: 0,
      isComponentModalActive: false
    };
  },
  components: {
    NewReviewModal
  },
  props: {
    details: Array
  },
  computed: {
    reviews: function() {
      return this.$store.getters.reviews;
    }
  }
};
</script>
