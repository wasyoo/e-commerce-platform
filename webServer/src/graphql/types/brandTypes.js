const brand = `
    type Brand{
        id: ID
        name: String
        description: String
        filename: String,
    }

    input InputBrand{
        name: String
        description: String
        filename: String,
    }
`;

export default brand;
