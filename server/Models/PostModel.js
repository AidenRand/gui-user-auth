import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: [true, "User ID is required"],
    },
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    content: {
        type: String,
        required: [true, "Content is required"],
    },
})

export default mongoose.model("Post", postSchema);