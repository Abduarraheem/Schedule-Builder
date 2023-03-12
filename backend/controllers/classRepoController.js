import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import ClassRepo from '../models/classRepoModel.js'

// Gets all classes and sends them to client
export const getClassRepo = asyncHandler(async (req, res) => {
    // If classRepo empty, return template class
    await ClassRepo.find({}, {
        subject: 1,
        crn: 1,
        courseNo: 1,
        title: 1,
        credits: 1,
        instructor: 1,
        timedate: 1,
        seats: 1,
        location: 1
    }).then(classRepo => {
        res.json(classRepo);
    }).catch(err => console.log(err));
});

// Finds one class based on search input
export const getClass = asyncHandler(async (req, res) => {
    const singleClass = await ClassRepo.find({...req.body}).then(singleClass => {
        if (!singleClass.length) {
            return res.status(400).json({ classNotFound: "No class with that criteria found." });
        }
    }).catch(err => console.log(err));
    res.json(singleClass);
});
