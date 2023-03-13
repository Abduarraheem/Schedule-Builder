import express from 'express'
import { getSubjects } from '../controllers/subjectController.js'
const subjectRouter = express.Router(); // Router handles all requests and responses

// Create addresses for each controller function
subjectRouter.route('/')
    .get(getSubjects);

export default subjectRouter;
