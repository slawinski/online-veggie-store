import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/shop",
      name: "shop",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Products.vue") // Lazy-loading
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue") // Lazy-loading
    }
    // {
    //   path: "/shop/:productId",
    //   name: "product",
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./component/Product.vue") // Lazy-loading
    // }
  ]
});
