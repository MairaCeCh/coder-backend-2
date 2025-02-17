import * as url from "url";
import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || 8080,
  DIRNAME: url.fileURLToPath(new URL(".", import.meta.url)),

  get UPLOADS_DIR() {
    return `${this.DIRNAME}/public/uploads`;
  },

  PERSISTENCE: process.env.PERSISTENCE,
  MONGODB_URI: process.env.MONGODB_URI,

  CART_COLLECTION: 'carts',
  PRODUCTS_COLLECTION: 'products'
};

export default config;