import ImageCarousel from "../models/imageCarousel.model.js";
import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: "didb7l6nz",
  api_key: "721724432988673",
  api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

const getAll = async (req, res) => {
  const allImages = await ImageCarousel.find();
  res.json({
    message: "All images",
    status: 200,
    data: allImages,
  });
};

const createImage = async (req, res) => {
  const { imageCarouselItem, altText } = req.body;
  try {
    let image = req.file.path; // get the path of the image from multer
    const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
    const newImage = new ImageCarousel({
      imageCarouselItem: uploadedImage.secure_url, // use the secure_url property of the uploaded image
      altText,
    });
    const savedImage = await newImage.save();
    res.status(201).json({
      message: "Image created successfully",
      data: savedImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Image creation failed",
      error,
    });
  }
};

const updateImage = async (req, res) => {
    // console.log(req.body)
    // console.log(req.params.id)
    const imageId = req.params.id;
    const { imageCarouselItem, altText } = req.body;
    try {
        let image;
        if (req.file) {
          image = req.file.path; // get the path of the image from multer
          const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
          image = uploadedImage.secure_url; // use the secure_url property of the uploaded image
        }
        
        const updatedImage = await ImageCarousel.findByIdAndUpdate(imageId, {
          imageCarouselItem,
          altText,
        });
        
        res.json({
          message: "Image updated successfully",
          status: 200,
          data: updatedImage,
        });
    } catch (error) {
        console.log(error)
        res.json({
          message: "Image updated failed",
          status: 203,
        });
    }
};

const deleteImage = async (req, res) => {
  const imageId = req.params.id;
  const deletedImage = await ImageCarousel.findByIdAndDelete(imageId);
  res.json({
    message: "Image deleted successfully",
    status: 200,
    data: deletedImage,
  });
};

export default {
  getAll,
  createImage,
  updateImage,
  deleteImage,
};
