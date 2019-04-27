import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    reviews: [
      {
        name: null,
        review: null,
        rating: null,
        recommendation: null,
        errors: []
      }
    ]
  },
  getters: {
    reviews: state => state.reviews
  },
  mutations: {
    addReview: (state, payload) => {
      const review = {
        review: payload,
        completed: false
      };
      state.reviews.unshift(review);
    }
  },
  actions: {}
});
