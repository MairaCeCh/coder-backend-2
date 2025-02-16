import { Router } from "express";
import  {productsController} from "../controllers/products.controller.js";
import { authorization } from "../middlewares/authorization.middlewares.js";

const router = Router();

router.get("/", productsController.getAll); 

router.get("/paginated/", productsController.getFiltered);

router.get("/paginated/:page", productsController.getFiltered);

router.get("/:pid", productsController.getById);

router.post("/",authorization("admin"), productsController.create);

router.put("/:pid",authorization("admin"), productsController.update);

router.delete("/:pid",authorization("admin"), productsController.deleteOne);

export default router;



