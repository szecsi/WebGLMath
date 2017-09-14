/**
 * @file WebGLMath Vec1 class
 * @copyright Laszlo Szecsi 2017
 */

/**
 * @class Vec1
 * @classdesc A 32-bit float wrapped as a single-element vector. May reflect an ESSL float uniform variable.
 * @description Without parameters, initializes the vector to 0.
 * @constructor
 */
var Vec1 = function(u){
  /**
   * @name Vec1.prototype#storage
   * @description 1-element typed array for coordinate storage.
   * @type Float32Array
   */  
  this.storage = new Float32Array([
    u && u.x || Number(u).valueOf() || 0
  ]);
};

/**
 * @method clone
 * @memberof Vec1.prototype 
 * @description Creates a copy.
 * @return {Vec1} A new instance with identical contents.
 */
Vec1.prototype.clone = function() {
  var result = Object.create(Vec1.prototype);
  result.storage = new Float32Array(this.storage);
  return result;
};

/**
 * @name Vec1.prototype#x
 * @description Alias for storage[0];
 * @type Number
 */
Object.defineProperty(Vec1.prototype, 'x', {
  get: function() { return this.storage[0]; },
  set: function(value) { this.storage[0] = value; }
});

/**
 * @method set
 * @memberof Vec1.prototype  
 * @description Simulates operator <code>=</code>. Sets the coordinates from another vector, or number values. Without parameters, sets (0, 0, 0, 1).
 * @param {Vec1 | Object | Number} [u=0] - Any object (property x), or a numerical value.
 * @return {Vec1} this
 */
Vec1.prototype.set = function(u) {
  this.storage[0] = u && u.x || Number(u).valueOf() || 0;
  return this;  
};

/**
 * @method random
 * @memberof Vec1
 * @static 
 * @description Return a new {@link Vec1} with random values that to lie between two values, elementwise.
 * @param {Vec1 | Object | Number} [minVal=0] - Specifies the lower end of the random range. If a scalar is given, it applies to all channels.
 * @param {Vec1 | Object | Number} [maxVal=1] - Specifies the upper end of the random range. If a scalar is given, it applies to all channels.
 * @return {Vec1} this
 */
Vec1.random = function(minVal, maxVal) {
  var result = Object.create(Vec1.prototype);
  result.storage = new Float32Array(1);
  var mina = minVal && minVal.x || Number(minVal).valueOf() || 0;
  var maxa = maxVal && ((maxVal.x-1) ||( Number(maxVal).valueOf()-1) || 0) + 1;
  result.storage[0] = Math.random() * (maxa - mina) + mina;
  return result;
};

/**
 * @method setRandom
 * @memberof Vec1.prototype  
 * @description Fill the vector with random values that to lie between two further values, elementwise.
 * @param {Vec1 | Object | Number} [minVal=0] - Specifies the lower end of the random range. If a scalar is given, it applies to all channels.
 * @param {Vec1 | Object | Number} [maxVal=1] - Specifies the upper end of the random range. If a scalar is given, it applies to all channels.
 * @return {Vec1} this
 */
Vec1.prototype.setRandom = function(minVal, maxVal) {
  var mina = minVal && minVal.x || Number(minVal).valueOf() || 0;
  var maxa = maxVal && ((maxVal.x-1) ||( Number(maxVal).valueOf()-1) || 0) + 1;
  this.storage[0] = Math.random() * (maxa - mina) + mina;
  return this;  
};

/**
 * @method clamp
 * @memberof Vec1.prototype
 * @description Constrains the value of this vector to lie between two further values, elementwise, overwriting the contents with the result.
 * @param {Vec1 | Object | Number} [minVal=0] - Specifies the lower end of the range into which to constrain the elements. If a scalar is given, it applies to all channels.
 * @param {Vec1 | Object | Number} [maxVal=1] - Specifies the upper end of the range into which to constrain the elements. If a scalar is given, it applies to all channels.
 * @return {Vec1} this
 */
