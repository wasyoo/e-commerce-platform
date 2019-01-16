const product = `
    type Product{
        id:ID!
        name: String,
        description: String,
        price: Int,
        quantity: Int,
        image: String,
        category: Category,
    }
    
    input ProductInput{
        name: String,
        description: String,
        price: Int,
        quantity: Int,
        image: String,
        category: String,
    }
`;

export default product;
