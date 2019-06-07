"use strict";

/* exported dft */
const dft = (...a) => {
  let v;
  for(let i=0; i<a.length; i++){
    v = a[i];
    if(v || v === 0){
      return v;
    }
  }
  return undefined;
};


const missingPropertyDummy = new Proxy(() => false, { 
  get: function(){ 
    return missingPropertyDummy; 
  }, 
  apply: function(){ 
    return missingPropertyDummy; 
  }
});

const onlyWarnOnMissingPropertyAccess =
  target => new Proxy(target, { 
    get : function(target, name){ 
      if(name === "splice"){ return undefined; }
      if(name === "isProxy"){ return target; }
      if(!(name in target)){
        console.error("WARNING: Ignoring attempt to access property '" + 
          name + "'. Is '" + name + "' an unused uniform?" ); 
        return missingPropertyDummy;
      }
      return target[name];
    }
  });