import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";

// import {cartDao} from "../dao/cart.dao.js";

const router = Router();


let storeProducts = [];



router.get("/", cartsController.getAll); 

router.get("/:cid", cartsController.getOne);


router.post("/", cartsController.create);


router.put("/:cid/products/:pid", cartsController.fOne);

router.delete('/:cid/products/:pid', cartsController.deleteOneProduct);

router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartServices.fOne({ _id: cid });
        console.log('cart:', cart);
        
        if (!cart) {
            return res.status(404).send({ error: 'Carrito no encontrado' });
        }

        const updatedCart = await cartServices.update(
            { _id: cid }, 
            { products: [] }, 
            { new: true } 
        );

        res.status(200).send({ error: null, data: updatedCart });
    } catch (err) {
        console.error("Error al eliminar todos los productos del carrito:", err);
        res.status(500).send({ error: "Error interno del servidor" });
    }
});

export default router;
 