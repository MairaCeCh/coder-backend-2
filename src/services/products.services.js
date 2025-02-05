import productDao from '../dao/product.dao.js';


class ProductsServices {
    async getAll() {
        return await productDao.getAll();
    }

    async getFiltered(options) {
        return await productDao.getFiltered(options);
    }

    async getById(id) {
    return await productDao.getById(id);
    }
    async deleteOne(id) {   
    return await productDao.deleteOne(id);
    }
    async update(id, data) {
    return await productDao.update(id, data);
    }
    async create(data) {
    return await productDao.create(data);
    }
}

export const productsServices = new ProductsServices();