Vec1.prototype.clamp = function(minVal, maxVal) {
  var mina = minVal && minVal.x || Number(minVal).valueOf(0) || 0;
  if(this.storage[0] < mina){
    this.storage[0] = mina;
  }
  var maxa = maxVal && ((maxVal.x-1) || (Number(maxVal).valueOf(0)-1) || 0) + 1;
  if(this.storage[0] > maxa){
    this.storage[0] = maxa;
  }
  return this;
};

/**
 * @method setClamped
 * @memberof Vec1.prototype  
 * @description Fast. Constrains a value to lie between two further values, elementwise, storing the result in this vector.
 * @param {Vec1} b - The value to constrain.
 * @param {Vec1 | Object | Number} [minVal=0] - Specifies the lower end of the range into which to constrain the elements. If a scalar is given, it applies to all channels.
 * @param {Vec1 | Object | Number} [maxVal=1] - Specifies the upper end of the range into which to constrain the elements. If a scalar is given, it applies to all channels.
 * @return {Vec1} this
 */
Vec1.prototype.setClamped = function(b, minVal, maxVal) {
  var mina = minVal && minVal.x || Number(minVal).valueOf(0) || 0;
  var maxa = maxVal && ((maxVal.x-1) || (Number(maxVal).valueOf(0)-1) || 0) + 1;
  if(b.storage[0] < mina){
    this.storage[0] = mina;
  } else if(b.storage[0] > maxa){
    this.storage[0] = maxa;
  } else {
    this.storage[0] = b.storage[0];
  }
  return this;
};

/**
 * @method add
 * @memberof Vec1.prototype  
 * @description Simulates operator <code>+=</code>. Adds another vector to this vector, overwriting the contents with the result.
 * @param {Vec1 | Object | Number} [u=0] - Any object (property x), or a numerical value.
 * @return {Vec1} this
 */
Vec1.prototype.add = function(u) {
  this.storage[0] += u && u.x || Number(u).valueOf() || 0;
  return this;  
};

/**
 * @method addScaled
 * @memberof Vec1.prototype  
 * @description Simulates <code>+= dt *</code>. Adds another vector, scaled by `dt`, to this vector, overwriting the contents with the result.
 * @param {Number} dt - Scaling factor. 
 * @param {Vec1 | Object | Number} [u=0] - Any object (property x), or a numerical value.
 * @return {Vec1} this
 */
Vec1.prototype.addScaled = function(dt, u) {
  this.storage[0] += dt * (u && u.x || Number(u).valueOf() || 0);
  return this;  
};

/**
 * @method plus
 * @memberof Vec1.prototype  
 * @description Simulates operator <code>+</code>. Adds this vector and the parameter vector, and returns the result in a new instance.
 * @param {Vec1 | Object | Number} [u=0] - Any object (property x), or a numerical value.
 * @return {Vec1} the sum of the two vectors
 */
Vec1.prototype.plus = function(u) {
  var result = Object.create(Vec1.prototype);
  result.storage = new Float32Array(1);
  result.storage[0] = this.storage[0] + (u && u.x || Number(u).valueOf() || 0);
  return result;
};

/**
 * @method setSum
 * @memberof Vec1.prototype  
 * @description Fast. Adds the two argument vectors, storing the result in this vector.
 * @param {Vec1} b - Term 1.
 * @param {Vec1} c - Term 2. 
 * @return {Vec1} this
 */
Vec1.prototype.setSum = function(b, c) {
  this.storage[0] = b.storage[0] + c.storage[0];
  return this;  
};

/**
 * @method sub
 * @memberof Vec1.prototype  
 * @description Simulates operator <code>-=</code>. Subtracts another vector from this vector, overwriting the contents with the result.
 * @param {Vec1 | Object | Number} [u=0] - Any object (property x), or a numerical value.
 * @return {Vec1} this
 */
Vec1.prototype.sub = function(u) {
  this.storage[0] -= u && u.x || Number(u).valueOf() || 0;
  return this;  
};

/**
 * @method minus
 * @memberof Vec1.prototype  
 * @description Simulates operator <code>-</code>. Subtracts the parameter vector from this vector, and returns the result in a new instance.
 * @param {Vec1 | Object | Number} [u=0] - Any object (property x), or a numerical value.
 * @return {Vec1} the difference of the two vectors
 */
