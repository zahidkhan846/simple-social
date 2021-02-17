const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    userName: String!
    createdAt: String!
  }

  type User {
    id: ID!
    userName: String!
    email: String!
    token: String!
    createdAt: String!
  }

  input UserInput {
    userName: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Query {
    getposts: [Post]
  }

  type Mutation {
    registerUser(userInput: UserInput): User!
    userLogin(userName: String!, password: String!): User!
  }
`;
