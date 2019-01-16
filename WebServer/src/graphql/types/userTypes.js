const user = `
type User {
    id:ID!
    firstName: String
    lastName: String
    email: String
    password: String
    phone: String
    address: String
    createdAt: String
}

type UserLogged {
    token: String!
    user: User
}

input loginInput {
    email: String!,
    password: String!
}

input UserInput {
    firstName: String
    lastName: String
    email: String
    password:String
    phone: String
    address: String
}
`;

export default user;
