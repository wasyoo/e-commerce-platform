const product = `
    type Product{
        id:ID!
        name: String
        description: String
        price: String
        quantity: String
        image: String
        category: Category
        brand: Brand
    }
    
    input ProductInput{
        name: String
        description: String
        price: String
        quantity: String
        image: String
        category: String
        brand: String
    }
`;

export default product;
