/**
 * @file WebGLMath {@link Vec3} class
 * @copyright Laszlo Szecsi 2017
 */

/**
 * @class Vec3
 * @classdesc Three-element vector of 32-bit floats. May reflect an ESSL vec3 uniform variable.
 * Low-performance convenience methods reproduce operator behaviour.
 * <table><tr><th>operator</th><th>method</th></tr>
 * <tr><td>+=</td><td>[add]{@link Vec3#add}</td></tr>
 * <tr><td>-=</td><td>[sub]{@link Vec3#sub}</td></tr>
 * <tr><td>*=</td><td>[mul]{@link Vec3#mul}</td></tr>
 * <tr><td>/=</td><td>[div]{@link Vec3#div}</td></tr> 
 * <tr><td>+</td><td>[plus]{@link Vec3#plus}</td></tr>
 * <tr><td>-</td><td>[minus]{@link Vec3#minus}</td></tr>
 * <tr><td>*</td><td>[times]{@link Vec3#times}</td></tr>
 * <tr><td>/</td><td>[over]{@link Vec3#over}</td></tr>
 * <tr><td>&middot;</td><td>[dot]{@link Vec3#dot}</td></tr>
 * <tr><td>&times;</td><td>[cross]{@link Vec3#cross}</td></tr>
 * </table>
 * <BR> <code>a = b + c</code> can be computed as <code>var a = b.plus(c)</code>, when <code>a</code> does not yet exist, and performance does not matter. It is not required that <code>c</code> is a {@link Vec3}: it can be a vector of different length, an object literal, or its coordinates given as separate arguments.
 * <BR> <code>a.set(b).add(c)</code> is about three times faster. Variable <code>a</code> needs to exist, and be a {@link Vec3}. Neither b nor c are required to be {@link Vec3}s: they can be vectors of different length, object literals, or its coordinates given as separate arguments.
 * <BR> If <code>a</code>, <code>b</code> and <code>c</code> are {@link Vec3} instances, <code>a.setSum(b, c)</code> can be used for optimum performance. It is seven times faster than <code>a.set(b).add(c)</code>, or twenty times faster than <code>a = b.plus(c)</code>.
 * <BR> It is recommended to use optimized methods for time-critical per-frame tasks, while programmer-friendly interfaces are useful for one-time initializations, e.g. when constructing a scene.
 * @description  Without parameters, initializes the vector to (0, 0, 0).
 * @param {Vec3 | Vec2 | Object | Number} [u=0] - Any object (properties x, y, z are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @param {Number} [s=0] - Ignored if u.z is defined. Otherwise, the value for coordinate z.
 * @constructor
 */
var Vec3 = function(u, v, s){
  /**
   * @name Vec3.prototype#storage
   * @description 3-element typed array for coordinate storage.
   * @type Float32Array
   */  
  this.storage = new Float32Array([
    u && u.x || Number(u).valueOf() || 0,
    u && u.y || Number(v).valueOf() || 0,
    u && u.z || Number(s).valueOf() || 0
  ]);
};

/**
 * @method clone
 * @memberof Vec3.prototype 
 * @description Creates a copy.
 * @return {Vec3} A new instance with identical contents.
 */
Vec3.prototype.clone = function() {
  var result = Object.create(Vec3.prototype);
  result.storage = new Float32Array(this.storage);
  return result;
};

/**
 * @name Vec3.prototype#x
 * @description Alias for storage[0];
 * @type Number
 */
Object.defineProperty(Vec3.prototype, 'x', {
  get: function() { return this.storage[0]; },
  set: function(value) { this.storage[0] = value; }
});

/**
 * @name Vec3.prototype#y
 * @description Alias for storage[1]; 
 * @type Number
 */
Object.defineProperty(Vec3.prototype, 'y', {
  get: function() { return this.storage[1]; },
  set: function(value) { this.storage[1] = value; }
});

/**
 * @name Vec3.prototype#z
 * @description Alias for storage[2]; 
 * @type Number
 */
Object.defineProperty(Vec3.prototype, 'z', {
  get: function() { return this.storage[2]; },
  set: function(value) { this.storage[2] = value; }
});

