import mongoose from "mongoose";

const  postSchema= new mongoose.Schema(
    {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          required: true,
          trim: true,
        },
        completed: {
          type: Boolean,

        },
        id: {
          type: String,
          trim: true,
        },
        image: {
          public_id: String,
          url: String,
        },
      },
      {
        timestamps: true,
        versionKey: false,
      }
)

export default mongoose.model("Post", postSchema);
