//import dependecies
var express = require('express')
const validUrl = require("valid-url");
const shortid = require("shortid")

//import mongoose models
const ShortUrl = require("../model/shortUrl");

//declare router
var router = express.Router()


// define the home page route
router.get('/', function (req, res) {
    res.send("hello");
})


// define the crate short url route
router.post('/short-url', async(req, res) => {
    const longUrl = req.body.longUrl;


 
    //validate url
    if(!validUrl.isUri(longUrl))
        return res.status(401).json("Invalid URL. Please enter a valid url for shortening.");

    try{

        //check if url already exist
        var url = await ShortUrl.findOne({longUrl : longUrl});

        //return short if long url already exist
        if(url)
        return res.status(201).json({shortUrl: "http://" + url.shortUrl.toLowerCase()});

        //generate new url and persist
        const urlCode = shortid.generate();

        url  = new ShortUrl({
            longUrl,
            shortUrl: urlCode.toLowerCase()
        });
        
        //save and return short url
        await url.save()
        return res.status(201).json({shortUrl: "http://" + url.shortUrl.toLowerCase()});


    } catch (err){
        console.error(err.message);
        return res.status(500).json("Internal Server error " + err.message);
    }
    


})

// define the about route
router.get('/short-url', function (req, res) {

})
  

module.exports = router