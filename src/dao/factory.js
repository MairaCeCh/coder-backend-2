import config from "../config.js";

export let Products;
export let Carts;
export let Users;

switch(config.PERSISTENCE) {
  case "fs":
    const { default: ProductsFs } = await import('./fs/product.dao.js');
    const { default: CartsFs } = await import('./fs/cart.dao.js');
    const { default: UsersFs } = await import('./fs/user.dao.js');
    Products = ProductsFs;
    Carts = CartsFs;
    Users = UsersFs;
    break;
  case "mongo":
    const { default: ProductsMongo } = await import('./mongo/product.dao.js');
    const { default: CartsMongo } = await import('./mongo/cart.dao.js');
    const { default: UsersMongo } = await import('./mongo/user.dao.js');
    Products = ProductsMongo;
    Carts = CartsMongo;
    Users = UsersMongo;
    break;
  default:
    throw new Error(`Unknown persistence type: ${config.PERSISTENCE}`);
}