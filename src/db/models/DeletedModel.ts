import mongoose from 'mongoose';

const deletedSchema = new mongoose.Schema({
    id: String,
    timestamp: Number,
});

export default mongoose.model("deleted", deletedSchema)