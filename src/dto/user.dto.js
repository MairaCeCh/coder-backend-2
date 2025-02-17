
import crypto from "crypto";
import config from "../config.js";


class UserDTO {
  constructor(data) {
    config.PERSISTENCE !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role || "USER";
    this.verifyUser = data.verifyUser || false;
    this.verifyCode = data.verifyCode || "1234";
    this.isOnline = data.isOnline || false;
    PERSISTENCE !== "mongo" && (this.createdAt = new Date());
    PERSISTENCE !== "mongo" && (this.updatedAt = new Date());
  }
}

export default UserDTO;