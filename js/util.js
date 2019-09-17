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

Error.prepareStackTrace = (error, stack) => {
    let trace = '';
    let max_width = 0;
    for (let i = 0; i < stack.length; i++){
        let frame = stack[i];

        let typeLength = 0;
        typeLength = (frame.getTypeName() !== null && frame.getTypeName() !== '[object global]') ? frame.getTypeName().length : 0;
        typeLength = typeLength.length > 50 ? 50 : typeLength;

        let functionlength = frame.getFunctionName() !== null ? frame.getFunctionName().length : '<anonymous>'.length;
        functionlength = functionlength > 50 ? 50 : functionlength;

        if (typeLength + functionlength > max_width) {
            max_width = typeLength + functionlength;
          }
    }

    for (let i = 0; i < stack.length; i++) {
        let frame = stack[i];

        let filepath = frame.getFileName();

        let typeName = '';  
        if (frame.getTypeName() !== null && frame.getTypeName() !== '[object global]') {
            typeName = frame.getTypeName().substring(0, 50) + '.';
          }

        let functionName = '<anonymous>';
        if (frame.getFunctionName() !== null) {
            functionName = frame.getFunctionName().substring(0, 50);
          }

        let space = ' ';
        let width = max_width - (typeName.length + functionName.length) + 3;
        space = Array(width).join(' ');
        let line = '  at ' + typeName + functionName + space + filepath + 
            ':' + frame.getLineNumber() + 
            ':' + frame.getColumnNumber() + '\n';

        trace += line;
    }
    return trace;
};

const trace = () => {
  const error = new Error();
  if('captureStackTrace' in Error){
    Error.captureStackTrace(error, trace);
  }
  console.log(error.stack);
};

// CommonJS style export to allow file to be required in server side node.js
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
  module.exports = dft;
}
