
import { cartServices } from "../services/carts.services.js";
import { nanoid } from "nanoid";

export class ProductsController {

    async getAll(req, res) {
        const process = await cartServices.getAll()
        res.status(200).send({ error: null, data: process })
    }

    async fOne(req, res) {
        const { cid, pid } = req.params;
        const cart = await cartServices.fOne({ _id: cid });

        if (!cart) {
            console.log('Carrito no encontrado:', cart);
            return res.status(406).send({ error: "Carrito no encontrado" });
        }

        const productInCart = cart.products.find((product) => product._id.toString() === pid);

        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.products.push({ _id: pid, quantity: 1 });
        }


        const cartToUpdate = {
            _id: cart._id.toString(),
            products: cart.products
        };

        const updatedCart = await cartServices.addProduct(cartToUpdate);

        res.status(200).send({ error: null, data: updatedCart });
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


    async addProduct(req, res) { }

    async create(req, res) {
        const process = await cartServices.create({ products: [] });
        res.status(201).send({ error: null, data: process });
    }

    async add(req, res) { }

    async update(req, res) { }

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

}
export const cartsController = new ProductsController()