const product = `
    type Product{
        id:ID!
        name: String,
        description: String,
        price: String,
        quantity: String,
        image: String,
        category: Category,
    }
    
    input ProductInput{
        name: String,
        description: String,
        price: String,
        quantity: String,
        image: String,
        category: String,
    }
`;

export default product;
