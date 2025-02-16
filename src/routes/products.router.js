import { Router } from "express";
import  {productsController} from "../controllers/products.controller.js";
import { authorization } from "../middlewares/authorization.middlewares.js";

const router = Router();

router.get("/", productsController.getAll); 

router.get("/paginated/", productsController.getFiltered);

router.get("/paginated/:page", productsController.getFiltered);

router.get("/:pid", productsController.getById);

router.post("/",authorization("user"), productsController.create);

router.put("/:pid", productsController.update);

router.delete("/:pid", productsController.deleteOne);

export default router;



