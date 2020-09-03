require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const router = require("./routes/router");


//set up express
const app = express();
app.use(bodyParser.urlencoded({extended: true }))
app.use(bodyParser.json())
app.use(router);


//connect mongoose to mongo db
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//start server on port 3000
const PORT = 5000;
app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

