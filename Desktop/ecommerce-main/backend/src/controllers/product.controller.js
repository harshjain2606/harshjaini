import mongoose from "mongoose"
import { asyncHandler } from "../utils/asyncHandler.js"
import Product from "../models/product.model.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const getProduct = asyncHandler(async (req, res) => {
        try {
          const products = await Product.find({});
             return res
             .status(200)
             .json(
                new ApiResponse(201, products, "Sucessfully get products")
             )      
        } catch (error) {
            throw new ApiError(401, "server error")
        }
})



// add product

const createProduct = asyncHandler(async (req, res) => {
       try {

         const {name, price, image} = req.body;
            
         // console.log(name)

         if(!price || !name || !image){
             throw new ApiError(401, "All fields are required");
         }

         const newProduct = new Product({name, price, image})
               await newProduct.save();

           return res
           .status(200)
           .json(new ApiResponse(201, newProduct, "product created successfully"))
           
       } catch (error) {
          console.log("error is:" , error?.message);
           throw new ApiError(401, "server error")
       }
})

// update product

const updateProduct = asyncHandler(async(req,res) => {
    
    try {
       const {id} = req.params
        // console.log(id)
         const {name, price, image} = req.body; 
          console.log(name)
          if(!mongoose.Types.ObjectId.isValid(id)){
               throw new ApiError(401, "invalid product id");
          } 

       const updatedProduct = await Product.findByIdAndUpdate(id, {name, price, image}, {new: true});
               if(!updatedProduct){
                 throw new ApiError(404, "product not found")
               } 
       
       return res
         .status(200)
         .json(new ApiResponse(201, updatedProduct, "Product updated successfully"));   

   } catch (error) {
        console.log(error?.message)
       throw new ApiError(401, "Internal server error")
   }
})

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
    try {
         const {id} = req.params;
          console.log(id)
         if(!mongoose.Types.ObjectId.isValid(id)){
             throw new ApiError(404, "product id not found")
         }
          
        const product =  await Product.findByIdAndDelete(id);
            console.log(product.name)
             
        

           return res
           .status(200)
           .json(
            new ApiResponse(201, "Product deleted successfully")
           )
    } catch (error) {
        console.log("Error is:", error?.message);
        throw new ApiError(401, "internal server error")
    }
})


export {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}