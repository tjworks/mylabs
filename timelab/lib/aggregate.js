 

// Time lab #1


var labels = [];
var queries = [];
var responseTime = [];
var pageFaults = [];
var totalTime = [];
db.snaps.find({'spec.suite':'suite-sample-read-varies-by-days', label:'end'}, { spec:1, 'delta.opcounters.query':1,'delta.uptimeMillis':1}).sort({'spec.days':1}).forEach(function(item){ 
	labels.push(item.spec.days + " days");
	var millis = item.delta.uptimeMillis.floatApprox;
	
	queries.push(Math.round(item.delta.opcounters.query/millis * 1000 ));

	if(item.delta.extra_info && item.delta.extra_info.page_faults)
		pageFaults.push(Math.round(item.delta.extra_info.page_faults/millis * 1000 ));
	else
		pageFaults.push(0)
	
	var rt =  Math.round  (( millis  * item.spec.threads * 1000 )/ item.delta.opcounters.query );
	responseTime.push(       rt  ); 

	print("Millis "+millis +"  threads "+ item.spec.threads + "Query " + item.delta.opcounters.query +"  RT "+ rt);

	totalTime.push(millis);
     
});

print(labels.join("\t"));

print(queries.join("\t"));
print(responseTime.join("\t"));
print(pageFaults.join("\t"));
print(totalTime.join("\t"));

 


// Time lab #2: suite-sample-read-varies-by-threads
//  all data fits in memory


var labels = [];
var queries = [];
var responseTime = [];
var pageFaults = [];
var totalTime = [];
db.snaps.find({'spec.suite':'suite-sample-read-varies-by-threads', label:'end'}, { spec:1, 'delta.opcounters.query':1,'delta.uptimeMillis':1}).sort({'spec.threads':1}).forEach(function(item){ 
	labels.push(item.spec.threads + " threads");
	var millis = item.delta.uptimeMillis.floatApprox;
	
	queries.push(Math.round(item.delta.opcounters.query/millis * 1000 ));

	if(item.delta.extra_info && item.delta.extra_info.page_faults)
		pageFaults.push(Math.round(item.delta.extra_info.page_faults/millis * 1000 ));
	else
		pageFaults.push(0)
	
	var rt =  Math.round  (( millis  * item.spec.threads * 1000 )/ item.delta.opcounters.query );
	responseTime.push(       rt  ); 

	print("Millis "+millis +"  threads "+ item.spec.threads + "Query " + item.delta.opcounters.query +"  RT "+ rt);

	totalTime.push(millis);
     
});

print(labels.join("\t"));

print(queries.join("\t"));
print(responseTime.join("\t"));
print(pageFaults.join("\t"));
print(totalTime.join("\t"));




 

// Time lab #3


var labels = [];
var queries = [];
var responseTime = [];
var pageFaults = [];
var totalTime = [];
db.snaps.find({'spec.suite':'suite-hour-read-varies-by-days', label:'end'}, { spec:1, 'delta.opcounters.query':1,'delta.uptimeMillis':1}).sort({'spec.days':1}).forEach(function(item){ 
	labels.push(item.spec.days + " days");
	var millis = item.delta.uptimeMillis.floatApprox;
	
	queries.push(Math.round(item.delta.opcounters.query/millis * 1000 ));

	if(item.delta.extra_info && item.delta.extra_info.page_faults)
		pageFaults.push(Math.round(item.delta.extra_info.page_faults/millis * 1000 ));
	else
		pageFaults.push(0)
	
	var rt =  Math.round  (( millis  * item.spec.threads * 1000 )/ item.delta.opcounters.query );
	responseTime.push(       rt  ); 

	//print("Millis "+millis +"  threads "+ item.spec.threads + "Query " + item.delta.opcounters.query +"  RT "+ rt);

	totalTime.push(millis);
     
});

print(labels.join("\t"));

print(queries.join("\t"));
print(responseTime.join("\t"));
print(pageFaults.join("\t"));
print(totalTime.join("\t"));

 


// Time lab #4: suite-sample-read-varies-by-threads
//  all data fits in memory


var labels = [];
var queries = [];
var responseTime = [];
var pageFaults = [];
var totalTime = [];
db.snaps.find({'spec.suite':'suite-hour-read-varies-by-threads', label:'end'}, { spec:1, 'delta.opcounters.query':1,'delta.uptimeMillis':1}).sort({'spec.threads':1}).forEach(function(item){ 
	labels.push(item.spec.threads + " threads");
	var millis = item.delta.uptimeMillis.floatApprox;
	
	queries.push(Math.round(item.delta.opcounters.query/millis * 1000 ));

	if(item.delta.extra_info && item.delta.extra_info.page_faults)
		pageFaults.push(Math.round(item.delta.extra_info.page_faults/millis * 1000 ));
	else
		pageFaults.push(0)
	
	var rt =  Math.round  (( millis  * item.spec.threads * 1000 )/ item.delta.opcounters.query );
	responseTime.push(       rt  ); 

	print("Millis "+millis +"  threads "+ item.spec.threads + "Query " + item.delta.opcounters.query +"  RT "+ rt);

	totalTime.push(millis);
     
});

print(labels.join("\t"));

print(queries.join("\t"));
print(responseTime.join("\t"));
print(pageFaults.join("\t"));
print(totalTime.join("\t"));



