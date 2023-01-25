import path from 'path'
import dotenv  from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import scheduleRoutes from './routes/scheduleRoutes.js'

dotenv.config();

//Start Express and define local path
const app = express();
const __dirname = path.resolve();

const urlencodedParser = express.urlencoded({extended: false});
app.use(urlencodedParser, express.json());

app.use(passport.initialize());

//Env variables
const PORT = process.env.PORT || 5000;

//Setup APIs
app.use('/api/schedules', scheduleRoutes);

//Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

//Connect to database
mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true})
.then((res) => {
  console.log("Database connected");
})
.catch((err) => console.log(err));

//Log if server is up
app.listen(PORT, () => {
  console.log("App is running in", process.env.NODE_ENV, "mode on port", PORT);
});
