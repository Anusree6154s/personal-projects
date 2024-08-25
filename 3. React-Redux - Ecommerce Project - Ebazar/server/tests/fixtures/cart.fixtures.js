const { Cart } = require('../../src/model/cart.model');

const insertCart = async (obj) => {
  const data = await Cart.create(obj);
  return data
};

const deleteCart = async () => {
  await Cart.deleteMany();
};

module.exports = {
  insertCart, deleteCart,
};
