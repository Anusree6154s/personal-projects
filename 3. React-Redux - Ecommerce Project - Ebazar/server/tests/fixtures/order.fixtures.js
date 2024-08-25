const { faker } = require('@faker-js/faker')
const crypto = require("crypto");
const { Order } = require('../../src/model/order.model');

// const password = faker.internet.password()
// const salt = crypto.randomBytes(16)
// const hashedPassword = crypto.pbkdf2Sync(password, salt, iterations = 310000, keylen = 32, digest = "sha256")

// const dbDataOne = {
//   email: faker.internet.email(),
//   password: hashedPassword,
//   role: 'user',
//   addresses: [],
//   orders: [],
//   salt: salt,
// }

// const userOne = {
//   email: dbDataOne.email,
//   password,
// }

// const userTwo = {
//   email: faker.internet.email(),
//   password: faker.internet.password()
// }

const insertOrders = async (objArray) => {
  let orders = [];
  for (const obj of objArray) {
      const data = await Order.create(obj);
      orders.push(data);
  }
  return orders;
};

const deleteOrders = async () => {
  await Order.deleteMany();
};

const getOrder = (userId, productId, totalPrice) => {
  return {
    items: [
      {
        product: productId,
        quantity: 2,
        price: 50,
      },
    ],
    totalPrice: 100,
    totalItems: 1,
    user: userId,
    paymentMethod: 'Credit Card',
    selectedAddress: {
      street: faker.location.street(),
      city: faker.location.city(),
      zipcode: faker.location.city(),
    },
    date: new Date().toISOString(),
    email: faker.internet.email(),
  };
}

module.exports = {
  insertOrders, deleteOrders, getOrder
};
