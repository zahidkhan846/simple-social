const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  body: String,
  userName: String,
  createdAt: String,
  comments: [
    {
      body: String,
      userName: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      userName: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Post", postSchema);
