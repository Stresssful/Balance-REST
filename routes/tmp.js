var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('main:root@ds161148.mlab.com:61148/heroku_tqh5hdjz');

router.get('/:id', function(req, res) 
{
	var collection = db.get('TempStorage');
	collection.findOne({ _id: req.params.id }, function(err, user)
	{
		if (err) throw err;
		res.json(user);
	});
});

router.put('/:id', function(req, res)
{ 
	var collection = db.get('TempStorage'); collection.update(
	{
		_id: req.params.id
	},

	{ 
		email: req.body.Email, 
		password: req.body.Password,
		data: req.body.Data,
	}, 

	{ upsert: true },

	function(err, user)
	{
		if (err) throw err;
		res.json(user);
	});
});