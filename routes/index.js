var express = require("express");
var router = express.Router();
const {
  getProducts,
  createProduct,
  patchProducts,
} = require("../controllers/products");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("<p>HTML Data</p>");
});

// The GET method on the '/products' route calls the 'getProducts' function to retrieve all products.
router.get("/products", getProducts);
// The POST method on the '/products' route calls the 'createProduct' function to create a new product.
router.post("/products", createProduct);
// The PATCH method on the '/products/:id' route calls the 'patchProducts' function to partially update a specific product.
router.patch("/products/:id", patchProducts);
/* The PUT method on the '/products/:id' 
route returns a 405 (Method Not Allowed) status code and an "Unauthorized" message, 
indicating that full product updates are not permitted. */
router.put("/products/:id", function (req, res) {
  res.status(405).send("Unauthorized");
});
/* The DELETE method on the '/products/:id' 
route returns a 405 (Method Not Allowed) status code and an "Unauthorized" message, 
indicating that product deletion is not permitted. */
router.delete("/products/:id", function (req, res) {
  res.status(405).send("Unauthorized");
});

module.exports = router;
