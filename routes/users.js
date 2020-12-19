var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
const baseUri = "mongodb+srv://admin:administrator@botdb.zctxy.azure.mongodb.net/<dbname>?retryWrites=true&w=majority";
const databaseName = "KursachDb";
const usersCollectionName = "Users";

var monk = require('monk');
var db = monk('main:root@ds161148.mlab.com:61148/heroku_tqh5hdjz');

var client = new mongoClient(baseUri, { useNewUrlParser: true });
client.connect();


/* GET users listing. */
router.get('/', function(req, res, next) {
  let collection = client.db(databaseName).collection(usersCollectionName);
  //var collection = db.get('Users'); 
  let query = { email: req.query.Email, password: req.query.Password };
  collection.findOne(query, async function(err, doc){
	if (err) throw err; 
	res.json(doc);
  });

  /*collection.find(query, function(err, Users)
  {
  		console.log(req.query.Email);
  		console.log(req.query.Password);
  		console.log(Users);
		if (err) throw err; 
		res.json(Users);
  });*/
});

router.post('/', async function(req, res)
{ 

	let users = client.db(databaseName).collection(usersCollectionName);
    await users.insertOne({ "email": req.body.Email, "password": req.body.Password, "data": req.body.Data },
        function(err, res) {
    		if (err) throw err;
    		console.log("1 document inserted");
    		db.close();
  	});

	/*var collection = db.get('Users'); 
	collection.insert(
	{ 
		email: req.body.Email, 
		password: req.body.Password,
		data: req.body.Data,	
	}, 
	function(err, user)
	{
		if (err) throw err;
		res.json(user);
	});*/
});

router.get('/:id', function(req, res) 
{

	let collection = client.db(databaseName).collection(usersCollectionName);
  	//var collection = db.get('Users'); 
  	let query = { _id: req.params.id };
  	collection.findOne(query, async function(err, doc){
		if (err) throw err; 
		res.json(doc);
  	});


	/*var collection = db.get('Users');
	collection.findOne({ _id: req.params.id }, function(err, user)
	{
		if (err) throw err;
		res.json(user);
	});*/
});

router.put('/:id', async function(req, res)
{ 

	console.log(req.params.id)
    console.log(req.body.Data);

	let users = client.db(databaseName).collection(usersCollectionName);
    await users.updateOne(
        { _id: req.params.id },
        { $set: { "data": req.body.Data }}
    );


  	let query = { _id: req.params.id };
  	users.findOne(query, async function(err, doc){
		if (err) throw err; 
		res.json(doc);
  	});

	/*var collection = db.get('Users'); collection.update(
	{
		_id: req.params.id
	},

	{ 
		email: req.body.Email, 
		password: req.body.Password,
		data: req.body.Data,
	}, 

	function(err, user)
	{
		if (err) throw err;
		res.json(user);
	});*/
});

module.exports = router;
