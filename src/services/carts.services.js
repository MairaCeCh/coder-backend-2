import { Carts } from "../dao/factory.js";

let cartDao = new Carts()

class CartsServices {
    async getAll() {
        return await cartDao.getAll();
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
}

export const cartServices = new CartsServices();