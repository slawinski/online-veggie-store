import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "my-app",
  storage: localStorage
});

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
    ],
    cart: []
  },
  getters: {
    cart: state => state.cart,
    reviews: state => state.reviews
  },
  mutations: {
    addToCart: (state, payload) => {
      state.cart.push(payload);
    },
    removeFromCart: (state, payload) => {
      state.cart.pop(payload);
    },
    addReview: (state, payload) => {
      state.reviews.unshift(payload);
    }
  },
  actions: {},
  plugins: [vuexPersist.plugin]
});
