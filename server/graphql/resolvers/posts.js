const { AuthenticationError } = require("apollo-server");
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

      const newPost = new Post({
        body,
        user: user.id,
        userName: user.userName,
        createdAt: new Date().toISOString(),
      });

      const createdPost = await newPost.save();

      context.pubsub.publish("POST_CREATED", {
        newPost: createdPost,
      });

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
    newPost(_, __, context) {
      return context.pubsub.asyncIterator(["POST_CREATED"]);
    },
  },
};
