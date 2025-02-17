import mongoose from 'mongoose';
import config from "../../../config.js";

const userCollection = " users";

const userSchema = new mongoose.Schema({
    first_Name:String,
    last_Name:String,
    email:{
        type:String,
        unique:true,
    },
    age: Number,
    password: String,
    role : {
        type: String,
        default: "user",
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId, ref: config.CART_COLLECTION
    }
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel


