/**
 * @file WebGLMath VecArray class
 * @copyright Laszlo Szecsi 2017
 */

/**
 * @class VecArray
 * @classdesc A base class for all vector arrays, gathering methods that share the same implementation in all array subclasses.
 * @constructor
 */
var VecArray = function(){
};

/**
 * @method add
 * @memberof VecArray.prototype  
 * @description Adds vectors from the two argument arrays, storing the result in this array.
 * @param {VecArray} b - Array of first terms. Its length must be identical to this array's length.
 * @param {VecArray} c - Array of second terms. Its length must be identical to this array's length.
 * @return {VecArray} this
 */
VecArray.prototype.add = function(b, c) {
  for(var i=0; i<this.storage.length; i++) {
 	this.storage[i] = b.storage[i] + c.storage[i];
  }
  return this;  
};

/**
 * @method addScaled
 * @memberof VecArray.prototype  
 * @description Adds vectors from the two argument arrays, scaling the second arguments, storing the result in this array.
 * @param {VecArray} b - Array of first terms. Its length must be identical to this array's length.
 * @param {VecArray} c - Array of second terms. Its length must be identical to this array's length.
 * @param {Number} dt - Single scalar scaling factor.
 * @return {VecArray} this
 */
VecArray.prototype.addScaled = function(b, c, dt) {
  for(var i=0; i<this.storage.length; i++) {
  this.storage[i] = b.storage[i] + c.storage[i] * dt;
  }
  return this;  
};

/**
 * @method sub
 * @memberof VecArray.prototype  
 * @description Substracts vectors from the two argument arrays, storing the result in this array.
 * @param {VecArray} b - Array of minuends. Its length must be identical to this array's length.
 * @param {VecArray} c - Array of subtrahends. Its length must be identical to this array's length.
 * @return {VecArray} this
 */
VecArray.prototype.sub = function(b, c) {
  for(var i=0; i<this.storage.length; i++) {
 	this.storage[i] = b.storage[i] - c.storage[i];
  }
  return this;  
};

/**
 * @method mul
 * @memberof VecArray.prototype  
 * @description Multipies, elementwise, vectors from the two argument arrays, storing the result in this array.
 * @param {VecArray} b - Array of factors. Its length must be identical to this array's length.
 * @param {VecArray} c - Array of factors. Its length must be identical to this array's length.
 * @return {VecArray} this
 */
VecArray.prototype.mul = function(b, c) {
  for(var i=0; i<this.storage.length; i++) {
 	this.storage[i] = b.storage[i] * c.storage[i];
  }
  return this;  
};


/**
 * @method mulWithVec1s
 * @memberof VecArray.prototype  
 * @description Multipies, elementwise, vectors from the two argument arrays, repeating individual values of the second one to produce the same number of elements as in the output array. For scaling with a single scalar factor, see [scale]{@link VecArray#scale}.
 * @param {VecArray} b - Array of factors. Its length must be identical to this array's length.
 * @param {Vec1Array} c - Array of factors. Its length must be identical to this array's length.
 * @return {VecArray} this
 */
VecArray.prototype.mulWithVec1s = function(b, c) {
  var stretchFactor = this.storage.length / c.storage.length; 
  var i=0;
  for(var j=0; j<c.storage.length; j++) { 
    for(var k=0; k<stretchFactor; k++, i++ ) {
    this.storage[i] = b.storage[i] * c.storage[j];
    }
  }
  return this;  
};

/**
 * @method div
 * @memberof VecArray.prototype  
 * @description Divides, elementwise, vectors from the two argument arrays, storing the result in this array.
 * @param {VecArray} b - Array of dividends.
 * @param {VecArray} c - Array of divisors.
 * @return {VecArray} this
 */
VecArray.prototype.div = function(b, c) {
  for(var i=0; i<this.storage.length; i++) {
 	this.storage[i] = b.storage[i] / c.storage[i];
  }
  return this;  
};

/**
 * @method divWithVec1s
 * @memberof VecArray.prototype  
 * @description Divides, elementwise, vectors from the two argument arrays, repeating individual values of the second one to produce the same number of values as in the output array.
 * @param {VecArray} b - Array of dividends. Its length must be identical to this array's length.
 * @param {Vec1Array} c - Array of divisors. Its length must be identical to this array's length.
 * @return {VecArray} this
 */
