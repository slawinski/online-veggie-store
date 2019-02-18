var app = new Vue({
  el: "#app",
  data: {
    product: "Aubergine",
    description: "Tastiest aubergines on the market!",
    image: "./eggplant-128px.png",
    altText: "Aubergines",
    inventory: 5,
    onSale: false,
    details: ["Firm", "Fresh", "Healthy"],
    variants: [
      {
        variantID: 123,
        variantCaliber: "Large",
        variantImage: "./eggplant-256px.png"
      },
      {
        variantID: 124,
        variantCaliber: "Medium",
        variantImage: "./eggplant-128px.png"
      },
      {
        variantID: 125,
        variantCaliber: "Small",
        variantImage: "./eggplant-64px.png"
      }
    ],
    cart: 0
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    removeFromCart() {
      this.cart -= 1;
    },
    updateProduct(variantImage) {
      this.image = variantImage;
    }
  }
});
