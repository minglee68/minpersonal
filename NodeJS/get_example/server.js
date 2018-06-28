var express = require("express");
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/userInfo';


var insertDocuments = function(db, query, callback){
	var collection = db.collection('accounts');
	collection.insertOne(query, function(err, result){
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		assert.equal(1, result.ops.length);
		console.log("Inserted one account into 'accounts' collection");
		callback(result);
	});
}

var findDocumentsQuery = function(db, id, ps, callback){
	var collection = db.collection('accounts');

	collection.findOne(id, function(err, account){
		if (err) throw err; 
		
		if (account == null) {
			var result = path.join(__dirname + '/noaccount.html');
			callback(result);
		} else if (ps == account.password){
			var result = path.join(__dirname + '/success.html');
			callback(result);
		} else {
			var result = path.join(__dirname + '/failure.html');
			callback(result);
		}
	});
}

var checkDocumentsQuery = function(db, id, callback){
	var collection = db.collection('accounts');

	collection.findOne(id, function(err, account){
		if (err) throw err;

		if (account == null){
			callback(false);
		} else {
			callback(true);
		}
	});
}


app.get('/loginpage', function(req, res){
	res.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/registerpage', function(req, res){
	res.sendFile(path.join(__dirname + '/register.html'));
});

app.get('/login', function(req, res){
	var username = req.query.username;
	var password = req.query.password;
	
	var idQuery = {};
	idQuery['username'] = username;

	MongoClient.connect(url, function(err, db){
		assert.equal(err, null);
		console.log("Successfully connected to userInfo DB");
		findDocumentsQuery(db, idQuery, password, function(result){
			res.sendFile(result);
			db.close();
		});
	});
});

app.get('/register', function(req, res){
	var query = req.query

	var idQuery = {};
	idQuery['username'] = query.username;

	MongoClient.connect(url, function(err, db){
		assert.equal(err, null);
		console.log("Successfully connected to userInfo DB");
		checkDocumentsQuery(db, idQuery, function(result){
			if (result == false){
				insertDocuments(db, query, function(){
        	                        db.close();
                	                res.sendFile(path.join(__dirname + '/complete.html'));
                        	});
			} else {
				res.sendFile(path.join(__dirname + '/already.html'));
				db.close();
			}


		});
		
	});
});


app.get('/name', function(req, res){
	var first_name = req.query.FirstName;
	var last_name = req.query.LastName;

	console.log(first_name);
	console.log(last_name);
	res.sendFile(path.join(__dirname + '/some.html'));
});

app.listen(3000);
console.log("server started at http://locahost:3000");