/**
 * @method set
 * @memberof Vec3.prototype  
 * @description Simulates operator <code>=</code>. Sets the coordinates from another vector, or number values. Without parameters, sets (0, 0, 0, 1).
 * @param {Vec3 | Vec2 | Object | Number} [u=0] - Any object (properties x, y, z are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @param {Number} [s=0] - Ignored if u.z is defined. Otherwise, the value for coordinate z.
 * @return {Vec3} this
 */
Vec3.prototype.set = function(u, v, s) {
  this.storage[0] = u && u.x || Number(u).valueOf() || 0;
  this.storage[1] = u && u.y || Number(v).valueOf() || 0;
  this.storage[2] = u && u.z || Number(s).valueOf() || 0;
  return this;  
};

/**
 * @method random
 * @memberof Vec3
 * @static 
 * @description Return a new {@link Vec3} with random values that to lie between two values, elementwise.
 * @param {Vec3 | Vec2 | Object | Number} [minVal=0] - Specifies the lower end of the random range. If a scalar is given, it applies to all channels.
 * @param {Vec3 | Vec2 | Object | Number} [maxVal=1] - Specifies the upper end of the random range. If a scalar is given, it applies to all channels.
 * @return {Vec3} this
 */
Vec3.random = function(minVal, maxVal) {
  var result = Object.create(Vec3.prototype);
  result.storage = new Float32Array(3);
  var mina = minVal && minVal.x || Number(minVal).valueOf() || 0;
  var maxa = maxVal && ((maxVal.x-1) || (Number(maxVal).valueOf()-1) || 0) + 1;
  result.storage[0] = Math.random() * (maxa - mina) + mina;
  mina = minVal && minVal.y || Number(minVal).valueOf() || 0;
  maxa = maxVal && ((maxVal.y-1) || (Number(maxVal).valueOf()-1) || 0) + 1;
  result.storage[1] = Math.random() * (maxa - mina) + mina;
  mina = minVal && minVal.z || Number(minVal).valueOf() || 0;
  maxa = maxVal && ((maxVal.z-1) || (Number(maxVal).valueOf()-1) || 0) + 1;  
  result.storage[2] = Math.random() * (maxa - mina) + mina;
  return result;
};

/**
 * @method setRandom
 * @memberof Vec3.prototype  
 * @description Fill the vector with random values that to lie between two further values, elementwise.
 * @param {Vec3 | Vec2 | Object | Number} [minVal=0] - Specifies the lower end of the random range. If a scalar is given, it applies to all channels.
 * @param {Vec3 | Vec2 | Object | Number} [maxVal=1] - Specifies the upper end of the random range. If a scalar is given, it applies to all channels.
 * @return {Vec3} this
 */
Vec3.prototype.setRandom = function(minVal, maxVal) {
  var mina = minVal && minVal.x || Number(minVal).valueOf() || 0;
  var maxa = maxVal && ((maxVal.x-1) || (Number(maxVal).valueOf()-1) || 0) + 1;  
  this.storage[0] = Math.random() * (maxa - mina) + mina;
  mina = minVal && minVal.y || Number(minVal).valueOf() || 0;
  maxa = maxVal && ((maxVal.y-1) || (Number(maxVal).valueOf()-1) || 0) + 1;  
  this.storage[1] = Math.random() * (maxa - mina) + mina;
  mina = minVal && minVal.z || Number(minVal).valueOf() || 0;
  maxa = maxVal && ((maxVal.z-1) || (Number(maxVal).valueOf()-1) || 0) + 1;  
  this.storage[2] = Math.random() * (maxa - mina) + mina;
  return this;  
};

/**
 * @method clamp
 * @memberof Vec3.prototype
 * @description Constrains the value of this vector to lie between two further values, elementwise, overwriting the contents with the result.
 * @param {Vec3 | Vec2 | Object | Number} [minVal=0] - Specifies the lower end of the range into which to constrain the elements. If a scalar is given, it applies to all channels.
 * @param {Vec3 | Vec2 | Object | Number} [maxVal=1] - Specifies the upper end of the range into which to constrain the elements. If a scalar is given, it applies to all channels.
 * @return {Vec3} this
 */
