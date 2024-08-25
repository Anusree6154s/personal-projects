const { WishList } = require('../../src/model/wishlist.model');

const insertWishlist = async (obj) => {
  const data = await WishList.create(obj);
  return data
};

const deleteWishlist = async () => {
  await WishList.deleteMany();
};

module.exports = {
  insertWishlist, deleteWishlist,
};
