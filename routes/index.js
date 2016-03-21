var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 

mongoose.connect('mongodb://localhost/listDB'); 

var itemSchema = mongoose.Schema({
	ID: String, 
	Item: String, 
	Importance: Number, 
	Completed: Boolean
}); 

var Item = mongoose.model('Item', itemSchema); 

var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', function() {
	console.log('Connected');
}); 

router.post('/list', function(req, res, next) {
  console.log("POST list route"); //[1]
  console.log(req.body); 
  var newItem = new Item(req.body); 
  console.log(newItem); 
  newItem.save(function(err, post) {
	if (err) return console.error(err); 
	console.log(post);
	res.sendStatus(200); 
  }); 
});

router.get('/list', function(req,res,next) {
	console.log("In the GET route"); 
	console.log(req.query.q); 
	Item.find({ID:req.query.q},function(err,toDoList) {
		if (err) return console.error(err);
		else {
			console.log(toDoList); 
			res.json(toDoList); 
		} 
	});    
}); 

router.delete('/list', function(req,res,next) {
	console.log("In the REMOVE route"); 
	console.log(req.query.q);  
	Item.remove({_id:req.query.q}, function(err,removal) {
		if (err) return console.error(err); 
		else {
			console.log(removal);
			return; 
		} 
	}); 
	res.sendStatus(200); 
});

module.exports = router;
