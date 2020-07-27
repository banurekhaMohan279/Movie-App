const express = require('express');
const path = require('path');

var mongoose = require('mongoose'); 
var bodyParser= require('body-parser');
var Movie= require('./MyRecommendations');
var Schema = mongoose.Schema;						// mongoose for mongodb
var port = process.env.PORT || 8080; 				// set the port

var cors = require('cors')
var app = express()

app.use(cors())

const clientPath = path.resolve(__dirname, '..', 'dist');

app.use(express.static(clientPath));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/welcome', (req, res) => {
  res.send({ msg: 'Welcome to app' });
});

mongoose.connect('mongodb://localhost:27017/Movies');

app.post('/PostRecommendation', (request, response)=>{
    let m = new Movie();
    m.id=request.body.id;
    m.vote_average=request.body.vote_average;
    m.title=request.body.title;
    m.poster_path=request.body.poster_path;
    m.overview=request.body.overview;
    m.release_date=request.body.release_date;  
    m.save(function(err) {
        if (err)
           throw err;
        else{
        	//response.header("Content-Type", "application/json");
        	console.log('Saved Movie successfully...');
        	response.send({ message: 'Saved Movie successfully !' })
        }           
    });
});

app.delete('/DeleteRecommendation/:Movieid', (request, response)=>{

    Movie.remove({ id: request.params.Movieid},function(err) {
        if (err)
           throw err;
        else{
        	console.log('Deleted Movie successfully...');
        	response.send({ message: 'Deleted Movie successfully !' })
        } 
    });
});

app.get('/GetRecommendations', (request, response)=>{

    Movie.find(function(err,Movies) {
        if (err)
           throw err;
        else{
        	console.log('Get Movie successful...');
        	response.send(Movies);
        } 
    });
});


app.use((req, res) => {
  res.status(404).send({ error: 'Resource not found' });
});

module.exports = app;

app.listen(port);