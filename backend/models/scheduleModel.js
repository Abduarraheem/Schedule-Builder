import mongoose from 'mongoose'

// Define schedule schema and data types
const scheduleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    classes: {
        type: Array,
        required: false,
    },
    credits: {
        type: Number,
        required: true,
    },
    quarter: {
        type: String,
        required: true,
    },
    events: {
        type: Array,
        required: false,
    }
}, {collection: "schedules", timestamps: true});

const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;
