const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(+process.env.PASSWORD_SALT_ROUNDS);

export const hash = (password: string) => bcrypt.hashSync(password, salt);

export const compare = (password: string, hash: string) =>
  bcrypt.compareSync(password, hash);
