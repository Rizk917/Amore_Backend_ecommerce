import Category from "../models/categories.model.js";
import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: "didb7l6nz",
  api_key: "721724432988673",
  api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

const getAll = async (req, res) => {
  const allCategory = await Category.find();
  res.json({
    message: "All Category",
    status: 200,
    data: allCategory,
  });
};

const createCategory = async (req, res) => {
  const { categoryName ,image } = req.body;

  try {
    let image = req.file.path; // get the path of the image from multer
    
    
    const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
    
    const category = new Category({
        image: uploadedImage.secure_url, // use the secure_url property of the uploaded image
        categoryName,
      }); 

    const savedCategory = await category.save();
    res.json({
      message: "Category created successfully",
      status: 201,
      data: savedCategory,
    });
  } catch (error) {
    res.json({
      message: "Category created failed",
      status: 203,
    });
  }
};

const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    if (!req.body.categoryName) {
      throw new Error("Category updated failed");
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      req.body
    );
    res.json({
      message: "Category updated successfully",
      status: 200,
      data: updatedCategory,
    });
  } catch (error) {
    res.json({
      message: "Category updated failed",
      status: 203,
    });
  }
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  const deletedCategory = await Category.findByIdAndDelete(categoryId);
  res.json({
    message: "Category deleted successfully",
    status: 200,
    data: deletedCategory,
  });
};

export default { getAll, createCategory, updateCategory, deleteCategory };
