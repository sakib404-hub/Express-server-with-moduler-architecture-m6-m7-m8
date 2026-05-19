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

const productController = {
    createProduct
}

export default productController;