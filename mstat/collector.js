var config = require("./config");

console.log("Starting stats collector for server: ", config.servers);



var mongosKeys= "server insert  query update deletes getmore command  vsize    res faults  netIn netOut  conn repl       time".split(/\s+/);
var mongodKeys= "server insert  query update delete getmore command flushes mapped  vsize    res faults  locked-db idx-miss     qr|qw   ar|aw  netIn netOut  conn       time".split(/\s+/);

connectDB('', function(err, db){
	if(err) return console.dir(err);

	collect( );

	function collect(db){
		var spawn = require('child_process').spawn;

		for(var i=0; i<config.servers.length;i++){
			var child = spawn('mongostat', ['--discover', '--host',  config.servers[i] , config.interval]);
			child.stdout.on('data', function(chunk) {			 
			  processLog(chunk+"");
			});	
		}				 
		require("http").createServer().listen(12345, '127.0.0.1');
		console.log("server running");

	}	
	function processLog(log){
		var docs = [];
		var lines = log.split(/[\r\n]+/);
		lines.forEach(function(line){
			line = line.replace(/^\s*(.*?)\s*$/, "$1");
			if(!line) return;
			var values = line.split(/\s+/);
			var keys = values.length == mongosKeys.length ? mongosKeys:  (values.length== mongodKeys.length ?mongodKeys:null)
			if( !keys){
				console.log("Invalid line. Expected length is 15 or 20", "actual ",  values.length, line)	
				return;
			} 

			var obj = {};
			keys.forEach(function(key){
				obj[key] = values.shift();
			});
			obj.ts = new Date();
			docs.push(obj);	
		});	
		if(docs.length>0){
			db.collection('mstats').insert(docs, {w:1}, function(err, result){
					if(err) console.error("Failed to insert docs", err);
					else console.log("inserted ", docs.length, "docs");
			});		
		}			
	}
});

function doInsert(doc){
	// Retrieve
	var MongoClient = require('mongodb').MongoClient;

	// Connect to the db
	MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
	  if(err) { return console.dir(err); }

	  var collection = db.collection('test');
	  var doc1 = {'hello':'doc1'};
	  var doc2 = {'hello':'doc2'};
	  var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];

	  collection.insert(doc1);

	  collection.insert(doc2, {w:1}, function(err, result) {});

	  collection.insert(lotsOfDocs, {w:1}, function(err, result) {});

	});
}

function connectDB(url, callback){
	// Retrieve
	var MongoClient = require('mongodb').MongoClient;
	url = url || "mongodb://localhost:27017/test";
	// Connect to the db
	MongoClient.connect(url, function(err, db) {
	  //if(err) { return console.dir(err); }
	  callback(err, db);

	  

	});
}