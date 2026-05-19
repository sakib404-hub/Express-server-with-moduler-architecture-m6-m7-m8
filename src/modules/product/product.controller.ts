import type { Request, Response } from "express";
import { sendResponse } from "../../utility/sendResponse";
import productService from "./product.service";
import type { IProduct } from "./product.interface";


const createProduct = async(req : Request, res : Response) =>{
    try{
        const body : IProduct = req.body;

        if(!body.name || !body.price || !body.category_id){
            return sendResponse(res, 400, false, 'Product creation Failed, missing required fields');
        }

        const result = await productService.createProductIntoDatabase(body);

        if(result.rowCount === 0){
            return sendResponse(res, 500, false, 'Product creation failed');
        }

        return sendResponse(res, 201, true, 'Product is created successfully', result.rows[0]);

    }catch(err : any){
        return sendResponse(res, 500, false, err.message);
    }
}

const getAllProducts = async(req : Request, res : Response)=>{
    try{
        
        const result = await productService.getAllProductsFromDatabase();

        sendResponse(res, 200, true, result.rowCount === 0 ? 'No Product Found' : 'Products fetched successfulluy', result.rows);

    }catch(err : any){
          return sendResponse(res, 500, false, err.message);
    }
}

const getSingleProduct = async(req : Request, res : Response)=>{
    try{
        const { id } = req.params;

        const result = await productService.getSingleProductFromDatabase(id as string);

        if(result.rowCount === 0){
            return sendResponse(res, 404, false, 'Product not found!');
        }
        console.log(result.rows[0]);

        return sendResponse(res, 200, true, 'Product Information fetched successfully', result.rows[0]);

    }catch(err : any){
       console.error(err);
        return sendResponse(res, 500, false, "Internal Server Error");
    }
}

const deleteProduct = async(req : Request, res : Response)=>{
    try{
        const id = req.params.id;

        const result = await productService.deleteProductFromDatabase(id as string);

        if(result.rows.length === 0){
            return sendResponse(res, 404, false, 'No product found with the id');
        }

        return sendResponse(res, 200, true, 'Product Information Deleted successfully', result.rows[0])

    }catch(err : any){
        console.log(err.message);
        return sendResponse(res, 500, false, 'Internal Server Error');
    }
}

const productController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct
}

export default productController;