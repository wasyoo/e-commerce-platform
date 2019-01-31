const category = `
    type Category{
        id: ID
        name: String
        parent: Category
        products :[Product]
    }

    input InputCategory{
        name: String
        parent: String
    }
`;

export default category;
