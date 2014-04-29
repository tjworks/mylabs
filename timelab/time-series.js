//-----------------------------------------------------------------------------
// Document per sample (dps)  
//
 

function DocumentPerSample() { 
    db.dps.ensureIndex({svr:1, ts:1});
    this.store = function( server_name, cpu_measurement, timestamp ) { 
        // implement the mongodb method to store a sample
        db.dps.save({
            svr: server_name,
            load: cpu_measurement,
            ts: timestamp
        });
    };

    this.query = function( server_name, start, end ) {
        // query the set of documents for that server over the specified 
        // time range. don't worry about aggregating the data, just return 
        // all of the docs that you need for the answer 
        // remember to actually drain the cursor! (hint: "itcount()")
        
        //db.col.find({$and: [ {ts: {$gte: start} }, {ts: {$lte: end}} ]} ).forEach(function(item){
        db.dps.find({svr: server_name,      ts: {$gte: start, $lte:end}  }    ).itcount();    
    };

}


//-----------------------------------------------------------------------------
// Document per hour (dph)
//
    
function DocumentPerHour() { 
    
   db.dph.ensureIndex({ ts:1, svr:1});
    this.store = function( server_name, cpu_measurement, timestamp, method ) { 
        
        var dateString = timestamp.toISOString().substring(0,13);
        var obj = { $inc: {
                    load_sum:  cpu_measurement , 
                    load_count: 1
                  } };
        if(!method || method == 'update'){
            db.dph.update({ svr: server_name, ts: dateString }, obj, {upsert:1  } );
            //print(method);    
        }
        else{
             db.dph.findAndModify (
                {   query : { svr : server_name, ts : dateString },
                    update: obj,
                    upsert : 1 } 
             );
        }
        
    }; 
    this.query = function( server_name, start, end ) {
        // query the set of documents for that server over the specified 
        // time range. don't worry about aggregating the data, just return 
        // all of the docs that you need for the answer 
        // remember to actually drain the cursor! (hint: "itcount()")
        start.setMinutes(0);
        start.setSeconds(0);
        start.setMilliseconds(0);
        
        end.setMinutes(0);
        end.setSeconds(0);
        end.setMilliseconds(0);
        db.dph.find({svr: server_name,      ts: {$gte: start, $lte:end}   }    ).itcount();
    };
}
 

//-----------------------------------------------------------------------------
// Document per day (dpd)
//

function DocumentPerDay() { 
    db.dpd.ensureIndex({svr:1, ts:1});
    var setOnInsert = {};
    for(var i=0;i<24;i++){
        setOnInsert["" + i] = {count:0, sum:0 };
    }
        
    var lastSeen = null;
    this.store = function( server_name, cpu_measurement, timestamp ) { 
        // implement the mongodb method to store a sample
        
        var min = timestamp.getHours()+"";
        timestamp.setHours(0);
        timestamp.setMinutes(0);
        timestamp.setSeconds(0);
        timestamp.setMilliseconds(0);
        
        if(lastSeen+"" != timestamp+""){
            //obj.$setOnInsert = {hours: setOnInsert};
            db.dpd.update({ ts: timestamp, svr:server_name}, {$setOnInsert: {hours: setOnInsert}}, {upsert:true});
            lastSeen  = timestamp;    
            print("Never found creating ======================", lastSeen, timestamp);
        }
        
        var obj = { $inc: { } };
        obj.$inc['hours.'+ min+".count"] = 1; // increment count
        obj.$inc["hours."+ min+".sum"] =   cpu_measurement ;  // increment load value
            
            
        db.dpd.update({ ts: timestamp , svr: server_name }, obj  );
        //print(obj);
        //print("Stored "+ server_name)
        
    };

    this.query = function( server_name, start, end ) {
        // query the set of documents for that server over the specified 
        // time range. don't worry about aggregating the data, just return 
        // all of the docs that you need for the answer 
        // remember to actually drain the cursor! (hint: "itcount()")
        
        start.setHours(0);
        start.setMinutes(0);
        start.setSeconds(0);
        start.setMilliseconds(0);
        
        end.setHours(0);
        end.setMinutes(0);
        end.setSeconds(0);
        end.setMilliseconds(0);
        
        db.dpd.find({svr: server_name,   $and: [ {ts: {$gte: start}}, {ts:{$lte:end}}     ]  }).itcount();
    };
}
