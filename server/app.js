const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const apiRouter = require('./routes/api')

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "front-end", "build")));

const port = parseInt(process.env.PORT, 10) || 3000

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
  } catch (error) {
    throw Error('[Error connecting to database] ' + error);
  }
}

app.listen(port, async () => {
  try {
    await connectDB();
    console.log('Connected to database.');
  } catch (error) {
    console.log(error);
    return;
  }
  console.log('Server listening on port ' + port);
})

app.use('/api', apiRouter);

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, "front-end", "build", "index.html"));
});