Vec1.prototype.minus = function(u) {
  var result = Object.create(Vec1.prototype);
  result.storage = new Float32Array(1);
  result.storage[0] = this.storage[0] - (u && u.x || Number(u).valueOf() || 0);
  return result;
};

/**
 * @method setDifference
 * @memberof Vec1.prototype  
 * @description Fast. Substracts the second argument vector from the first one, storing the result in this vector.
 * @param {Vec1} b - Minuend.
 * @param {Vec1} c - Subtrahend. 
 * @return {Vec1} this
 */
Vec1.prototype.setDifference = function(b, c) {
  this.storage[0] = b.storage[0] - c.storage[0];
  return this;  
};

/**
 * @method mul
 * @memberof Vec1.prototype  
 * @description Simulates operator <code>*=</code>. Multiplies this vector with another vector elementwise, or scalar, overwriting the contents with the result.
 * @param {Vec1 | Object | Number} [u=1] - Any object (property x), or a numerical value.
 * @return {Vec1} this
 */
Vec1.prototype.mul = function(u) {
  this.storage[0] *= u && ((u.x - 1) || (Number(u).valueOf()-1) || 0) + 1;
  return this;  
};

/**
 * @method times
 * @memberof Vec1.prototype
 * @description Simulates operator <code>*</code>. Multiplies this vector with another vector elementwise, or scalar, and returns the result in a new instance.
 * @param {Vec1 | Object | Number} [u=1] - Any object (property x), or a numerical value.
 * @return {Vec1} the elementwise product of the two vectors
 */
Vec1.prototype.times = function(u) {
  var result = Object.create(Vec1.prototype);
  result.storage = new Float32Array(1);
  result.storage[0] = this.storage[0] * (u && ((u.x - 1) || (Number(u).valueOf()-1) || 0) + 1);
  return result;
};

/**
 * @method setProduct
 * @memberof Vec1.prototype  
 * @description Fast. Multiplies, elementwise, the two argument vectors, storing the result in this vector.
 * @param {Vec1} b - Factor 1.
 * @param {Vec1} c - Factor 2. 
 * @return {Vec1} this
 */
Vec1.prototype.setProduct = function(b, c) {
  this.storage[0] = b.storage[0] * c.storage[0];
  return this;  
};

/**
 * @method div
 * @memberof Vec1.prototype  
 * @description Simulates operator <code>/=</code>. Divides, elementwise, this vector with another vector, or scalar, overwriting the contents with the result.
 * @param {Vec1 | Object | Number} [u=1] - Any object (property x), or a numerical value.
 * @return {Vec1} this
 */
Vec1.prototype.div = function(u) {
  this.storage[0] /= u && ((u.x - 1) || (Number(u).valueOf()-1) || 0) + 1;
  return this;  
};

/**
 * @method over
 * @memberof Vec1.prototype
 * @description Simulates operator <code>/</code>. Divides, elementwise, this vector with another vector, or scalar, and returns the result in a new instance.
 * @param {Vec1 | Object | Number} [u=1] - Any object (property x), or a numerical value.
 * @return {Vec1} the elementwise product of the two vectors
 */
Vec1.prototype.over = function(u) {
  var result = Object.create(Vec1.prototype);
  result.storage = new Float32Array(1);
  result.storage[0] = this.storage[0] / (u && ((u.x - 1) || (Number(u).valueOf()-1) || 0) + 1);
  return result;
};

/**
 * @method setQuotient
 * @memberof Vec1.prototype  
 * @description Fast. Divides, elementwise, the two argument vectors, storing the result in this vector.
 * @param {Vec1} b - Dividend.
 * @param {Vec1} c - Divisor. 
 * @return {Vec1} this
 */
Vec1.prototype.setQuotient = function(b, c) {
  this.storage[0] = b.storage[0] / c.storage[0];
  return this;  
};

/**
 * @method setScaled
 * @memberof Vec1.prototype  
 * @description Fast. Scales the vector by a scalar.
 * @param {Vec1} a - Vector to scale.
 * @param {Number} s - Scale factor. 
 * @return {Vec1} this
 */
Vec1.prototype.setScaled = function(a, s){
  this.storage[0] = a.x * s;
  return this;
};

