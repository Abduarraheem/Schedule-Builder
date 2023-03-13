import mongoose from 'mongoose'

// Define schedule schema and data types
const subjectSchema = mongoose.Schema({
    department: {
        type: String,
        required: true,
    }
}, { collection: "subject", timestamps: true });

const Subject = mongoose.model("Subject", subjectSchema);
export default Subject;
