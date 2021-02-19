const { AuthenticationError, UserInputError } = require("apollo-server");
const { default: validator } = require("validator");
const Post = require("../../models/Post");
const isAuth = require("../../utils/isAuth");

module.exports = {
  Query: {
    getposts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },

    // GETTING SINGLE POST HERE
    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error("Post not Found");
        }
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  //Mutations
  Mutation: {
    createPost: async (_, { body }, context) => {
      const user = isAuth(context);

      if (validator.isEmpty(body)) {
        throw new UserInputError("Post body should not be empty");
      }

      const newPost = new Post({
        body,
        user: user.id,
        userName: user.userName,
        createdAt: new Date().toISOString(),
      });

      const createdPost = await newPost.save();

      context.pubSub.publish("NEW_POST", { newPost: createdPost });

      return createdPost;
    },

    //  delete post
    deletePost: async (_, { postId }, context) => {
      const user = isAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.userName === post.userName) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Subscription: {
    newPost: {
      subscribe: (_, __, { pubSub }) => pubSub.asyncIterator("NEW_POST"),
    },
  },
};
