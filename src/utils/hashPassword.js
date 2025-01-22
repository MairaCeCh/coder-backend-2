import bcrypt from 'bcrypt';

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10) );

console.log(bcrypt)
}

export const isValidPassword = (password, user) => {
    return bcrypt.compareSync(password, user.password);
}