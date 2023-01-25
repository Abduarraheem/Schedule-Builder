import express from 'express'
import {getSchedules, getSchedule, addSchedule, updateSchedule} from '../controllers/scheduleController.js'
const scheduleRouter = express.Router(); // Router handles all requests and responses

// Create addresses for each controller function
scheduleRouter.route('/')
.post(getSchedules);

scheduleRouter.route('/:title')
.post(getSchedule);

scheduleRouter.route('/add/')
.post(addSchedule);

scheduleRouter.route('/update/:title')
.post(updateSchedule);

export default scheduleRouter;
