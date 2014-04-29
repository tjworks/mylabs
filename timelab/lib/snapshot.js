


;db.snaps.ensureIndex({suite:1, impl:1}, {sparse:1});

function snapshotStatus(spec, label){
	//var s = db.serverStatus();

	var s = db.serverStatus({recordStats:0, locks:0, metrics:0})
	//delete s.locks["."];

	var obj = {
		spec: spec,
		ts: new Date(),		
		label: label,
		status: s
	}
	  
	if(label === 'end'){
		var begin = db.snaps.findOne({spec:spec, label:'begin'});
		if(begin && begin.status){
			obj.delta = getDelta(obj.status, begin.status);
			printjson(obj.delta)
		}	
	}	
	print("################# Record snapshot " + label);
	db.snaps.update({spec:spec, label:label}, obj, {upsert:1});
	
}


function preprocess(){

	db.snaps.find({label:'end'}).forEach(function(item){

		var start = db.snaps.findOne({spec: item.spec, label:'begin'});
		if(start){
			db.snaps.update(
				{spec:spec, label:'delta'},
				{$set: {delta: getDelta(item.status, start.status)} },
				{upsert:1 }
			);			
		}

	});

}


function getDelta(x, y){

	if(typeof NumberLong == 'undefined') NumberLong = function(){};

    if(typeof x === 'object' && typeof y === 'object'){
    		var ret = {};
    		for(var i in x){
    			var res = getDelta( x[i] , y[i]);
    			if(res !== null)
    				ret[i] = res;
    		}
    		return ret;    		
    }


    if( (x instanceof NumberLong || typeof(x) == 'number') && ( y instanceof NumberLong || typeof(y) == 'number')  ){
    	return x - y;
    }

    if( typeof(x) == 'object' && x.getTime && typeof(y) == 'object' && y.getTime){
    	return x.getTime() - y.getTime();
    }
    return null;  
};