const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();
const port = process.env.PORT || 4001;


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB Connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});


//route files path
const userRoutes = require('./routes/userRoutes');
const attendenceRoute = require('./routes/attendenceRoute');
const taskRoutes = require('./routes/taskRoutes');
const clientRoutes = require('./routes/clientRoutes');
const EmpRoutes = require('./routes/employeeRoute');
const vendorRoute = require('./routes/vendorRoute');
const reimbrushRoute = require('./routes/reimbrushRoute');
const assetsRoute = require('./routes/assetsRoute');
const licenseRoute = require('./routes/licenseRoute');
const polylineRoute = require('./routes/polylineRoute');


const adminRoute = require('./routes/adminRoute');
const { sendOTP } = require('./services/msgService');


// Set base URL
const baseRoute = '/api';
const cronJobs = require('./cronJob');

// Define a route for the base URL
app.get(baseRoute, async(req, res) => {

  // let output = await sendOTP('9926822432');
  res.send(`
    <h1 style="text-align:center">Hello, Node Js </h1>
    <img src="./images/node.png" alt="Hello Image" width="100%" height="100%">
  `);

});


// Use the user routes
app.use(`${baseRoute}/user`, userRoutes);
app.use(`${baseRoute}/attendance`, attendenceRoute);
app.use(`${baseRoute}/task`, taskRoutes);
app.use(`${baseRoute}/client`, clientRoutes);
app.use(`${baseRoute}/employee`, EmpRoutes);
app.use(`${baseRoute}/vendor`, vendorRoute);
app.use(`${baseRoute}/reimbursement`, reimbrushRoute);
app.use(`${baseRoute}/assets`, assetsRoute);
app.use(`${baseRoute}/license`, licenseRoute);

app.use(`${baseRoute}/admin`, adminRoute);

app.use(`${baseRoute}/polyline`, polylineRoute);



app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});