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
    res.redirect('http://localhost:3000/');
})

// define the home page route
router.get('/:userId', async (req, res) =>{
    const longUrl = req.params.userId;


        try{

            //check if url already exist
            var url = await ShortUrl.findOne({longUrl : longUrl});
    
            //return short if long url already exist
            if(url)
                res.redirect('http://localhost:5000/' + string);
    
           
            return res.send("No record found")
    
        } catch (err){
            console.error(err.message);
            return res.status(500).json("Internal Server error " + err.message);
        }
        
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
        return res.status(201).json({shortUrl: url.shortUrl});

        //generate new url and persist
        const urlCode = shortid.generate();

        url  = new ShortUrl({
            longUrl,
            shortUrl: urlCode.toLowerCase()
        });
        
        //save and return short url
        await url.save()
        return res.status(201).json({shortUrl: url.shortUrl});


    } catch (err){
        console.error(err.message);
        return res.status(500).json("Internal Server error " + err.message);
    }
    


})

// define the about route
router.get('/short-url', function (req, res) {

})
  

module.exports = router