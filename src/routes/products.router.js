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


router.get("/all", async (req, res) => {
  const data = await productsServices.getAll();
  res.status(200).send({ error: null, data });
});


router.post("/", async (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } =
    req.body;
  const status = req.body.status === undefined ? true : req.body.status;

  if (
    !title ||
    !description ||
    !code ||
    !price ||
    status === undefined ||
    !stock ||
    !category
  ) {
    return res
      .status(400)
      .send({ error: "Faltan campos obligatorios", data: [] });
  }

  const newProduct = {
    id: nanoid(10),
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails: thumbnails || [],
  };

  try {
    const process = await productsServices.add(newProduct);
    res.status(200).send({ error: null, data: process });
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    res.status(500).send({ error: "Error al agregar el producto", data: [] });
  }
});

router.put("/:pid", productsController.update);

router.delete("/:pid", productsController.deleteOne);

export default router;



