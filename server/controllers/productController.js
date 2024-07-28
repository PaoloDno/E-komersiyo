const Product = require('../models/Product');
const Category = require('../models/categoryModel/')

const createProduct = async (req, res) => {
  const { storeID } = req.params;
  const { storeCategory } = req.body;

  try {
    let category = await Category.findOne({ categoryName: storeCategory });
    if (category) {
      category.categoryTotalNumber += 1;
    } else {
      category = new Category({
        categoryName: storeCategory,
        categoryTotalNumber: 1
      });
    }
    await category.save();

    const newProduct = new Product({ ...req.body, storeID });
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productID } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(productID, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const requestDeleteProduct = async (req, res) => {
  try {
    const { productID } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productID);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductList = async (req, res) => {
  try {
    const { userID } = req.params;
    const products = await Product.find({ userID });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProduct, updateProduct, requestDeleteProduct, getProductList}