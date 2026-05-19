import { pool } from "../../database";
import type { IProduct } from "./product.interface";


const createProductIntoDatabase = (payLoad : IProduct)=>{
    const {name,  description, price, in_stock, category_id, brand = null } = payLoad;

    const result = pool.query(`
        INSERT INTO products(name,  description, price, in_stock,category_id, brand) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
        `, [name,  description, price, in_stock,category_id, brand])
    return result;
}

const getAllProductsFromDatabase = async()=>{
    const result = await pool.query(`SELECT * FROM products`);
    return result;
}

const getSingleProductFromDatabase = async(id : string)=>{
    const result = await pool.query(`SELECT * FROM products WHERE id = $1`, [id]);
    return result;
}

const deleteProductFromDatabase = async(id : string) =>{
    const result = await pool.query(`DELETE FROM products WHERE id = $1 RETURNING *`,[id]);
    return result;
}


const productService = {
    createProductIntoDatabase,
    getAllProductsFromDatabase,
    getSingleProductFromDatabase,
    deleteProductFromDatabase
}

export default productService;