VecArray.prototype.divWithVec1s = function(b, c) {
  var stretchFactor = this.storage.length / c.storage.length; 
  var i=0;
  for(var j=0; j<c.storage.length; j++) { 
    for(var k=0; k<stretchFactor; k++, i++ ) {
    this.storage[i] = b.storage[i] / c.storage[j];
    }
  }
  return this;  
};

/**
 * @method addAll
 * @memberof VecArray.prototype  
 * @description Adds a vector to all argument array elements, storing the result in this array.
 * @param {VecArray} b - Array of first operands. Same length as this.
 * @param {Vec} c - Second operand.
 * @return {VecArray} this
 */
VecArray.prototype.addAll = function(b, c) {
  for(var i=0; i<this.storage.length;) {
    for(var k=0; k<c.storage.length; i++, k++) {
    this.storage[i] = b.storage[i] + c.storage[k];
    }
  }
  return this;  
};

/**
 * @method subAll
 * @memberof VecArray.prototype  
 * @description Subtracts a vector from all argument array elements, storing the result in this array.
 * @param {VecArray} b - Array of first operands. Same length as this.
 * @param {Vec} c - Second operand.
 * @return {VecArray} this
 */
VecArray.prototype.subAll = function(b, c) {
  for(var i=0; i<this.storage.length;) {
    for(var k=0; k<c.storage.length; i++, k++) {
    this.storage[i] = b.storage[i] - c.storage[k];
    }
  }
  return this;  
};

/**
 * @method mulAll
 * @memberof VecArray.prototype  
 * @description Multiplies (elementwise) a vector with all argument array elements, storing the result in this array.
 * @param {VecArray} b - Array of first operands. Same length as this.
 * @param {Vec} c - Second operand.
 * @return {VecArray} this
 */
VecArray.prototype.mulAll = function(b, c) {
  for(var i=0; i<this.storage.length;) {
    for(var k=0; k<c.storage.length; i++, k++) {
    this.storage[i] = b.storage[i] * c.storage[k];
    }
  }
  return this;  
};

/**
 * @method divAll
 * @memberof VecArray.prototype  
 * @description Divides (elementwise) all argument array elements with a vector, storing the result in this array.
 * @param {VecArray} b - Array of first operands. Same length as this.
 * @param {Vec} c - Second operand.
 * @return {VecArray} this
 */
VecArray.prototype.divAll = function(b, c) {
  for(var i=0; i<this.storage.length;) {
    for(var k=0; k<c.storage.length; i++, k++) {
    this.storage[i] = b.storage[i] / c.storage[k];
    }
  }
  return this;  
};

/**
 * @method scale
 * @memberof VecArray.prototype  
 * @description Multipies vectors from an array with a scalar, storing the result in this array. For scaling with factors stored in an array, see [mulAll]{@link VecArray#mulAll}.
 * @param {VecArray} b - Array of vectors to scale. Its length must be identical to this array's length.
 * @param {VecArray} c - Scale factor.
 * @return {VecArray} this
 */
VecArray.prototype.scale = function(b, s) {
  for(var i=0; i<this.storage.length; i++) {
    this.storage[i] = b.storage[i] * s;
  }
  return this;  
};

/**
 * @method exp
 * @memberof VecArray.prototype  
 * @description Exponentiates vectors from an array with a scalar, storing the result in this array. For scaling with factors stored in an array, see [mulAll]{@link VecArray#mulAll}.
 * @param {VecArray} b - Array of vectors to scale. Its length must be identical to this array's length.
 * @param {VecArray} c - Exponent.
 * @return {VecArray} this
 */
VecArray.prototype.exp = function(b, s) {
  for(var i=0; i<this.storage.length; i++) {
    this.storage[i] = Math.pow(b.storage[i], s);
  }
  return this;  
};

/**
 * @method random
 * @memberof VecArray.prototype  
 * @description Fills the array with random values between 0 and 1.
 * @return {VecArray} this
 */
VecArray.prototype.random = function() {
  for(var i=0; i<this.storage.length; i++) {
    this.storage[i] = Math.random();
  }
  return this;  
};

/**
 * @method clamp
 * @memberof VecArray.prototype  
 * @description Constrains values in the array to the [0,1) interval.
 * @return {VecArray} this
 */
VecArray.prototype.clamp = function() {
  for(var i=0; i<this.storage.length; i++) {
    if(this.storage[i] < 0) {
      this.storage[i] = 0;
    }
    if(this.storage[i] > 1) {
      this.storage[i] = 1;
    }
  }
  return this;  
};

// CommonJS style export to allow file to be required in server side node.js
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
  module.exports = VecArray;
}
