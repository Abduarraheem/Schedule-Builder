import mongoose from 'mongoose'

// Define schedule schema and data types
const classRepoSchema = mongoose.Schema({
    crn: {
        type: Number,
        required: true,
    },
    courseNo: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    credits: {
        type: mongoose.Types.Decimal128,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    timedate: {
        type: Array,
        required: true,
    },
    seats: {
        type: Array,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }
}, { collection: "classRepo", timestamps: true });

const ClassRepo = mongoose.model("ClassRepo", classRepoSchema);
export default ClassRepo;
