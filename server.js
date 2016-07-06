var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var http = require('http');
var fs = require('fs');
var mongojs = require('mongojs');

// Authentication module.
var auth = require('http-auth');
var basic = auth.basic({
	realm: "Nope It's Private",
	file: __dirname + "/users.htpasswd"
});

// Application setup.
var app = express();
app.use(auth.connect(basic));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.disable('x-powered-by');

var Coll = mongojs('linkslist', ['dbColl']);

app.get('/dbColl', function(req, res){
	Coll.dbColl.find(function (err, doc) {
		console.log(doc);
		res.json(doc);
	});
});

app.post('/dbColl', function(req, res){
	Coll.dbColl.insert(req.body, function(err, doc) {
		console.log(doc);
		res.json(doc);
	});
});

app.get('/dbColl/:id', function (req, res) {
	var id = req.params.id;
	Coll.dbColl.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		if (!doc){return}
		console.log('my collection is ' + JSON.stringify(doc));
		fs.writeFile("./test", JSON.stringify(doc.collection).replace(/['"]+/g, '') + '\n');
		res.json(doc);
	});
});

app.delete('/dbColl/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
	Coll.dbColl.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.delete('/dbColl/', function (req, res) {
	Coll.dbColl.drop();
	console.log('db dropped');
});

//
// Links
//

var techLinks = [];
var linksdb = "";


function getCollData(lol, next){
	lol = '';
	techLinks = fs.readFileSync('./test','utf8').toString().split("\n");
	console.log('the content of the file is ' + techLinks[0]);
	linksdb = mongojs('linkslist', [techLinks[0]]);
	next(linksdb);
}

function getAllLinks(res){
	getCollData(techLinks, function(linksdb){
		console.log('I just got the ' + techLinks[0] + ' collection ');
		linksdb[techLinks[0]].find(function (err, docs) {
			console.log('here is the docs ==  ' + JSON.stringify(docs));
			res.json(docs);
		})
	});
}

var refreshAll = function() {
	app.get('/techLinks', function (req, res) {
		console.log('I received a GET request so now I call getAllLinks()');
		getAllLinks(res);
	});
}

// Get All
refreshAll();

// Post
app.post('/techLinks', function (req, res) {
  console.log(req.body);
	linksdb[techLinks[0]].insert(req.body, function(err, doc) {
    res.json(doc);
  });
});
// Delete
app.delete('/techLinks/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
	linksdb[techLinks[0]].remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});
// Get one
app.get('/techLinks/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
	linksdb[techLinks[0]].findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});
// Update
app.put('/techLinks/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  linksdb[techLinks[0]].findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, desc: req.body.desc}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
);
});

//
// Contact
//

var contactdb = mongojs('contactlist', ['contactlist']);

app.get('/contactlist', function (req, res) {
  console.log('I received a GET request');
  contactdb.contactlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/contactlist', function (req, res) {
  console.log(req.body);
  contactdb.contactlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  contactdb.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  contactdb.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  contactdb.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

// Create an HTTP service.
http.createServer(app).listen(8000);
module.exports = app;
