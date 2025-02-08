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
// router.get("/", async (req, res) => {
  // try {
  //   const { limit = 10, page = 1, sort, query, available } = req.query;

  //   const limitNumber = parseInt(limit, 10);
  //   const pageNumber = parseInt(page, 10);

  //   if (isNaN(limitNumber) || limitNumber <= 0) {
  //     return res
  //       .status(400)
  //       .send({ error: "El parámetro 'limit' debe ser un número positivo." });
  //   }

  //   if (isNaN(pageNumber) || pageNumber <= 0) {
  //     return res
  //       .status(400)
  //       .send({ error: "El parámetro 'page' debe ser un número positivo." });
  //   }
  //   const filter = {};
  //   if (query) {
  //     console.log("si query", query);
  //     filter.category = query;
  //     console.log("filter::", filter);
  //   }


  //   if (available) {
  //     if (available === 'true') {
  //       filter.status = true; 
  //     } else if (available === 'false') {
  //       filter.status = false; 
  //     }
  //     console.log("filter con disponibilidad:", filter);
  //   }

   
  //   const options = {
  //     limit: limitNumber, 
  //     page: pageNumber,
  //     sort,
  //     filter: filter,
  //   };

  //   const data = await productsServices.get(options); 

  //   res.status(200).send({ error: null, data });
  // } catch (err) {
  //   console.error("Error al obtener productos:", err);
  //   res.status(500).send({ error: "Error interno del servidor" });
  // }
// });

router.get("/paginated/:pg?", async (req, res) => {
  const pg = req.params.pg || 1;
  const data = await productsServices.getPaginated(pg);
  res.status(200).send({ error: null, data });
});

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



