import asyncHandler from 'express-async-handler'
import Subject from '../models/subjectModel.js'

// Gets all classes and sends them to client
export const getSubjects = asyncHandler(async (req, res) => {
    // If classRepo empty, return template class
    await Subject.find({}, {
        dept: 1,
        code: 1
    }).then(subject => {
        res.json(subject);
    }).catch(err => console.log(err));
});
