const Products = require("../models/products");

// Asynchronous function to get all products. 
const getProducts = async (req, res) => { 
    try { 
      // Get all products using the Products model. 
      const allProducts = await Products.findAll(); 
      // Return a response with status 200 and send the products in JSON format. 
      return res.status(200).json(allProducts); 
    } catch (error) { 
      // In case of error, return a response with status 500 and an error message. 
      res.status(500).json({ error: "Internal Server Error" }); 
    } 
  };

// Function to create a new product
const createProduct = async (req, res) => {
  try {
    // Check if there are no data in the request body
    if (!req.body) {
      res.status(404).send("Not found");
    }
    // Extract the necessary fields from the request body
    const { name, price, mrp, stock } = req.body;
    // Create a new product using the extracted fields
    const newProduct = await Products.create({
      name,
      price,
      mrp,
      stock,
      isPublished: false,
    });
    // Return a response with status code 201 and the newly created product in JSON format
    return res.status(201).json(newProduct);
  } catch (error) {
    // In case of error, return a response with status code 500 and an error message
    res.status(500).json({ error: "There was an error creating the product." });
  }
};
// Function to update an existing product 
const patchProducts = async (req, res) => { 
    try { 
      // Get the ID of the product from the request parameters 
      const { id } = req.params; 
  
      // Find the existing product in the database 
      const existingProduct = await Products.findByPk(id); 
  
      // Check if the product exists 
      if (!existingProduct) { 
        return res.status(404).json({ error: "Product not found" }); 
      } 
  
      // Check if the request body is empty 
      if (!req.body) { 
        return res.status(400).json({ error: "Request body is empty" }); 
      } 
  
      // Get the current data of the product 
      const { price, mrp, stock } = existingProduct; 
  
      // Check if the MRP is greater than or equal to the price and if the stock is greater than 0 
      if (mrp >= price && stock > 0) { 
        // Update the product with the data provided in the request body 
        const body = req.body; 
        const product = await existingProduct.update(body); 
  
        // Return a successful response with the updated product 
        res.status(204).json(product); 
      } else { 
        // If there are errors, store them in an array 
        const errors = []; 
  
        // Check if the MRP is less than the price and add an error if it is 
        if (mrp < price) { 
          errors.push("MRP should be less than equal to the Price"); 
        } 
  
        // Check if the stock count is 0 and add an error if it is 
        if (stock === 0) { 
          errors.push("Stock count is 0"); 
        } 
  
        // Return an error response with the found errors 
        return res.status(422).json(errors); 
      } 
    } catch (error) { 
      // Return a generic error response in case of any exception 
      res.status(500).json({ error: "Internal Server Error" }); 
    } 
  };
  
module.exports = { createProduct, getProducts, patchProducts };
