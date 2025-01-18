const productSchema = require("../models/product.model");

exports.createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image is required!" });
    }

    console.log("Received Product Data:", req.body);
    console.log("Received Image:", req.file); 

    const imageURL = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;

    req.body.imageURL = imageURL;

    const product = await productSchema.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { search } = req.query;

 
    const query = search
      ? { name: { $regex: search, $options: "i" } } 
      : {}

    const products = await productSchema.find(query);

    const updatedProducts = products.map((product) => ({
      ...product.toObject(),
      imageURL: `${req.protocol}://${req.get("host")}/images/${
        product.imageURL
      }`,
    }));

    res.status(200).json(updatedProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productSchema.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
