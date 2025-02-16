import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";

const router = Router();

router.get("/", cartsController.getAll); 

router.get("/:cid", cartsController.getOne);

router.post("/", cartsController.create);

router.put("/:cid/products/:pid", cartsController.addProduct);

router.put("/:cid/products/:pid", cartsController.fOne);

router.delete('/:cid/products/:pid', cartsController.deleteOneProduct);

router.delete('/:cid', cartsController.delete);

export default router;
 