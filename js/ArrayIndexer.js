/**
 * @file WebGLMath ArrayIndexer class
 * @copyright Laszlo Szecsi 2017
 */

 /**
 * @class ArrayIndexer
 * @classdesc A prototype for all vector and matrix arrays. It is a proxy that catches access to property accesses with integer keys, returning an appropriate vector or matrix object wrapping the corresponding typed data in the array.
 * @constructor
 */
var ArrayIndexer = function(){
  return new Proxy({}, {
    get : function(target, name){
      var index = parseInt(name);
      if(!isNaN(index)){
        var result = Object.create(Vec2.prototype);
        result.storage = this.storage.subarray(index*2, index*2+2);
        return result;  

        return new Vec1Material.dummy;
      }
      return target[name];
    },
    set : function(target, property, value){
      if(!(name in target)){
        console.error("WARNING: Ignoring attempt to set material property '" +
            name + "'. Is '" + name + "' an unused uniform?" );
        return true;
      }
      target[property].set(value);
      return true;
    },    
  });

};