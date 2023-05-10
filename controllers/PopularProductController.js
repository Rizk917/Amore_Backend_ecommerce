import PopularProduct from "../models/popularProduct.js";

// Add a new popular product
const addPopularProduct = async (req, res) => {
  const { productId } = req.body;

  try {
    const existingPopularProduct = await PopularProduct.findOne({ productId });

    if (existingPopularProduct) {
      // If the popular product already exists, return it
      res.status(200).json(existingPopularProduct);
    } else {
      // If the popular product does not exist, create a new one
      const newPopularProduct = new PopularProduct({ productId });
      await newPopularProduct.save();
      res.status(201).json(newPopularProduct);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete a popular product
const deletePopularProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPopularProduct = await PopularProduct.findByIdAndDelete(id);

    if (!deletedPopularProduct) {
      return res.status(404).json({ message: "Popular product not found" });
    }

    res.status(200).json({ message: "Popular product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
const getAllPopularProducts = async (req, res) => {
  try {
    const popularProducts = await PopularProduct.find().populate("productId");

    res.status(200).json(popularProducts);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export { getAllPopularProducts, deletePopularProduct, addPopularProduct };
