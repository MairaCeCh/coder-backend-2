import jwt from 'jsonwebtoken';

export const createToken = (user) => {
  const { _id, email, role } = user;
  const token = jwt.sign({ _id, email, role }, "codigoSecreto", { expiresIn: "1h" });
  console.log(token);
  return token;
};

export const verifyToken = (token) => {
  try {

    return jwt.verify(token, "codigoSecreto");
  } catch (error) {
    console.error("Error verifying token:", error.message);
    console.log("🚀 ~ file: jwt.js ~ line 20 ~ verifyToken ~ token", token);
    return null;
  }
};

export const decodedToken = (token) => {
  try {
    return jwt.decode(token, "codigoSecreto");
  } catch (error) {
    console.error("Error decoding token:", error.message);
    console.log("🚀 ~ file: jwt.js ~ line 30 ~ decodedToken ~ token", token);
    return null;
  }
};