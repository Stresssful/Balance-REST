var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('main:root@ds161148.mlab.com:61148/heroku_tqh5hdjz');


/* GET users listing. 
router.get('/', function(req, res, next) {
  var collection = db.get('Inbox'); 
  var query = { email: req.query.Email, password: req.query.Password };
  collection.find(query, function(err, Users)
  {
  		console.log(req.query.Email);
  		console.log(req.query.Password);
  		console.log(Users);
		if (err) throw err; 
		res.json(Users);
  });
});

router.post('/', function(req, res)
{ 
	var collection = db.get('Inbox'); 
	collection.insert(
	{ 
		data: req.body.Data,	
	}, 
	function(err, inbox)
	{
		if (err) throw err;
		res.json(inbox);
	});
});
*/

router.post('/', function(req, res)
{ 
	var collection = db.get('Inbox'); 
	collection.insert(
	{ 
		_id: req.body.id, 
		data: req.body.data,	
	}, 
	function(err, inbox)
	{
		if (err) throw err;
		res.json(inbox);
	});
});

router.get('/:id', function(req, res) 
{
	var collection = db.get('Inbox');
	collection.findOne({ _id: req.params.id }, function(err, inbox)
	{
		if (err) throw err;
		res.json(inbox);
	});
});

router.put('/:id', function(req, res)
{ 
	var collection = db.get('Inbox'); collection.update(
	{
		_id: req.params.id
	},

	{ 
		data: req.body.data,
	}, 

	function(err, inbox)
	{
		if (err) throw err;
		res.json(inbox);
	});
});

module.exports = router;