Vec3.prototype.clamp = function(minVal, maxVal) {
  var mina = minVal && minVal.x || Number(minVal).valueOf() || 0;
  if(this.storage[0] < mina){
    this.storage[0] = mina;
  }
  mina = minVal && minVal.y || Number(minVal).valueOf() || 0;
  if(this.storage[1] < mina){
    this.storage[1] = mina;
  }
  mina = minVal && minVal.z || Number(minVal).valueOf() || 0;
  if(this.storage[2] < mina){
    this.storage[2] = mina;
  }  
  var maxa = maxVal && ((maxVal.x-1) || (Number(maxVal).valueOf()-1) || 0) + 1;
  if(this.storage[0] > maxa){
    this.storage[0] = maxa;
  }
  maxa = maxVal && ((maxVal.y-1) || (Number(maxVal).valueOf()-1) || 0) + 1;
  if(this.storage[1] > maxa){
    this.storage[1] = maxa;
  }
  maxa = maxVal && ((maxVal.z-1) || (Number(maxVal).valueOf()-1) || 0) + 1;
  if(this.storage[2] > maxa){
    this.storage[2] = maxa;
  }
  return this;  
};

/**
 * @method setClamped
 * @memberof Vec3.prototype  
 * @description Fast. Constrains a value to lie between two further values, elementwise, storing the result in this vector.
 * @param {Vec3} b - The value to constrain.
 * @param {Vec3 | Vec2 | Object | Number} [minVal=0] - Specifies the lower end of the range into which to constrain the elements. If a scalar is given, it applies to all channels.
 * @param {Vec3 | Vec2 | Object | Number} [maxVal=1] - Specifies the upper end of the range into which to constrain the elements. If a scalar is given, it applies to all channels.
 * @return {Vec3} this
 */
Vec3.prototype.setClamped = function(b, minVal, maxVal) {
  var mina = minVal && minVal.x || Number(minVal).valueOf() || 0;
  var maxa = maxVal && ((maxVal.x-1) || (Number(maxVal).valueOf()-1) || 0) + 1;  
  if(b.storage[0] < mina){
    this.storage[0] = mina;
  } else if(b.storage[0] > maxa){
    this.storage[0] = maxa;
  } else {
    this.storage[0] = b.storage[0];
  }
  mina = minVal && minVal.y || Number(minVal).valueOf() || 0;
  maxa = maxVal && ((maxVal.y-1) || (Number(maxVal).valueOf()-1) || 0) + 1;  
  if(b.storage[1] < mina){
    this.storage[1] = mina;
  } else if(b.storage[1] > maxa){
    this.storage[1] = maxa;
  } else {
    this.storage[1] = b.storage[1];
  }
  mina = minVal && minVal.z || Number(minVal).valueOf() || 0;
  maxa = maxVal && ((maxVal.z-1) || (Number(maxVal).valueOf()-1) || 0) + 1;  
  if(b.storage[2] < mina){
    this.storage[2] = mina;
  } else if(b.storage[2] > maxa){
    this.storage[2] = maxa;
  } else {
    this.storage[2] = b.storage[2];
  }
  return this;
};

/**
 * @method add
 * @memberof Vec3.prototype  
 * @description Simulates operator <code>+=</code>. Adds another vector to this vector, overwriting the contents with the result.
 * @param {Vec3 | Vec2 | Object | Number} [u=0] - Any object (properties x, y, z are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @param {Number} [s=0] - Ignored if u.z is defined. Otherwise, the value for coordinate z.
 * @return {Vec3} this
 */
Vec3.prototype.add = function(u, v, s) {
  this.storage[0] += u && u.x || Number(u).valueOf() || 0;
  this.storage[1] += u && u.y || Number(v).valueOf() || 0;
  this.storage[2] += u && u.z || Number(s).valueOf() || 0;
  return this;  
};

/**
 * @method addScaled
 * @memberof Vec3.prototype  
 * @description Simulates <code>+= dt *</code>. Adds another vector, scaled by `dt`, to this vector, overwriting the contents with the result.
 * @param {Number} dt - Scaling factor.
 * @param {Vec3 | Object | Number} [u=0] - Any object (property x), or a numerical value.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y. 
 * @param {Number} [s=0] - Ignored if u.z is defined. Otherwise, the value for coordinate z.
  * @return {Vec3} this
 */
