;
function transform(obj, func){
	if(typeof obj != 'object'){
		return func(obj);
	}
	for(var i in obj){
		if(obj.hasOwnProperty(i))
			obj[i] = transform(obj[i], func);
	}
	return obj;
}

function toM(obj){
	transform(obj, function(val){
		if(typeof val == 'number'){
			if(val > 1000000)
				val = Math.round( val / 100000) / 10		+ "M"	
			if(val > 10000)
				val = Math.round( val / 100) / 10		+ "K"	
		}
		return val
	});
	return obj;
}