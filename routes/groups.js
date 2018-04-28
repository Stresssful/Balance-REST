var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('main:root@ds161148.mlab.com:61148/heroku_tqh5hdjz');


/* GET users listing. */
router.get('/', function(req, res, next) {
  var collection = db.get('Groups'); 
  var query = { _id: req.query.id };
  collection.find(query, function(err, Group)
  {
  		//console.log(req.query.Email);
  		//console.log(req.query.Password);
  		//console.log(Users);
		if (err) throw err; 
		res.json(Group);
  });
});

router.post('/', function(req, res)
{ 
	var collection = db.get('Groups'); 
	collection.insert(
	{ 
		_id:: req.body.id, 
		data: req.body.Data,	
	}, 
	function(err, group)
	{
		if (err) throw err;
		res.json(group);
	});
});

router.get('/:id', function(req, res) 
{
	var collection = db.get('Groups');
	collection.findOne({ _id: req.params.id }, function(err, group)
	{
		if (err) throw err;
		res.json(group);
	});
});

router.put('/:id', function(req, res)
{ 
	var collection = db.get('Group'); collection.update(
	{
		_id: req.params.id
	},

	{ 
		data: req.body.Data,
	}, 

	function(err, user)
	{
		if (err) throw err;
		res.json(user);
	});
});

module.exports = router;
