const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price, quantity, category } = req.body;
  try {
    const newProduct = new Product({ name, description, price, quantity, category });
    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateProduct = async (req, res) => {
  const { name, description, price, quantity, category } = req.body;
  const productFields = {};
  if (name) productFields.name = name;
  if (description) productFields.description = description;
  if (price) productFields.price = price;
  if (quantity) productFields.quantity = quantity;
  if (category) productFields.category = category;

  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    product = await Product.findByIdAndUpdate(req.params.id, { $set: productFields }, { new: true });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    await Product.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ msg: 'All products removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.findProductsByName = async (req, res) => {
  try {
    const name = req.query.name;
    console.log('Search Query:', name); // Log the search query
    const regex = new RegExp(`.*${name}.*`, 'i'); // Use explicit wildcards
    console.log('Regex:', regex); // Log the RegExp object
    const products = await Product.find({ name: regex });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

