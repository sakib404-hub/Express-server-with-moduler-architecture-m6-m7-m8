import { Router } from "express";
import productController from "./product.controller";


const router = Router();

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getSingleProduct);
router.put('/:id', productController.updateProductInformation);
router.delete('/:id', productController.deleteProduct);


export const productRoute = router;