load("lib/snapshot.js");
  
print("Test end - snapshot ");
var spec =  {suite:suite, server:serverCount, days:dayCount, impl:impl,  clients : concurrency};
snapshotStatus(spec, "end"); 
