const { Brand } = require("../../src/model/brand.model");

const deleteBrands = async () => {
    await Brand.deleteMany();
};

const brand1 = {
    value: 'Samsung',
    label: 'samsung',
};

const brand2 = {
    value: 'Dior', label: 'dior'
};


const insertBrands = async (objArray) => {
    let brands = [];
    for (const obj of objArray) {
        const data = await Brand.create(obj);
        brands.push(data);
    }
    return brands;
};


module.exports = {
    deleteBrands, brand1, brand2, insertBrands
};