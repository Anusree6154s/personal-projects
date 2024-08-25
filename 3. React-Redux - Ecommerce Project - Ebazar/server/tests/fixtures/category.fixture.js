const { Category } = require("../../src/model/category.model");

const deleteCategeories = async () => {
    await Category.deleteMany();
};

const category1 = {
    value: 'Electronics',
    label: 'electronics',
};

const category2 = {
    value: 'Books', label: 'books'
};


const insertCategories = async (objArray) => {
    let categories = [];
    for (const obj of objArray) {
        const data = await Category.create(obj);
        categories.push(data);
    }
    return categories;
};


module.exports = {
    deleteCategeories, category1, category2, insertCategories
};