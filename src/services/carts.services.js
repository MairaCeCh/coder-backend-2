import { cartDao} from "../dao/cart.dao.js";


class ProductsServices {
    async getAll() {
        return await cartDao.get();
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

    async delate(data, opcions) {
    return await cartDao.delate(data, opcions);
    }
}

export const cartServices = new ProductsServices();