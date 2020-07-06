const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(80, () => {
    console.log("congrat")
});
app.use(express.static('public/'));
app.use(express.json({limit : '1mb'}));

const database = new Datastore('data.db');
database.loadDatabase();
// database.insert({helo : "hello"})
app.get('/api', (req, res)=>{
 database.find( {}, (err,data)=>{
     if(err){
         res.json({e
             error : err
         })
     }
     res.json(data)
 })
})
app.post('/api', (req, res)=>{
    console.log("dealing with post request")
    const body = req.body;
    const timestamp = Date.now();
    body.timestamp = timestamp;
    database.insert(body);
    console.log(body);
    // console.log(req.body.c);
    res.json({
        status : 'success',
        timestamp: timestamp,
        latitude : req.body.lat,
        longitude : req.body.long,
        image : req.body.image64

    });

})
