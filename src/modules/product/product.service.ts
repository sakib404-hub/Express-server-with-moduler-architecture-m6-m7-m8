import { pool } from "../../database";
import type { IProduct } from "./product.interface";


const createProductIntoDatabase = (payLoad: IProduct) => {
    const { name, description, price, in_stock, category_id, brand = null } = payLoad;

    const result = pool.query(`
        INSERT INTO products(name,  description, price, in_stock,category_id, brand) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
        `, [name, description, price, in_stock, category_id, brand])
    return result;
}

const getAllProductsFromDatabase = async () => {
    const result = await pool.query(`SELECT * FROM products`);
    return result;
}

const getSingleProductFromDatabase = async (id: string) => {
    const result = await pool.query(`SELECT * FROM products WHERE id = $1`, [id]);
    return result;
}

const updateProductInformationIntoDatabase = async (id: string, payLoad: IProduct) => {

    const { name, description, price, in_stock, category_id, brand } = payLoad;

    const result = await pool.query(`
        UPDATE products 
        SET
        name =  COALESCE($1, name),
        description =  COALESCE($2, description),
        price =  COALESCE($3, price),
        in_stock =  COALESCE($4, in_stock),
        category_id =  COALESCE($5, category_id),
        brand =  COALESCE($6, brand),

        updated_at = NOW() WHERE id = $7 RETURNING *
        `, [name, description, price, in_stock, category_id, brand, id])
    return result;
}


const deleteProductFromDatabase = async (id: string) => {
    const result = await pool.query(`DELETE FROM products WHERE id = $1 RETURNING *`, [id]);
    return result;
}


const productService = {
    createProductIntoDatabase,
    getAllProductsFromDatabase,
    getSingleProductFromDatabase,
    updateProductInformationIntoDatabase,
    deleteProductFromDatabase
}

export default productService;