/**
 * @method setScaledByInverse
 * @memberof Vec1.prototype  
 * @description Fast. Scales the vector by the reciprocal of scalar.
 * @param {Vec1} a - Vector to scale.
 * @param {Number} s - Scale factor inverse.
 * @return {Vec1} this
 */
Vec1.prototype.setScaledByInverse = function(a, s){
  this.storage[0] = a.x / s;
  return this;  
};

/**
 * @method dot
 * @memberof Vec1.prototype  
 * @description Computes the dot product with another vector.
 * @param {Vec1 | Object | Number} [u=0] - Any object (property x), or a numerical value.
 * @return {Number}
 */
Vec1.prototype.dot = function(u) {
  return this.storage[0] * (u && u.x || Number(u).valueOf() || 0); 
};

/**
 * @method setDotProductOfVec2s
 * @memberof Vec1.prototype
 * @description Computes the dot product of two two-element vectors, and stores the result.
 * @param {Vec3} b - Operand 1.
 * @param {Vec3} c - Operand 2.
 * @return this
 */
Vec1.prototype.setDotProductOfVec2s = function(b, c) {
  this.storage[0] = b.storage[0] * c.storage[0] + b.storage[1] * c.storage[1];
  return this;
};

/**
 * @method setDotProductOfVec3s
 * @memberof Vec1.prototype
 * @description Computes the dot product of two three-element vectors, and stores the result.
 * @param {Vec3} b - Operand 1.
 * @param {Vec3} c - Operand 2.
 * @return this
 */
Vec1.prototype.setDotProductOfVec3s = function(b, c) {
  this.storage[0] = b.storage[0] * c.storage[0] + b.storage[1] * c.storage[1] + b.storage[2] * c.storage[2];
  return this;
};

/**
 * @method setDotProductOfVec4s
 * @memberof Vec1.prototype
 * @description Computes the dot product of two three-element vectors, and stores the result.
 * @param {Vec3} b - Operand 1.
 * @param {Vec3} c - Operand 2.
 * @return this
 */
Vec1.prototype.setDotProductOfVec4s = function(b, c) {
  this.storage[0] = b.storage[0] * c.storage[0] + b.storage[1] * c.storage[1] + b.storage[2] * c.storage[2] + b.storage[3] * c.storage[3];
  return this;
};

/**
 * @method setLengthOfVec2
 * @memberof Vec1.prototype
 * @description Computes the length of a two-element vector, and stores the result.
 * @param {Vec2} b - The vector whose length must be stored.
 * @return this
 */
Vec1.prototype.setLengthOfVec2 = function(b) {
  this.storage[0] = Math.sqrt(b.storage[0] * b.storage[0] + b.storage[1] * b.storage[1]);
  return this;
};

/**
 * @method setLengthOfVec3
 * @memberof Vec1.prototype
 * @description Computes the length of a three-element vector, and stores the result.
 * @param {Vec3} b - The vector whose length must be stored.
 * @return this
 */
Vec1.prototype.setLengthOfVec3 = function(b) {
  this.storage[0] = Math.sqrt(b.storage[0] * b.storage[0] + b.storage[1] * b.storage[1] + b.storage[2] * b.storage[2]);
  return this;
};

/**
 * @method setLengthOfVec4
 * @memberof Vec1.prototype
 * @description Computes the length of a four-element vector, and stores the result.
 * @param {Vec4} b - The vector whose length must be stored.
 * @return this
 */
Vec1.prototype.setLengthOfVec4 = function(b) {
  this.storage[0] = Math.sqrt(b.storage[0] * b.storage[0] + b.storage[1] * b.storage[1] + b.storage[2] * b.storage[2] + b.storage[3] * b.storage[3]);
  return this;
};

/**
 * @method commit
 * @memberof Vec1.prototype  
 * @description Sets the value of the vector to a WebGL float uniform variable.
 * @param {WebGLRenderingContext} gl - rendering context
 * @param {WebGLUniformLocation} uniformLocation - location of the uniform variable in the currently used WebGL program
 */
Vec1.prototype.commit = function(gl, uniformLocation){
  gl.uniform1fv(uniformLocation, this.storage);
};

// CommonJS style export to allow file to be required in server side node.js
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
  module.exports = Vec1;
}
