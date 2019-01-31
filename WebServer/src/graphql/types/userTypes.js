const user = `
type User {
    id:ID!
    firstName: String
    lastName: String
    email: String
    password: String
    phone: String
    address: String
    role: String
    createdAt: String
    updatedAt: String
    order: Order
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
    role: String
}

input PasswordInput{
    oldPassword: String
    newPassword: String
}
`;

export default user;
