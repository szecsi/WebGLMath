"use strict";

/* exported dft */

/** 
 * @function dft
 * @description Returns the first parameter that is truthy or 0. Used to get the first valid value from a chain of possible defaults.
 * @param {...*} a - A list of possible values.
 * @return {*} The first of the parameters that is truthy or 0, or undefined if there are no such parameters.
 */
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

/**
 * @global missingPropertyDummy
 * @description A Proxy object that absorbs any chain of method calls and property accesses without effect.
 */
const missingPropertyDummy = new Proxy(() => false, { 
  get: function(){ 
    return missingPropertyDummy; 
  }, 
  apply: function(){ 
    return missingPropertyDummy; 
  }
});


/** 
 * @function onlyWarnOnMissingPropertyAccess
 * @description Hides an object behind a proxy that only gives a warning if a non-existant property is accessed, not an error. This is useful for [UniformProvider]{@link UniformProvider} subclasses with dynamically added properties. If a property is removed or optimized out from GLSL code during a testing change, code setting it still works.
 * @param {...*} a - A list of possible values.
 * @return {*} The first of the parameters that is truthy or 0, or undefined if there are no such parameters.
 */
const onlyWarnOnMissingPropertyAccess =
  target => new Proxy(target, { 
    get : function(target, name){ 
      if(name === "splice"){ return undefined; }
      if(name === "proxyTarget"){ return target; }
      if(!(name in target)){
        console.error(`WARNING: Ignoring attempt to access property ${name}. Is ${name} an unused uniform?` ); 
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