Vec3.prototype.addScaled = function(dt, u, v, s) {
  this.storage[0] += dt * (u && u.x || Number(u).valueOf() || 0);
  this.storage[1] += dt * (u && u.y || Number(v).valueOf() || 0);
  this.storage[2] += dt * (u && u.z || Number(s).valueOf() || 0);
  return this;  
};


/**
 * @method plus
 * @memberof Vec3.prototype  
 * @description Simulates operator <code>+</code>. Adds this vector and the parameter vector, and returns the result in a new instance.
 * @param {Vec3 | Vec2 | Object | Number} [u=0] - Any object (properties x, y, z are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @param {Number} [s=0] - Ignored if u.z is defined. Otherwise, the value for coordinate z.
 * @return {Vec3} the sum of the two vectors
 */
Vec3.prototype.plus = function(u, v, s) {
  var result = Object.create(Vec3.prototype);
  result.storage = new Float32Array(3);
  result.storage[0] = this.storage[0] + (u && u.x || Number(u).valueOf() || 0);
  result.storage[1] = this.storage[1] + (u && u.y || Number(v).valueOf() || 0);
  result.storage[2] = this.storage[2] + (u && u.z || Number(s).valueOf() || 0);
  return result;
};

/**
 * @method setSum
 * @memberof Vec3.prototype  
 * @description Fast. Adds the two argument vectors, storing the result in this vector.
 * @param {Vec3} b - Term 1.
 * @param {Vec3} c - Term 2. 
 * @return {Vec3} this
 */
Vec3.prototype.setSum = function(b, c) {
  this.storage[0] = b.storage[0] + c.storage[0];
  this.storage[1] = b.storage[1] + c.storage[1];
  this.storage[2] = b.storage[2] + c.storage[2];
  return this;  
};

/**
 * @method sub
 * @memberof Vec3.prototype  
 * @description Simulates operator <code>-=</code>. Subtracts another vector from this vector, overwriting the contents with the result.
 * @param {Vec3 | Vec2 | Object | Number} [u=0] - Any object (properties x, y, z are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @param {Number} [s=0] - Ignored if u.z is defined. Otherwise, the value for coordinate z.
 * @return {Vec3} this
 */
Vec3.prototype.sub = function(u, v, s) {
  this.storage[0] -= u && u.x || Number(u).valueOf() || 0;
  this.storage[1] -= u && u.y || Number(v).valueOf() || 0;
  this.storage[2] -= u && u.z || Number(s).valueOf() || 0;
  return this;  
};

/**
 * @method minus
 * @memberof Vec3.prototype  
 * @description Simulates operator <code>-</code>. Subtracts the parameter vector from this vector, and returns the result in a new instance.
 * @param {Vec3 | Vec2 | Object | Number} [u=0] - Any object (properties x, y, z are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @param {Number} [s=0] - Ignored if u.z is defined. Otherwise, the value for coordinate z.
 * @return {Vec3} the difference of the two vectors
 */
Vec3.prototype.minus = function(u, v, s) {
  var result = Object.create(Vec3.prototype);
  result.storage = new Float32Array(3);
  result.storage[0] = this.storage[0] - (u && u.x || Number(u).valueOf() || 0);
  result.storage[1] = this.storage[1] - (u && u.y || Number(v).valueOf() || 0);
  result.storage[2] = this.storage[2] - (u && u.z || Number(s).valueOf() || 0);
  return result;
};

/**
 * @method setDifference
 * @memberof Vec3.prototype  
 * @description Fast. Substracts the second argument vector from the first one, storing the result in this vector.
 * @param {Vec3} b - Minuend.
 * @param {Vec3} c - Subtrahend. 
 * @return {Vec3} this
 */
Vec3.prototype.setDifference = function(b, c) {
  this.storage[0] = b.storage[0] - c.storage[0];
  this.storage[1] = b.storage[1] - c.storage[1];
  this.storage[2] = b.storage[2] - c.storage[2];
  return this;  
};

