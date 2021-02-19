const postResolvers = require("./posts");
const userResolvers = require("./users");
const likeComment = require("./like-comment");

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },

  Query: {
    ...postResolvers.Query,
  },

  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...likeComment.Mutation,
  },

  Subscription: {
    ...postResolvers.Subscription,
  },
};
