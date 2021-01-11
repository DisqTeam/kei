import mongoose from 'mongoose';

const audioSchema = new mongoose.Schema({
    id: String,
    unlisted: Boolean,

    ip: String,
    uploaded: Number,
    expires: Number,

    filename: String,
    filesize: Number,
    
    title: String,
    description: String
});

export default mongoose.model("audios", audioSchema)