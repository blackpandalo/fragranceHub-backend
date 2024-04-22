import Rating from '../models/rating.js';
import Product from '../models/product.js';



// Controller function to add a new rating
export const addRating = async (req, res) => {
  try {
    const { productId, rating, review } = req.body;
    const userId  = req.user._id;
    const newRating = new Rating({ userId, productId, rating, review });
    await newRating.save();
    res.status(201).json({ success: true, message: 'Rating added successfully', newRating });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add rating', error: error.message });
  }
};

// Controller function to get ratings for a specific product
export const getProductRatings = async (req, res) => {
  try {
    const productId = req.params.productId;
    const ratings = await Rating.find({ productId }).populate('userId');
    res.status(200).json({ success: true, ratings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get ratings', error: error.message });
  }
};

// Controller function to get ratings given by a specific user
export const getUserRatings = async (req, res) => {
  try {
    const userId = req.params.userId;
    const ratings = await Rating.find({ userId }).populate('productId');
    res.status(200).json({ success: true, ratings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get user ratings', error: error.message });
  }
};

// Controller function to update a rating
export const updateRating = async (req, res) => {
  try {
    const ratingId = req.params.ratingId;
    const { rating } = req.body;
    const updatedRating = await Rating.findByIdAndUpdate(ratingId, { rating }, { new: true });
    if (!updatedRating) {
      return res.status(404).json({ success: false, message: 'Rating not found' });
    }
    res.status(200).json({ success: true, message: 'Rating updated successfully', rating: updatedRating });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update rating', error: error.message });
  }
};

// Controller function to delete a rating
export const deleteRating = async (req, res) => {
  try {
    const ratingId = req.params.ratingId;
    const deletedRating = await Rating.findByIdAndDelete(ratingId);
    if (!deletedRating) {
      return res.status(404).json({ success: false, message: 'Rating not found' });
    }
    res.status(200).json({ success: true, message: 'Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete rating', error: error.message });
  }
};