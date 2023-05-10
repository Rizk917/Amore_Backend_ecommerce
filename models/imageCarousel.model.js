import mongoose from "mongoose";


const ImageCarouselScehma = new mongoose.Schema({
  imageCarouselItem: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    required: true,
  },
});

const ImageCarousel = mongoose.model("ImageCarousel", ImageCarouselScehma);

export default ImageCarousel;