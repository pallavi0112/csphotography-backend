const mongoose = require("mongoose");
const { BannerTypes } = require("./utils/enums");

const imageSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);
const videoSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

const bannerSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: Object.values(BannerTypes),
      required: true,
    },
    image: { type: [imageSchema], required:false , default:null },
    video: { type: videoSchema, required:false , default: null },
  },
  { timestamps: true }
);

const Banner = mongoose.model("banner", bannerSchema);
module.exports = Banner;
