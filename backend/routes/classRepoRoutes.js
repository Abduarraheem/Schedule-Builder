import express from 'express'
import {getClassRepo, getClass} from '../controllers/classRepoController.js'
const classRepoRouter = express.Router(); // Router handles all requests and responses

// Create addresses for each controller function
classRepoRouter.route('/')
.get(getClassRepo);

classRepoRouter.route('/getclass/')
.get(getClass);

export default classRepoRouter;
