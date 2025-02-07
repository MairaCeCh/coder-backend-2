import { productsServices } from "../services/products.services.js";

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
        const { limit = 10, page = 1, sort, query, available } = req.query;
    
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
          sort,
          filter: filter,
        };
    
        const data = await productsServices.getFiltered(options); 
    
        res.status(200).send({ error: null, data });
      } catch (err) {
        console.error("Error al obtener productos:", err);
        res.status(500).send({ error: "Error interno del servidor" });
      }
        }
  
    async getById(req, res){
  
    }

    async deleteOne(req, res){
      const productId = req.params.pid;
      const filter = { _id: productId };
      const options = {};
    
      try {
        const product = await productsServices.delete(filter, options);
    
        if (!product) {
          return res.status(404).send({ error: "Product not found", data: null });
        }
        res.status(200).send({ error: null, data: product });
      } catch (error) {
        console.error("Error al borrar el producto:", error);
        res.status(500).send({ error: "Error al borrar el producto", data: null });
      }
    }
    async update(req, res){
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
    async create(req, res){}
}

export const productsController = new ProductsController();