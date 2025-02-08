class CartsServices{


    async addProductToCart(cid, pid){

        const cart = await cartDao.getById(cid);

    }
}
export const cartsServices = new CartsServices();