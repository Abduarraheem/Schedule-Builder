import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import Schedule from '../models/scheduleModel.js'

// Gets all schedules and sends them to client
export const getSchedules = asyncHandler(async(req, res) => {
  // If schedules empty, return template schedule
  await Schedule.find({}, {
    title: 1,
    password: 1,
    classes: 1,
    credits: 1,
    quarter: 1,
    events: 1
  }).then(schedules => {
    res.json(schedules);
  })
});

// Finds one schedule based on title
export const getSchedule = asyncHandler(async(req, res) => {
  const schedule = await Schedule.findOne({title: req.body.title}).then(schedule => {
    if(!schedule) {
      return res.status(400).json({titleNotFound:"No schedule with that title found."});
    }
  });
  res.json(schedule);
});

// Adds new schedule to collection
export const addSchedule = asyncHandler(async(req, res) => {
  // If title already exists, return error
  await Schedule.findOne({title: req.body.title}).then(schedule => {
    if(schedule) {
      return res.status(400).json({titleFound: "Schedule with title already exists."});
    }
  });
  
  // Put data from request into new document
  const newSchedule = new Schedule({
    title: req.body.title,
    password: req.body.password,
    classes: req.body.classes,
    credits: req.body.credits,
    quarter: req.body.quarter,
    events: req.body.events
  });

  // Encrypt and hash the password if exists, and save to MongoDB and frontend in res
  if(password !== "") {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newSchedule.password, salt, (err, hash) => {
        if(err) throw err;
        newSchedule.password = hash;
        newSchedule
          .save()
          .then(schedule => {
            res.json(schedule);
          })
          .catch(err => console.log(err));
      })
    })
  }

  // Save new schedule to MongoDB, and send it to frontend in res
  else {
    newSchedule
    .save()
    .then(newItem => res.json(newItem))
    .catch(err => console.log(err));
  }
});

// Updates existing schedule 
export const updateSchedule = asyncHandler(async(req, res) => {

  await Schedule.findOne({title: req.body.title}).then(schedule => {
    if(!schedule) {
      return res.status(400).json({titleNotFound: "No schedule with that title found."});
    }
  });

  // Compare the input password with the found schedule password if password exists
  if(schedule.password !== "") {
    bcrypt.compare(password, schedule.password).then(isMatch => {
      if(isMatch) {
        pass;
      }
      else {
        return res.status(400).json({passwordInvalid: "Password is incorrect"});
      }
    });
  }

  // Finds, updates, and sends schedule to MongoDB and frontend in res
  await Schedule.findOneAndUpdate(
    {title: req.body.title},
    {
      $set: {
        title: req.body.title,
        password: req.body.password,
        classes: req.body.classes,
        credits: req.body.credits,
        quarter: req.body.quarter,
        events: req.body.events
      },
      $currentDate: {updatedAt: true}
    },
    {new: true}
  )
  .exec()
  .then(schedule => res.json(schedule))
  .catch(err => console.log(err));
});
