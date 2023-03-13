import mongoose from 'mongoose'

// Define schedule schema and data types
const subjectSchema = mongoose.Schema({
    dept: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
}, { collection: "subjects", timestamps: true });

const Subject = mongoose.model("Subject", subjectSchema);
export default Subject;
