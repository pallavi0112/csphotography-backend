const mongoose = require("mongoose");

//NOTE - Define a schema for the image object
const imageSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//NOTE - Define a schema for the image object
const videoSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//NOTE - Define the category gallery schema
const categoryGallerySchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to the Category model
      required: true,
    },
    images: { type: [imageSchema] , default : [] },
    videos: { type: [videoSchema] , default : []},
  },
  { timestamps: true }
);

const CategoryGallery = mongoose.model(
  "CategoryGallery",
  categoryGallerySchema
);
module.exports = CategoryGallery;
