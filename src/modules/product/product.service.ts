import { pool } from "../../database";
import type { IProduct } from "./product.interface";


const createProductIntoDatabase = (payLoad : IProduct)=>{
    const {name,  description, price, in_stock, category_id, brand = null } = payLoad;

    const result = pool.query(`
        INSERT INTO products(name,  description, price, in_stock,category_id, brand) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
        `, [name,  description, price, in_stock,category_id, brand])
    return result;
}

const productService = {
    createProductIntoDatabase
}

export default productService;