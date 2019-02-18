var app = new Vue({
  el: "#app",
  data: {
    product: "Bell Pepper",
    type: "Genetically modified",
    description: "Tastiest bell peppers on the market!",
    image: "./bell-pepper-red.png",
    altText: "Bell peppers",
    inStock: true,
    onSale: false,
    details: ["Firm", "Fresh", "Healthy"],
    variants: [
      {
        variantID: 123,
        variantColor: "yellow",
        variantImage: "./bell-pepper-yellow.png"
      },
      {
        variantID: 124,
        variantColor: "red",
        variantImage: "./bell-pepper-red.png"
      },
      {
        variantID: 125,
        variantColor: "green",
        variantImage: "./bell-pepper-green.png"
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
  },
  computed: {
    title() {
      return this.type + " " + this.product;
    }
  }
});
