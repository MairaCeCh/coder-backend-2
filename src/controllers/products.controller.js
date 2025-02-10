import { productsServices } from "../services/products.services.js";
import { nanoid } from "nanoid";

export class ProductsController{

    async getAll(req, res){
        try {
            const data = await productsServices.getAll();
            res.status(200).send({ error: null, data });
          } catch (err) {
            console.error("Error al obtener productos:", err);
            res.status(500).send({ error: "Error interno del servidor" });
          }}

     async getFiltered(req, res) {
      try {
        const { limit = 10, sort, query, available } = req.query;
        const page = parseInt(req.params.page, 10) || 1;
        console.log("sort:", sort);
    
        const limitNumber = parseInt(limit, 10);
        const pageNumber = parseInt(page, 10);
    
        if (isNaN(limitNumber) || limitNumber <= 0) {
          return res
            .status(400)
            .send({ error: "El parámetro 'limit' debe ser un número positivo." });
        }
    
        if (isNaN(pageNumber) || pageNumber <= 0) {
          return res
            .status(400)
            .send({ error: "El parámetro 'page' debe ser un número positivo." });
        }
        const filter = {};
        if (query) {
          console.log("si query", query);
          filter.category = query;
          console.log("filter::", filter);
        }
    
    
        if (available) {
          if (available === 'true') {
            filter.status = true; 
          } else if (available === 'false') {
            filter.status = false; 
          }
          console.log("filter con disponibilidad:", filter);
        }
    
       
        const options = {
          limit: limitNumber, 
          page: pageNumber,
          sort: sort,
          filter: filter,
        };
    
        const data = await productsServices.getFiltered(options); 
    
        console.log(page)
        res.status(200).send({ error: null, data });
      } catch (err) {
        console.error("Error al obtener productos:", err);
        res.status(500).send({ error: "Error interno del servidor" });
      }
        }
  
    async getById(req, res){
      const productId = req.params.pid;
      const filter = { _id: productId };
      const updated = req.body;
      const options = { new: true };
    
      const process = await productsServices.update(filter, updated, options);
    
      if (process) {
        res.status(200).send({ error: null, data: process });
      } else {
        res.status(404).send({ error: "No se encuentra el producto", data: [] });
      }
    }
    async deleteOne(req, res){
      const productId = req.params.pid;
      const filter = { _id: productId };
      const options = {};
    
      try {
        const product = await productsServices.deleteOne(filter, options);
    
        if (!product) {
          return res.status(404).send({ error: "Product not found", data: null });
        }
        res.status(200).send({ error: null, data: product });
      } catch (error) {
        console.error("Error al borrar el producto:", error);
        res.status(500).send({ error: "Error al borrar el producto", data: null });
      }
    }
    async update(req, res) {
      try {
          const productId = req.params.pid;
          const updatedData = req.body;
          const updatedProduct = await productsServices.update({_id: productId}, updatedData);
          if (!updatedProduct) {
              return res.status(404).send({ error: "Product not found" });
          }
          res.status(200).send({ error: null, data: updatedProduct });
      } catch (err) {
          console.error("Error al actualizar el producto:", err);
          res.status(500).send({ error: "Error interno del servidor" });
      }
  }
    async create(req, res){
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
          const process = await productsServices.create(newProduct);
          res.status(200).send({ error: null, data: process });
        } catch (error) {
          console.error("Error al agregar el producto:", error);
          res.status(500).send({ error: "Error al agregar el producto", data: [] });
        }
    }
}

export const productsController = new ProductsController();