import { Router } from "express";
import { nanoid } from "nanoid";
import  {productsController} from "../controllers/products.controller.js";

import ProductDao from "../dao/product.dao.js";

const router = Router();
///borrado ahora//
// const controller = new ProductDao();

const midd1 = (req, res, next) => {
  console.log("se recibio una solicitud GET");
  next();
};

router.get("/", productsController.getAll); 

router.get("/paginated/", productsController.getFiltered);

router.get("/paginated/:page", productsController.getFiltered);

router.get("/:pid", productsController.getById);



router.post("/", productsController.create);

router.put("/:pid", productsController.update);

router.delete("/:pid", productsController.deleteOne);

export default router;



