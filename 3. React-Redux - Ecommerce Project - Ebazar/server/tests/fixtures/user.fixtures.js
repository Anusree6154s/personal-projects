const { User } = require('../../src/model/user.model');
const { faker } = require('@faker-js/faker')
const crypto = require("crypto");

const password = faker.internet.password()
const salt = crypto.randomBytes(16)
const hashedPassword = crypto.pbkdf2Sync(password, salt, iterations = 310000, keylen = 32, digest = "sha256")

const dbDataOne = {
  email: faker.internet.email(),
  password: hashedPassword,
  role: 'user',
  addresses: [],
  orders: [],
  salt: salt,
}

const userOne = {
  email: dbDataOne.email,
  password,
}

const userTwo = {
  email: faker.internet.email(),
  password: faker.internet.password()
}

const insertUsers = async (obj) => {
  const data = await User.create(obj);
  return data
};

const deleteUsers = async () => {
  await User.deleteMany();
};

const getUserId= async()=>{
  const data = await insertUsers(dbDataOne)
  return data._id.toString()
}

module.exports = {
  insertUsers, userOne, userTwo, deleteUsers, dbDataOne
};
