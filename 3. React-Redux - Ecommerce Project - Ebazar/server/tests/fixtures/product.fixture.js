const { Product } = require("../../src/model/product.model");

const product1 = {
    title: "Sample Product 1",
    description: "This is a sample product.",
    price: 99.99,
    discountPercentage: 10,
    rating: 4.5,
    stock: 100,
    brand: "SampleBrand 1",
    category: "SampleCategory 1",
    thumbnail: "http://example.com/thumbnail.jpg",
    images: ["http://example.com/image1.jpg", "http://example.com/image2.jpg"],
    highlights: ["High quality", "Best value"],
};
const product2 = {
    title: "Sample Product 2",
    description: "This is a sample product.",
    price: 99.99,
    discountPercentage: 10,
    rating: 4.5,
    stock: 100,
    brand: "SampleBrand 2",
    category: "SampleCategory 2",
    thumbnail: "http://example.com/thumbnail.jpg",
    images: ["http://example.com/image1.jpg", "http://example.com/image2.jpg"],
    highlights: ["High quality", "Best value"],
};

const product3 = {
    title: "Sample Product 3",
    description: "This is a sample product.",
    price: 99.99,
    discountPercentage: 10,
    rating: 4.5,
    stock: 100,
    brand: "SampleBrand 3",
    category: "SampleCategory 3",
    thumbnail: "http://example.com/thumbnail.jpg",
    images: ["http://example.com/image1.jpg", "http://example.com/image2.jpg"],
    highlights: ["High quality", "Best value"],
};

const product4 = {
    title: "Sample Product 4",
    description: "This is a sample product.",
    price: 99.99,
    discountPercentage: 10,
    rating: 4.5,
    stock: 100,
    brand: "SampleBrand 4",
    category: "SampleCategory 4",
    thumbnail: "http://example.com/thumbnail.jpg",
    images: ["http://example.com/image1.jpg", "http://example.com/image2.jpg"],
    highlights: ["High quality", "Best value"],
};


const deleteProducts = async () => {
    await Product.deleteMany();
};

const insertProducts = async (objArray) => {
    let products = [];
    for (const obj of objArray) {
        const data = await Product.create(obj);
        products.push(data);
    }
    return products;
};

module.exports = {
    product1, product2, product3, product4, deleteProducts, insertProducts
}