/**
 * @method mul
 * @memberof Vec3.prototype  
 * @description Simulates operator <code>*=</code>. Multiplies this vector with another vector elementwise, or scalar, overwriting the contents with the result.
 * @param {Vec3 | Vec2 | Object | Number} [u=1] - Any object (properties x, y, z are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=1] - Ignored if u.y is defined. Otherwise, the value for coordinate y. Defaults to the value of parameter u, if it is a number.
 * @param {Number} [s=1] - Ignored if u.z is defined. Otherwise, the value for coordinate z. Defaults to the value of parameter u, if it is a number.
 * @return {Vec3} this
 */
Vec3.prototype.mul = function(u, v, s) {
  this.storage[0] *= u && ((u.x - 1) || (Number(u).valueOf()-1) || 0) + 1;
  this.storage[1] *= u && ((u.y - 1) || (Number(v).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1;
  this.storage[2] *= u && ((u.z - 1) || (Number(s).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1;
  return this;  
};

/**
 * @method times
 * @memberof Vec3.prototype
 * @description Simulates operator <code>*</code>. Multiplies this vector with another vector elementwise, or scalar, and returns the result in a new instance.
 * @param {Vec3 | Vec2 | Object | Number} [u=1] - Any object (properties x, y, z are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=1] - Ignored if u.y is defined. Otherwise, the value for coordinate y. Defaults to the value of parameter u, if it is a number.
 * @param {Number} [s=1] - Ignored if u.z is defined. Otherwise, the value for coordinate z. Defaults to the value of parameter u, if it is a number.
 * @return {Vec3} the elementwise product of the two vectors
 */
Vec3.prototype.times = function(u, v, s) {
  var result = Object.create(Vec3.prototype);
  result.storage = new Float32Array(3);
  result.storage[0] = this.storage[0] * (u && ((u.x - 1) || (Number(u).valueOf()-1) || 0) + 1);
  result.storage[1] = this.storage[1] * (u && ((u.y - 1) || (Number(v).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1);
  result.storage[2] = this.storage[2] * (u && ((u.z - 1) || (Number(s).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1);
  return result;
};

/**
 * @method xyz1times
 * @memberof Vec3.prototype
 * @description Simulates operator <code>*</code>. Multiplies this vector, augmented with a 1 to a homogeneous position vector, with a matrix from the right, and returns the result in a new instance.
 * @param {Mat4} m - A 4x4 transformation matrix.
 * @return {Vec3} the transformed vector
 */
Vec3.prototype.xyz1times = function(m) {
  var result = Object.create(Vec3.prototype);
  result.storage = new Float32Array(3);
  result.setxyz1Transformed(this, m);
  return result;
};

/**
 * @method xyz0times
 * @memberof Vec3.prototype
 * @description Simulates operator <code>*</code>. Multiplies this vector, augmented with a 0 to a homogeneous direction vector, with a matrix from the right, and returns the result in a new instance.
 * @param {Mat4} m - A 4x4 transformation matrix.
 * @return {Vec3} the transformed vector
 */
Vec3.prototype.xyz0times = function(m) {
  var result = Object.create(Vec3.prototype);
  result.storage = new Float32Array(3);
  result.setxyz0Transformed(this, m);
  return result;
};

/**
 * @method setProduct
 * @memberof Vec3.prototype  
 * @description Fast. Multiplies, elementwise, the two argument vectors, storing the result in this vector.
 * @param {Vec3} b - Factor 1.
 * @param {Vec3} c - Factor 2. 
 * @return {Vec3} this
 */
Vec3.prototype.setProduct = function(b, c) {
  this.storage[0] = b.storage[0] * c.storage[0];
  this.storage[1] = b.storage[1] * c.storage[1];
  this.storage[2] = b.storage[2] * c.storage[2];
  return this;  
};

/**
 * @method div
 * @memberof Vec3.prototype  
 * @description Simulates operator <code>/=</code>. Divides, elementwise, this vector with another vector, or scalar, overwriting the contents with the result.
 * @param {Vec3 | Vec2 | Object | Number} [u=1] - Any object (properties x, y, z are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=1] - Ignored if u.y is defined. Otherwise, the value for coordinate y. Defaults to the value of parameter u, if it is a number.
 * @param {Number} [s=1] - Ignored if u.z is defined. Otherwise, the value for coordinate z. Defaults to the value of parameter u, if it is a number.
 * @return {Vec3} this
 */
Vec3.prototype.div = function(u, v, s) {
  this.storage[0] /= u && ((u.x - 1) || (Number(u).valueOf()-1) || 0) + 1;
  this.storage[1] /= u && ((u.y - 1) || (Number(v).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1;
  this.storage[2] /= u && ((u.z - 1) || (Number(s).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1;
  return this;  
};

/**
 * @method over
 * @memberof Vec3.prototype
 * @description Simulates operator <code>/</code>. Divides, elementwise, this vector with another vector, or scalar, and returns the result in a new instance.
 * @param {Vec3 | Vec2 | Object | Number} [u=1] - Any object (properties x, y, z are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=1] - Ignored if u.y is defined. Otherwise, the value for coordinate y. Defaults to the value of parameter u, if it is a number.
 * @param {Number} [s=1] - Ignored if u.z is defined. Otherwise, the value for coordinate z. Defaults to the value of parameter u, if it is a number.
 * @return {Vec3} the elementwise product of the two vectors
 */
Vec3.prototype.over = function(u, v, s) {
  var result = Object.create(Vec3.prototype);
  result.storage = new Float32Array(3);
  result.storage[0] = this.storage[0] / (u && ((u.x - 1) || (Number(u).valueOf()-1) || 0) + 1);
  result.storage[1] = this.storage[1] / (u && ((u.y - 1) || (Number(v).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1);
  result.storage[2] = this.storage[2] / (u && ((u.z - 1) || (Number(s).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1);
  return result;
};

/**
 * @method setQuotient
 * @memberof Vec3.prototype  
 * @description Fast. Divides, elementwise, the two argument vectors, storing the result in this vector.
 * @param {Vec3} b - Dividend.
 * @param {Vec3} c - Divisor. 
 * @return {Vec3} this
 */
Vec3.prototype.setQuotient = function(b, c) {
  this.storage[0] = b.storage[0] / c.storage[0];
  this.storage[1] = b.storage[1] / c.storage[1];
  this.storage[2] = b.storage[2] / c.storage[2];
  return this;  
};

/**
 * @method setScaled
 * @memberof Vec3.prototype  
 * @description Fast. Scales the vector by a scalar.
 * @param {Vec3} a - Vector to scale.
 * @param {Number} s - Scale factor. 
 * @return {Vec3} this
 */
Vec3.prototype.setScaled = function(a, s){
  this.storage[0] = a.x * s;
  this.storage[1] = a.y * s;
  this.storage[2] = a.z * s;
  return this;  
};

/**
 * @method setScaledByInverse
 * @memberof Vec3.prototype  
 * @description Fast. Scales the vector by the reciprocal of scalar.
 * @param {Vec3} a - Vector to scale.
 * @param {Number} s - Scale factor inverse.
 * @return {Vec3} this
 */
Vec3.prototype.setScaledByInverse = function(a, s){
  this.storage[0] = a.x / s;
  this.storage[1] = a.y / s;
  this.storage[2] = a.z / s;  
  return this;  
};

/**
 * @method length2
 * @memberof Vec3.prototype  
 * @description Computes the length squared.
 * @return {Number} x*x + y*y + z*z + w*w
 */
Vec3.prototype.length2 = function() {
  return this.storage[0] * this.storage[0] + this.storage[1] * this.storage[1] + this.storage[2] * this.storage[2];
};

/**
 * @method length
 * @memberof Vec3.prototype  
 * @description Computes the vector length.
 * @return {Number}
 */
Vec3.prototype.length = function() {
  return Math.sqrt(this.length2());
};

/**
 * @method normalize
 * @memberof Vec3.prototype  
 * @description Scales the vector by the inverse of its length, overwriting the contents with the result.
 * @return {Vec3} this
 */
Vec3.prototype.normalize = function() {
  var l = this.length();
  this.storage[0] /= l;
  this.storage[1] /= l;
  this.storage[2] /= l;  
  return this;
};

/**
 * @method direction
 * @memberof Vec3.prototype  
 * @description Scales the vector by the inverse of its length, and returns the result in a new instance.
 * @return {Vec3} A unit length vector with the same direction as this.
 */
Vec3.prototype.direction = function() {
  var result = Object.create(Vec3.prototype);
  result.storage = new Float32Array(3);
  var l = this.length();
  result.storage[0] = this.storage[0] / l;
  result.storage[1] = this.storage[1] / l;
  result.storage[2] = this.storage[2] / l;
  return result;
};

/**
 * @method setNormalized
 * @memberof Vec3.prototype  
 * @description Scales the argmument vector by the inverse of its length, storing the result in this vector.
 * @param b {Vec3} - The vector to normalize.
 * @return {Vec3} this
 */
Vec3.prototype.setNormalized = function(b) {
  var l = b.length();
  this.storage[0] = b.storage[0] / l;
  this.storage[1] = b.storage[1] / l;
  this.storage[2] = b.storage[2] / l;
  return this;
};

/**
 * @method dot
 * @memberof Vec3.prototype  
 * @description Computes the dot product with another vector.
 * @param {Vec3 | Vec2 | Object | Number} [u=0] - Any object (properties x, y, z are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @param {Number} [s=0] - Ignored if u.z is defined. Otherwise, the value for coordinate z.
 * @return {Number}
 */
Vec3.prototype.dot = function(u, v, s) {
  return this.storage[0] * (u && u.x || Number(u).valueOf() || 0) +
         this.storage[1] * (u && u.y || Number(v).valueOf() || 0) +
         this.storage[2] * (u && u.z || Number(s).valueOf() || 0);
};

/**
 * @method cross
 * @memberof Vec3.prototype  
 * @description Simulates operator %times;. Computes the cross product of the vectors, returning the result in a new instance.
 * @param {Vec3 | Vec2 | Object | Number} [u=0] - Any object (properties x, y, z are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @param {Number} [s=0] - Ignored if u.z is defined. Otherwise, the value for coordinate z.
 * @return {Vec3} the cross product
 */
Vec3.prototype.cross = function(u, v, s) {
  var result = Object.create(Vec3.prototype);
  result.storage = new Float32Array(3);
  var op2x = u && u.x || Number(u).valueOf() || 0;
  var op2y = u && u.y || Number(v).valueOf() || 0;
  var op2z = u && u.z || Number(s).valueOf() || 0;
  result.storage[0] = this.storage[1] * op2z - this.storage[2] * op2y;
  result.storage[1] = this.storage[2] * op2x - this.storage[0] * op2z;
  result.storage[2] = this.storage[0] * op2y - this.storage[1] * op2x;
  return result;
};

/**
 * @method setVectorProduct
 * @memberof Vec3.prototype  
 * @description Fast. Computes the vector product (cross product) of the two argument vectors, storing the result in this vector.
 * @param {Vec3} b - Left operand.
 * @param {Vec3} c - Right operand.
 * @return {Vec3} this
 */
Vec3.prototype.setVectorProduct = function(b, c) {
  this.storage[0] = b.storage[1] * c.storage[2] - b.storage[2] * c.storage[1];
  this.storage[1] = b.storage[2] * c.storage[0] - b.storage[0] * c.storage[2];
  this.storage[2] = b.storage[0] * c.storage[1] - b.storage[1] * c.storage[0];
  return this;
};

/**
 * @method xyz1mul
 * @memberof Vec3.prototype
 * @description Multiplies the vector (considering it a row vector, augmented by a 1 to get a homogeneous position vector) with a matrix, from the right. The contents of this are overwritten with the transformed vector with the result. See {@link Vec3#xyz1times} for a version creating a new vector instance.
 * @param m {Mat4} The 4x4 linear homogeneous transformation matrix using column-major representation.
 * @return {Vec3} this
 */
Vec3.prototype.xyz1mul = function(m) {
  var x = this.storage[0];
  var y = this.storage[1];
  var z = this.storage[2];
  var w = 
    x * m.storage[12] +
    y * m.storage[13] +
    z * m.storage[14] +    
        m.storage[15] ;
  this.storage[0] = (
    x * m.storage[ 0] +
    y * m.storage[ 1] +
    z * m.storage[ 2] +    
        m.storage[ 3] ) / w;
  this.storage[1] = (
    x * m.storage[ 4] +
    y * m.storage[ 5] +
    z * m.storage[ 6] +
        m.storage[ 7] ) / w;
  this.storage[2] = (
    x * m.storage[ 8] +
    y * m.storage[ 9] +
    z * m.storage[10] +
        m.storage[11] ) / w;
  return this;
};

/**
 * @method setxyz1Transformed
 * @memberof Vec3.prototype
 * @description Multiplies the argument vector (considering it a row vector, augmented by 1 to a homogeneous position vector) with the argument matrix, from the right. The contents of this are overwritten with the transformed vector with the result. See {@link Vec3#xyz1times} for a version creating a new vector instance.
 * @param v {Vec3} The vector to be transformed.
 * @param m {Mat4} The 4x4 linear homogeneous transformation matrix using column-major representation.
 * @return {Vec3} this
 */
Vec3.prototype.setxyz1Transformed = function(v, m) {
  var x = v.storage[0];
  var y = v.storage[1];
  var z = v.storage[2];
  var w = 
    x * m.storage[12] +
    y * m.storage[13] +
    z * m.storage[14] +    
        m.storage[15] ;
  this.storage[0] = (
    x * m.storage[ 0] +
    y * m.storage[ 1] +
    z * m.storage[ 2] +    
        m.storage[ 3] ) / w;
  this.storage[1] = (
    x * m.storage[ 4] +
    y * m.storage[ 5] +
    z * m.storage[ 6] +
        m.storage[ 7] ) / w;
  this.storage[2] = (
    x * m.storage[ 8] +
    y * m.storage[ 9] +
    z * m.storage[10] +
        m.storage[11] ) / w;
  return this;
};

/**
 * @method xyz0mul
 * @memberof Vec3.prototype
 * @description Multiplies the vector (considering it a row vector, augmented by a 0 to get a homogeneous direction vector) with a matrix, from the right. The contents of this are overwritten with the transformed vector with the result. See {@link Vec3#xyz0times} for a version creating a new vector instance.
 * @param m {Mat4} The 4x4 linear homogeneous transformation matrix using column-major representation.
 * @return {Vec3} this
 */
Vec3.prototype.xyz0mul = function(m) {
  var x = this.storage[0];
  var y = this.storage[1];
  var z = this.storage[2];
  this.storage[0] =
    x * m.storage[ 0] +
    y * m.storage[ 1] +
    z * m.storage[ 2] ;
  this.storage[1] =
    x * m.storage[ 4] +
    y * m.storage[ 5] +
    z * m.storage[ 6] ;
  this.storage[2] =
    x * m.storage[ 8] +
    y * m.storage[ 9] +
    z * m.storage[10] ;
  return this;
};

/**
 * @method setxyz0Transformed
 * @memberof Vec3.prototype
 * @description Multiplies the argument vector (considering it a row vector, augmented by 0 to a homogeneous direction vector) with the argument matrix, from the right. The contents of this are overwritten with the transformed vector with the result. See {@link Vec3#xyz0times} for a version creating a new vector instance.
 * @param v {Vec3} The vector to be transformed.
 * @param m {Mat4} The 4x4 linear homogeneous transformation matrix using column-major representation.
 * @return {Vec3} this
 */
 Vec3.prototype.setxyz0Transformed = function(v, m) {
  var x = v.storage[0];
  var y = v.storage[1];
  var z = v.storage[2];
  this.storage[0] =
    x * m.storage[ 0] +
    y * m.storage[ 1] +
    z * m.storage[ 2] ;
  this.storage[1] =
    x * m.storage[ 4] +
    y * m.storage[ 5] +
    z * m.storage[ 6] ;
  this.storage[2] =
    x * m.storage[ 8] +
    y * m.storage[ 9] +
    z * m.storage[10] ;
  return this;
};

/**
 * @method commit
 * @memberof Vec3.prototype  
 * @description Sets the value of the vector to a WebGL vec3 uniform variable.
 * @param {WebGLRenderingContext} gl - rendering context
 * @param {WebGLUniformLocation} uniformLocation - location of the uniform variable in the currently used WebGL program
 */
Vec3.prototype.commit = function(gl, uniformLocation){
  gl.uniform3fv(uniformLocation, this.storage);
};

// CommonJS style export to allow file to be required in server side node.js
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
  module.exports = Vec3;
}
