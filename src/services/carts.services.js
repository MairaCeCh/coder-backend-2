import { Carts } from "../dao/factory.js";
import { Products } from "../dao/factory.js"

let cartDao = new Carts()
let productDao = new Products()

class CartsServices {

    async getAll() {
        return await cartDao.getAll();
    }

    async getById(id) {
        return await cartDao.getById(id);
    }

    async fOne(data) {
        return await cartDao.fOne(data);
    }

    async getOne(data) {
        return await cartDao.getOne(data);
    }

    async addProduct(data) {
        return await cartDao.addProduct(data);
    }

    async create() {
        return await cartDao.create();
    }

    async add(data) {
        return await cartDao.add(data);
    }

    async update(filter, updated, options) {
        return await cartDao.update(filter, updated, options);
    }

    async delete(data, opcions) {
        return await cartDao.delete(data, opcions);
    }

    async clearProductsToCart(cid) {
        return await cartDao.update(cid, { products: [] });
    }

    async purchaseCart(cid) {
        const cart = await cartDao.getById(cid);

        let total = 0;
        const productsWhitOutStock = [];

        for (const productCart of cart.products) {
            const prod = await productDao.getById(productCart._id);
            console.log("🚀 ~ CartsServices ~ purchaseCart ~ prod:", prod)


            if (prod.stock >= productCart.quantity) {
                total += prod.price * productCart.quantity;

                await productDao.update(prod._id, { stock: prod.stock - productCart.quantity }); 
            
            } else {
                console.log("dsfasdf sis")
                productsWhitOutStock.push(productCart);
            }



        }
        const carritoo = await cartDao.getById(cid)
        console.log("🚀 ~ CartsServices ~ purchaseCart ~ carritoo :", carritoo )
       
        await cartDao.update(cid, { products: productsWhitOutStock });
        return total;
    }

}

export const cartServices = new CartsServices();