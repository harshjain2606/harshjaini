import Router from 'express'
import { createProduct, deleteProduct, getProduct, updateProduct } from '../controllers/product.controller.js';

const router = Router();

router.route("/").get(getProduct);
router.route("/createproduct").post(createProduct);
router.route('/updateproduct/:id').put(updateProduct);
router.route('/deleteproduct/:id').delete(deleteProduct);



export default router;