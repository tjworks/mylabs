 


var labels = '';
var queries = '';
var responseTime = '';
var pageFaults = '';
db.snaps.find({'spec.suite':'suite-sample-read-varies-by-days', label:'end'}, { spec:1, 'delta.opcounters.query':1,'delta.uptimeMillis':1}).sort({'spec.days':1}).forEach(function(item){ 
	labels = labels ? (labels+"\t"): labels;
	labels+= item.spec.days;
	

	var millis = item.delta.uptimeMillis.floatApprox;
	print("Millis"+millis)
	queries = queries ? (queries+"\t"): queries;
	queries+= "" + Math.round(item.delta.opcounters.query/millis * 1000 );

	// queries = queries ? (queries+","): queries;
	// queries+= Math.round(item.delta.opcounters.query/millis * 1000 );
	
	// queries = queries ? (queries+","): queries;
	// queries+= Math.round(item.delta.opcounters.query/millis * 1000 );
     
});

print(labels);
print(queries);
