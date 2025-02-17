import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";
import { authorization } from "../middlewares/authorization.middlewares.js";
import { passportCall } from "../middlewares/passportCall.middlewares.js"

const router = Router();

router.get("/",authorization("admin"), cartsController.getAll); 

router.get("/:cid",authorization("user"), cartsController.getOne);

router.post("/",authorization("user"), cartsController.create);

router.put("/:cid/products/:pid",authorization("user"), cartsController.addProduct);

router.delete('/:cid/products/:pid',authorization("user"), cartsController.deleteOneProduct);

router.delete('/:cid',authorization("user"), cartsController.delete);

router.post("/:cid/purchase", passportCall("jwt"), authorization("user"), cartsController.purchaseCart)

export default router;
 