import Category from "../models/category.js";
import slugify from "slugify";

export const createCategory = async (req, res)=>{
    try {
        const { name } = req.body
        if (!name) {
            return res.status(400).json("name is required")
        }

        const existingCategory = await Category.findOne({name})

        if (existingCategory) {
            return res.status(400).json({success: false, message:"category already exists"})
        }

        const category = await new Category({name, slug: slugify(name)}).save()
        res.json({success: true, message: "category created successfully", category})

    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, message:"internal server error", errMsg: err.message});
    }
}


export const createCategoryById = async(req, res)=>{
    try {
      const { productId } = req.params

      const category = await Category.findById({_id: productId})
      if (!category) {
        return res.status(404).json({success: false, message:"product not found "})
      }
      res.json({success: true, message: "product Retrieved successfully", product})

    } catch (err) {
      console.log("Error creating product", err.message);
      res.status(500).json({success: false, error: "Internal server error", message: err.message})
      
    }
}


export const createCategoryBySlug = async(req, res)=>{
    try {
      const { slug } = req.params

      const category = await Category.findOne({ slug: slug })
    } catch (err) {
      console.log("Error creating product", err.message);
      res.status(500).json({success: false, error: "Internal server error", message: err.message})
      
    }
}



export const updateCategory = async(req, res)=>{
    try {
      const { name } = req.body
      const { productId } = req.params

    //   find the productbyId from the database

    const category = await Category.findById({_id: productId})
    if (!category) {
      return res.status(404).json({success: false, message:"product not found "})
    }

    if (name) {
        const slugName = slugify(name)
        category.slug = slug(name) || category.slug
    }

    
    // update the fields
    // product.title = title || product.title
    // product.desc = desc || product.desc
    // product.price = price || product.price
    // product.isAvailable = isAvailable || product.isAvailable
    

    // save the updatedProduct
    const updatedCategory = await category.save()

    res.json({success: true, message: "product updated successfully", updatedProduct})
    

    } catch (err) {
      console.log("Error creating product", err.message);
      res.status(500).json({success: false, error: "Internal server error", message: err.message})
      
    }
}


export const deleteCategory = async(req, res)=>{
    try {
      
    } catch (err) {
      console.log("Error creating product", err.message);
      res.status(500).json({success: false, error: "Internal server error", message: err.message})
      
    }
  }

  




