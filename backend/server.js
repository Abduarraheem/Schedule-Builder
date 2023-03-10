import path from 'path'
import dotenv  from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import scheduleRoutes from './routes/scheduleRoutes.js'
import classRepoRoutes from './routes/classRepoRoutes.js'
import subjectRoutes from './routes/subjectRoutes.js'

// Allow referencing .env files
dotenv.config();

// Start Express and define local path
const app = express();
const __dirname = path.resolve();

// Ecnode express to send json over https packets
const urlencodedParser = express.urlencoded({extended: false});
app.use(urlencodedParser, express.json());

// Env variables
const PORT = process.env.SERVER_PORT || 5000;
const STATUS = process.env.NODE_ENV
const DB_URI = process.env.DB_URI

// Setup APIs
app.use('/api/schedules', scheduleRoutes);
app.use('/api/classrepo', classRepoRoutes);
app.use('/api/subjects', subjectRoutes);

// Serve static assets if in production
if(STATUS === 'production') {
  //Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

// Connect to database
mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((res) => {
  console.log("Database connected");
})
.catch((err) => console.log(err));

// Log if server is up
app.listen(PORT, () => {
  console.log("App is running in", STATUS, "mode on port", PORT);
});
