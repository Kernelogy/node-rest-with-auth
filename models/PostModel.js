const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    author: String,
    images: [],   //OneToFew - unmodifieable, populate implicitly
    comments: [   //OneToMany - modifieable, populate explicitly
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
    tags: [     //ManyToMany
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
      }
    ]
  })
);

module.exports = Post;