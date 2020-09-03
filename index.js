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

//hookup persistence
mongoose.connect("mongodb+srv://" + process.env.DB_USERNAME + ":" + 
process.env.DB_PASSWORD +"@cluster0.xkpj3.mongodb.net/url-short?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});




//start server on port 5000
const PORT = 5000;
app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

