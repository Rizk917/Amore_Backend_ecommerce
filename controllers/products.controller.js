import Product from "../models/products.model.js";
import Popular from "../models/popularProduct.js"
import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: "didb7l6nz",
  api_key: "721724432988673",
  api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

const getAll = async (req, res) => {
  const allProduct = await Product.find().populate("categoryId");
  res.json({
    message: "All product",
    status: 200,
    data: allProduct,
  });
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId)
  res.json({
    data:product
  })
}

const createProduct = async (req, res) => {
  const {
    productName,
    productDescription,
    productPrice,
    productQuantity,
    categoryId,
  } = req.body;
  try {
    let productImage = req.file.path; // get the path of the image from multer
    const uploadedImage = await cloudinary.uploader.upload(productImage); // upload the image to cloudinary
    const product = new Product({
      productName,
      productImage: uploadedImage.secure_url, // use the secure_url property of the uploaded image
      productDescription,
      productPrice,
      productQuantity,
      categoryId,
    });
    const savedProduct = await product.save();
    res.status(201).json({
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Product creation failed",
      error,
    });
  }
};

const updateProduct = async (req, res) => {
    // console.log(req.body)
    // console.log(req.params.id)
    const productId = req.params.id;
    const { productName,productDescription,productPrice,productQuantity,categoryId } = req.body;
    try {
        let productImage;
        if (req.file) {
    productImage = req.file.path; // get the path of the image from multer
    const uploadedImage = await cloudinary.uploader.upload(productImage); // upload the image to cloudinary
    productImage = uploadedImage.secure_url; // use the secure_url property of the uploaded image
}
        
        const editProduct = ({
        productName,
        productImage, // use the secure_url property of the uploaded image
        productDescription,
        productPrice,
        productQuantity,
        categoryId,
        });


    const updatedProduct = await Product.findByIdAndUpdate(productId,editProduct );
    res.json({
    message: "Product updated successfully",
    status: 200,
    data: editProduct,
    });
} catch (error) {
    console.log(error)
    res.json({
    message: "Product updated failed",
    status: 203,
    });
}
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const deletedProduct = await Product.findByIdAndDelete(productId);
  await Popular.findOneAndDelete({productId : productId});
  res.json({
    message: "Program deleted successfully",
    status: 200,
    data: deletedProduct,
  });
};

// display all products with the categories for each product

const displayProductWithCategories = async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId");
    res.json({
      products,
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: "Product display failed",
      status: 203,
    });
  }
};

// display products for each categories
const displayProduct = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const products = await Product.find({ categoryId: categoryId });
    res.json({
      products,
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: "Product display failed",
      status: 203,
    });
  }
};

export default {
  getAll,
  createProduct,
  updateProduct,
  deleteProduct,
  displayProduct,
  displayProductWithCategories,
  getProductById
};
