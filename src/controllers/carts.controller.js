
import { cartServices } from "../services/carts.services.js";
import { nanoid } from "nanoid";

export class CartController {

    async getAll(req, res) {
        const process = await cartServices.getAll()
        res.status(200).send({ error: null, data: process })
    }

    async getOne(req, res) {
        const cartID = req.params.cid;
        try {
            const cart = await cartServices.getOne({ _id: cartID });
            res.send({ cart });
        } catch (error) {
            console.error('Error al obtener productos:', error);
            res.status(500).render('error', { message: 'Error al cargar los productos' });
        }
    }

    async addProduct(req, res) {
        const { cid, pid } = req.params;
    
        try {
            let cart = await cartServices.fOne({ _id: cid });
            console.log("cart:", cart);
            if (!cart) {
                return res.status(404).json({ message: "Carrito no encontrado" });
            }

            // Encuentra el producto en el carrito
            let productInCart = cart.products.find(p => p._id.toString() ==  pid);
            console.log("productInCart:", productInCart);
            if (productInCart) {
                // Si el producto ya está en el carrito, incrementa la cantidad
                productInCart.quantity += 1;
            } else {
                // Agrega el nuevo producto al carrito
                console.log("ffff")
                cart.products.push({ _id: pid, quantity: 1 });
                console.log("eee");
            }
            console.log("cart.products:", cart.products);
            // Guarda el carrito actualizado
            await cartServices.update({ _id: cid }, { products: cart.products });
            res.status(200).json({ message: "Producto añadido/existente actualizado exitosamente", cart });
        } catch (error) {
            res.status(500).json({ message: "Ocurrió un error", error });
        }
    }

    async create(req, res) {
        const process = await cartServices.create({ products: [] });
        res.status(201).send({ error: null, data: process });
    }

    async deleteOneProduct(req, res) {
        const { cid, pid } = req.params;

        try {

            const cart = await cartServices.fOne({ _id: cid });
            if (!cart) {
                return res.status(404).send({ error: 'Carrito no encontrado' });
            }

            const updatedProducts = cart.products.filter(product => product._id.toString() !== pid);

            const updatedCart = await cartServices.update(
                { _id: cid },
                { products: updatedProducts },
                { new: true }
            );

            res.status(200).send({ error: null, data: updatedCart });
        } catch (err) {
            console.error("Error al eliminar el producto del carrito:", err);
            res.status(500).send({ error: "Error interno del servidor" });
        }
    }

    async delete(req, res){
        const { cid } = req.params;

        try {
            const cart = await cartServices.fOne({ _id: cid });
            if (!cart) {
                return res.status(404).send({ error: 'Carrito no encontrado' });
            }

            await cartServices.delete({ _id: cid });

            res.status(200).send({ error: null, message: 'Carrito eliminado exitosamente' });
        } catch (err) {
            console.error("Error al eliminar el carrito:", err);
            res.status(500).send({ error: "Error interno del servidor" });
        }
    }
}
export const cartsController = new CartController()