const { UserInputError, AuthenticationError } = require("apollo-server");
const { default: validator } = require("validator");

const Post = require("../../models/Post");
const isAuth = require("../../utils/isAuth");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { userName } = isAuth(context);

      if (validator.isEmpty(body)) {
        throw new UserInputError("Comment empty", {
          body: "Comment body must not be empty",
        });
      }
      const post = await Post.findById(postId);

      if (!post) {
        throw new UserInputError("Post Not Found");
      }

      post.comments.unshift({
        body,
        userName,
        createdAt: new Date().toISOString(),
      });

      await post.save();

      return post;
    },

    //  deleting that comment

    deleteComment: async (_, { postId, commentId }, context) => {
      const { userName } = isAuth(context);

      const post = await Post.findById(postId);

      const commentIndex = post.comments.findIndex((c) => c.id === commentId);

      if (!post) {
        throw new UserInputError("Post not found");
      } else if (!post.comments[commentIndex]) {
        throw new UserInputError("No such comment found");
      } else if (post.comments[commentIndex].userName !== userName) {
        throw new AuthenticationError(
          "Unable to delete comment | Action not allowed"
        );
      } else {
        post.comments.splice(commentIndex, 1);

        await post.save();
        return post;
      }
    },

    //  like and unlike logic is starting...

    likePost: async (_, { postId }, context) => {
      const { userName } = isAuth(context);

      const post = await Post.findById(postId);

      if (!post) {
        throw new UserInputError("Post not found");
      } else if (post.likes.find((like) => like.userName === userName)) {
        post.likes = post.likes.filter((like) => like.userName !== userName);
      } else {
        post.likes.push({
          userName,
          createdAt: new Date().toISOString(),
        });
      }
      await post.save();
      return post;
    },
  },
};
