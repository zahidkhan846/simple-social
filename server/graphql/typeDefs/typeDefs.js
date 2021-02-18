const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    userName: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
  }

  type Comment {
    id: ID!
    createdAt: String!
    userName: String!
    body: String!
  }

  type Like {
    id: ID!
    createdAt: String!
    userName: String!
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
    getPost(postId: ID!): Post
  }

  type Mutation {
    registerUser(userInput: UserInput): User!
    userLogin(userName: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;
