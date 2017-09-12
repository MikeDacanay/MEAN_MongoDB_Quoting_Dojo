var express = require("express");
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var moment = require('moment');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
mongoose.Promise = global.Promise;
var Quoting_Dojo_Schema = new mongoose.Schema({
	name: String,
	quote: String,
	create_date: {type: Date, default: Date.now}
})
mongoose.model('Quotes', Quoting_Dojo_Schema);
var Quotes = mongoose.model('Quotes') ;


app.use(session({secret: 'codingdojorocks'})); 
app.use(bodyParser.urlencoded({extended: true}));
app.listen(8000, function() {})
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.get('/', function(req,res){
	res.render('index');
})

app.post('/add', function(req,res){
	var quoter = new Quotes({name: req.body.name, quote: req.body.quote});
	quoter.save(function(err) {
	    // if there is an error console.log that something went wrong!
	   	if(err) {
	    	console.log('something went wrong');
	    } else { // else console.log that we did well and then redirect to the root route
	    	console.log('successfully added a user!');
	    	res.redirect('/quotes');
	    }
  	})
})

app.get('/quotes', function(req,res){
	Quotes.find().sort({_id:-1}).find({},function(err, quote) {
		var pass = quote;
		res.render('quotes', {quote:pass});
	});	
})