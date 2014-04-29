load("lib/snapshot.js");
  
print("Test begin - snapshot ");
var spec =  {suite:suite, server:serverCount, days:dayCount, impl:impl,  threads : concurrency};
snapshotStatus(spec, "begin"); 
