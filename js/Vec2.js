/**
 * @file WebGLMath {@link Vec2} class
 * @copyright Laszlo Szecsi 2017
 */

/**
 * @class Vec2
 * @classdesc Two-element vector of 32-bit floats. May reflect an ESSL vec2 uniform variable.
 * Low-performance convenience methods reproduce operator behaviour.
 * <table><tr><th>operator</th><th>method</th></tr>
 * <tr><td>+=</td><td>[add]{@link Vec2#add}</td></tr>
 * <tr><td>-=</td><td>[sub]{@link Vec2#sub}</td></tr>
 * <tr><td>*=</td><td>[mul]{@link Vec2#mul}</td></tr>
 * <tr><td>/=</td><td>[div]{@link Vec2#div}</td></tr> 
 * <tr><td>+</td><td>[plus]{@link Vec2#plus}</td></tr>
 * <tr><td>-</td><td>[minus]{@link Vec2#minus}</td></tr>
 * <tr><td>*</td><td>[times]{@link Vec2#times}</td></tr>
 * <tr><td>/</td><td>[over]{@link Vec2#over}</td></tr>
 * <tr><td>&middot;</td><td>[dot]{@link Vec2#dot}</td></tr> 
 * </table>
 * <BR> <code>a = b + c</code> can be computed as <code>var a = b.plus(c)</code>, when <code>a</code> does not yet exist, and performance does not matter. It is not required that <code>c</code> is a {@link Vec2}: it can be a vector of different length, an object literal, or its coordinates given as separate arguments.
 * <BR> <code>a.set(b).add(c)</code> is about three times faster. Variable <code>a</code> needs to exist, and be a {@link Vec2}. Neither b nor c are required to be {@link Vec2}s: they can be vectors of different length, object literals, or its coordinates given as separate arguments.
 * <BR> If <code>a</code>, <code>b</code> and <code>c</code> are {@link Vec2} instances, <code>a.setSum(b, c)</code> can be used for optimum performance. It is seven times faster than <code>a.set(b).add(c)</code>, or twenty times faster than <code>a = b.plus(c)</code>.
 * <BR> It is recommended to use optimized methods for time-critical per-frame tasks, while programmer-friendly interfaces are useful for one-time initializations, e.g. when constructing a scene.
 * @description  Without parameters, initializes the vector to (0, 0).
 * @param {Vec2 | Vec2 | Object | Number} [u=0] - Any object (properties x, y are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @constructor
 */
var Vec2 = function(u, v){
  /**
   * @name Vec2.prototype#storage
   * @description 2-element typed array for coordinate storage.
   * @type Float32Array
   */  
  this.storage = new Float32Array([
    u && u.x || Number(u).valueOf() || 0,
    u && u.y || Number(v).valueOf() || 0
  ]);
};

/**
 * @method clone
 * @memberof Vec2.prototype 
 * @description Creates a copy.
 * @return {Vec2} A new instance with identical contents.
 */
Vec2.prototype.clone = function() {
  var result = Object.create(Vec2.prototype);
  result.storage = new Float32Array(this.storage);
  return result;
};

/**
 * @name Vec2.prototype#x
 * @description Alias for storage[0];
 * @type Number
 */
Object.defineProperty(Vec2.prototype, 'x', {
  get: function() { return this.storage[0]; },
  set: function(value) { this.storage[0] = value; }
});

/**
 * @name Vec2.prototype#y
 * @description Alias for storage[1]; 
 * @type Number
 */
Object.defineProperty(Vec2.prototype, 'y', {
  get: function() { return this.storage[1]; },
  set: function(value) { this.storage[1] = value; }
});

/**
 * @method set
 * @memberof Vec2.prototype  
 * @description Simulates operator <code>=</code>. Sets the coordinates from another vector, or number values. Without parameters, sets (0, 0, 0, 1).
 * @param {Vec2 | Vec2 | Object | Number} [u=0] - Any object (properties x, y are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @return {Vec2} this
 */
Vec2.prototype.set = function(u, v) {
  this.storage[0] = u && u.x || Number(u).valueOf() || 0;
  this.storage[1] = u && u.y || Number(v).valueOf() || 0;
  return this;  
};

/**
 * @method random
 * @memberof Vec2
 * @static 
 * @description Return a new {@link Vec2} with random values that to lie between two values, elementwise.
 * @param {Vec2 | Vec2 | Object | Number} [minVal=0] - Specifies the lower end of the random range. If a scalar is given, it applies to all channels.
 * @param {Vec2 | Vec2 | Object | Number} [maxVal=1] - Specifies the upper end of the random range. If a scalar is given, it applies to all channels.
 * @return {Vec2} this
 */
Vec2.random = function(minVal, maxVal) {
  var result = Object.create(Vec2.prototype);
  result.storage = new Float32Array(2);
  var mina = minVal && minVal.x || Number(minVal).valueOf() || 0;
  var maxa = maxVal && ((maxVal.x-1) || (Number(maxVal).valueOf()-1) || 0) + 1;
  result.storage[0] = Math.random() * (maxa - mina) + mina;
  mina = minVal && minVal.y || Number(minVal).valueOf() || 0;
  maxa = maxVal && ((maxVal.y-1) || (Number(maxVal).valueOf()-1) || 0) + 1;  
  result.storage[1] = Math.random() * (maxa - mina) + mina;
  return result;
};

/**
 * @method setRandom
 * @memberof Vec2.prototype  
 * @description Fill the vector with random values that to lie between two further values, elementwise.
 * @param {Vec2 | Vec2 | Object | Number} [minVal=0] - Specifies the lower end of the random range. If a scalar is given, it applies to all channels.
 * @param {Vec2 | Vec2 | Object | Number} [maxVal=1] - Specifies the upper end of the random range. If a scalar is given, it applies to all channels.
 * @return {Vec2} this
 */
Vec2.prototype.setRandom = function(minVal, maxVal) {
  var mina = minVal && minVal.x || Number(minVal).valueOf() || 0;
  var maxa = maxVal && ((maxVal.x-1) || (Number(maxVal).valueOf()-1) || 0) + 1;  
  this.storage[0] = Math.random() * (maxa - mina) + mina;
  mina = minVal && minVal.y || Number(minVal).valueOf() || 0;
  maxa = maxVal && ((maxVal.y-1) || (Number(maxVal).valueOf()-1) || 0) + 1;  
  this.storage[1] = Math.random() * (maxa - mina) + mina;
  return this;  
};

/**
 * @method clamp
 * @memberof Vec2.prototype
 * @description Constrains the value of this vector to lie between two further values, elementwise, overwriting the contents with the result.
 * @param {Vec2 | Vec2 | Object | Number} [minVal=0] - Specifies the lower end of the range into which to constrain the elements. If a scalar is given, it applies to all channels.
 * @param {Vec2 | Vec2 | Object | Number} [maxVal=1] - Specifies the upper end of the range into which to constrain the elements. If a scalar is given, it applies to all channels.
 * @return {Vec2} this
 */
Vec2.prototype.clamp = function(minVal, maxVal) {
  var mina = minVal && minVal.x || Number(minVal).valueOf() || 0;
  if(this.storage[0] < mina){
    this.storage[0] = mina;
  }
  mina = minVal && minVal.y || Number(minVal).valueOf() || 0;
  if(this.storage[1] < mina){
    this.storage[1] = mina;
  }
  var maxa = maxVal && ((maxVal.x-1) || (Number(maxVal).valueOf()-1) || 0) + 1;
  if(this.storage[0] > maxa){
    this.storage[0] = maxa;
  }
  maxa = maxVal && ((maxVal.y-1) || (Number(maxVal).valueOf()-1) || 0) + 1;
  if(this.storage[1] > maxa){
    this.storage[1] = maxa;
  }
  return this;  
};

/**
 * @method setClamped
 * @memberof Vec2.prototype  
 * @description Fast. Constrains a value to lie between two further values, elementwise, storing the result in this vector.
 * @param {Vec2} b - The value to constrain.
 * @param {Vec2 | Vec2 | Object | Number} [minVal=0] - Specifies the lower end of the range into which to constrain the elements. If a scalar is given, it applies to all channels.
 * @param {Vec2 | Vec2 | Object | Number} [maxVal=1] - Specifies the upper end of the range into which to constrain the elements. If a scalar is given, it applies to all channels.
 * @return {Vec2} this
 */
Vec2.prototype.setClamped = function(b, minVal, maxVal) {
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
  return this;
};

/**
 * @method add
 * @memberof Vec2.prototype  
 * @description Simulates operator <code>+=</code>. Adds another vector to this vector, overwriting the contents with the result.
 * @param {Vec2 | Vec2 | Object | Number} [u=0] - Any object (properties x, y are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @return {Vec2} this
 */
Vec2.prototype.add = function(u, v) {
  this.storage[0] += u && u.x || Number(u).valueOf() || 0;
  this.storage[1] += u && u.y || Number(v).valueOf() || 0;
  return this;  
};

/**
 * @method addScaled
 * @memberof Vec2.prototype  
 * @description Simulates <code>+= dt *</code>. Adds another vector, scaled by `dt`, to this vector, overwriting the contents with the result.
 * @param {Number} dt - Scaling factor.
 * @param {Vec2 | Object | Number} [u=0] - Any object (property x), or a numerical value.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y. 
 * @return {Vec2} this
 */
Vec2.prototype.addScaled = function(dt, u, v) {
  this.storage[0] += dt * (u && u.x || Number(u).valueOf() || 0);
  this.storage[1] += dt * (u && u.y || Number(v).valueOf() || 0);
  return this;  
};

/**
 * @method plus
 * @memberof Vec2.prototype  
 * @description Simulates operator <code>+</code>. Adds this vector and the parameter vector, and returns the result in a new instance.
 * @param {Vec2 | Vec2 | Object | Number} [u=0] - Any object (properties x, y are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @return {Vec2} the sum of the two vectors
 */
Vec2.prototype.plus = function(u, v) {
  var result = Object.create(Vec2.prototype);
  result.storage = new Float32Array(2);
  result.storage[0] = this.storage[0] + (u && u.x || Number(u).valueOf() || 0);
  result.storage[1] = this.storage[1] + (u && u.y || Number(v).valueOf() || 0);
  return result;
};

/**
 * @method setSum
 * @memberof Vec2.prototype  
 * @description Fast. Adds the two argument vectors, storing the result in this vector.
 * @param {Vec2} b - Term 1.
 * @param {Vec2} c - Term 2. 
 * @return {Vec2} this
 */
Vec2.prototype.setSum = function(b, c) {
  this.storage[0] = b.storage[0] + c.storage[0];
  this.storage[1] = b.storage[1] + c.storage[1];
  return this;  
};

/**
 * @method sub
 * @memberof Vec2.prototype  
 * @description Simulates operator <code>-=</code>. Subtracts another vector from this vector, overwriting the contents with the result.
 * @param {Vec2 | Vec2 | Object | Number} [u=0] - Any object (properties x, y are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @return {Vec2} this
 */
Vec2.prototype.sub = function(u, v) {
  this.storage[0] -= u && u.x || Number(u).valueOf() || 0;
  this.storage[1] -= u && u.y || Number(v).valueOf() || 0;
  return this;  
};

/**
 * @method minus
 * @memberof Vec2.prototype  
 * @description Simulates operator <code>-</code>. Subtracts the parameter vector from this vector, and returns the result in a new instance.
 * @param {Vec2 | Vec2 | Object | Number} [u=0] - Any object (properties x, y are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @return {Vec2} the difference of the two vectors
 */
Vec2.prototype.minus = function(u, v) {
  var result = Object.create(Vec2.prototype);
  result.storage = new Float32Array(2);
  result.storage[0] = this.storage[0] - (u && u.x || Number(u).valueOf() || 0);
  result.storage[1] = this.storage[1] - (u && u.y || Number(v).valueOf() || 0);
  return result;
};

/**
 * @method setDifference
 * @memberof Vec2.prototype  
 * @description Fast. Substracts the second argument vector from the first one, storing the result in this vector.
 * @param {Vec2} b - Minuend.
 * @param {Vec2} c - Subtrahend. 
 * @return {Vec2} this
 */
Vec2.prototype.setDifference = function(b, c) {
  this.storage[0] = b.storage[0] - c.storage[0];
  this.storage[1] = b.storage[1] - c.storage[1];
  return this;  
};

/**
 * @method mul
 * @memberof Vec2.prototype  
 * @description Simulates operator <code>*=</code>. Multiplies this vector with another vector elementwise, or scalar, overwriting the contents with the result.
 * @param {Vec2 | Vec2 | Object | Number} [u=1] - Any object (properties x, y are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=1] - Ignored if u.y is defined. Otherwise, the value for coordinate y. Defaults to the value of parameter u, if it is a number.
 * @return {Vec2} this
 */
Vec2.prototype.mul = function(u, v) {
  this.storage[0] *= u && ((u.x - 1) || (Number(u).valueOf()-1) || 0) + 1;
  this.storage[1] *= u && ((u.y - 1) || (Number(v).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1;
  return this;  
};

/**
 * @method times
 * @memberof Vec2.prototype
 * @description Simulates operator <code>*</code>. Multiplies this vector with another vector elementwise, or scalar, and returns the result in a new instance.
 * @param {Vec2 | Vec2 | Object | Number} [u=1] - Any object (properties x, y are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=1] - Ignored if u.y is defined. Otherwise, the value for coordinate y. Defaults to the value of parameter u, if it is a number.
 * @return {Vec2} the elementwise product of the two vectors
 */
Vec2.prototype.times = function(u, v) {
  var result = Object.create(Vec2.prototype);
  result.storage = new Float32Array(2);
  result.storage[0] = this.storage[0] * (u && ((u.x - 1) || (Number(u).valueOf()-1) || 0) + 1);
  result.storage[1] = this.storage[1] * (u && ((u.y - 1) || (Number(v).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1);
  return result;
};

/**
 * @method xy01times
 * @memberof Vec2.prototype
 * @description Simulates operator <code>*</code>. Multiplies this vector, augmented with 0, 1, to a homogeneous position vector, with a matrix from the right, and returns the result in a new instance.
 * @param {Mat4} m - A 4x4 transformation matrix.
 * @return {Vec2} the transformed vector
 */
Vec2.prototype.xy01times = function(m) {
  var result = Object.create(Vec2.prototype);
  result.storage = new Float32Array(2);
  result.setxy01Transformed(this, m);
  return result;
};

/**
 * @method xy00times
 * @memberof Vec2.prototype
 * @description Simulates operator <code>*</code>. Multiplies, this vector, augmented with two zeros, to a homogeneous direction vector, with a matrix from the right, and returns the result in a new instance.
 * @param {Mat4} m - A 4x4 transformation matrix.
 * @return {Vec2} the transformed vector
 */
Vec2.prototype.xy00times = function(m) {
  var result = Object.create(Vec2.prototype);
  result.storage = new Float32Array(2);
  result.setxy00Transformed(this, m);
  return result;
};

/**
 * @method setProduct
 * @memberof Vec2.prototype  
 * @description Fast. Multiplies, elementwise, the two argument vectors, storing the result in this vector.
 * @param {Vec2} b - Factor 1.
 * @param {Vec2} c - Factor 2. 
 * @return {Vec2} this
 */
Vec2.prototype.setProduct = function(b, c) {
  this.storage[0] = b.storage[0] * c.storage[0];
  this.storage[1] = b.storage[1] * c.storage[1];
  return this;  
};

/**
 * @method div
 * @memberof Vec2.prototype  
 * @description Simulates operator <code>/=</code>. Divides, elementwise, this vector with another vector, or scalar, overwriting the contents with the result.
 * @param {Vec2 | Vec2 | Object | Number} [u=1] - Any object (properties x, y are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=1] - Ignored if u.y is defined. Otherwise, the value for coordinate y. Defaults to the value of parameter u, if it is a number.
 * @return {Vec2} this
 */
Vec2.prototype.div = function(u, v) {
  this.storage[0] /= u && ((u.x - 1) || (Number(u).valueOf()-1) || 0) + 1;
  this.storage[1] /= u && ((u.y - 1) || (Number(v).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1;
  return this;  
};

/**
 * @method over
 * @memberof Vec2.prototype
 * @description Simulates operator <code>/</code>. Divides, elementwise, this vector with another vector, or scalar, and returns the result in a new instance.
 * @param {Vec2 | Vec2 | Object | Number} [u=1] - Any object (properties x, y are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=1] - Ignored if u.y is defined. Otherwise, the value for coordinate y. Defaults to the value of parameter u, if it is a number.
 * @return {Vec2} the elementwise product of the two vectors
 */
Vec2.prototype.over = function(u, v) {
  var result = Object.create(Vec2.prototype);
  result.storage = new Float32Array(2);
  result.storage[0] = this.storage[0] / (u && ((u.x - 1) || (Number(u).valueOf()-1) || 0) + 1);
  result.storage[1] = this.storage[1] / (u && ((u.y - 1) || (Number(v).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1);
  return result;
};

/**
 * @method setQuotient
 * @memberof Vec2.prototype  
 * @description Fast. Divides, elementwise, the two argument vectors, storing the result in this vector.
 * @param {Vec2} b - Dividend.
 * @param {Vec2} c - Divisor. 
 * @return {Vec2} this
 */
Vec2.prototype.setQuotient = function(b, c) {
  this.storage[0] = b.storage[0] / c.storage[0];
  this.storage[1] = b.storage[1] / c.storage[1];
  return this;  
};

/**
 * @method setScaled
 * @memberof Vec2.prototype  
 * @description Fast. Scales the vector by a scalar.
 * @param {Vec2} a - Vector to scale.
 * @param {Number} s - Scale factor. 
 * @return {Vec2} this
 */
Vec2.prototype.setScaled = function(a, s){
  this.storage[0] = a.x * s;
  this.storage[1] = a.y * s;
  return this;  
};

/**
 * @method setScaledByInverse
 * @memberof Vec2.prototype  
 * @description Fast. Scales the vector by the reciprocal of scalar.
 * @param {Vec2} a - Vector to scale.
 * @param {Number} s - Scale factor inverse.
 * @return {Vec2} this
 */
Vec2.prototype.setScaledByInverse = function(a, s){
  this.storage[0] = a.x / s;
  this.storage[1] = a.y / s;
  return this;  
};

/**
 * @method length2
 * @memberof Vec2.prototype  
 * @description Computes the length squared.
 * @return {Number} x*x + y*y + z*z + w*w
 */
Vec2.prototype.length2 = function() {
  return this.storage[0] * this.storage[0] + this.storage[1] * this.storage[1];
};

/**
 * @method length
 * @memberof Vec2.prototype  
 * @description Computes the vector length.
 * @return {Number}
 */
Vec2.prototype.length = function() {
  return Math.sqrt(this.length2());
};

/**
 * @method normalize
 * @memberof Vec2.prototype  
 * @description Scales the vector by the inverse of its length, overwriting the contents with the result.
 * @return {Vec2} this
 */
Vec2.prototype.normalize = function() {
  var l = this.length();
  this.storage[0] /= l;
  this.storage[1] /= l;
  return this;
};

/**
 * @method direction
 * @memberof Vec2.prototype  
 * @description Scales the vector by the inverse of its length, and returns the result in a new instance.
 * @return {Vec2} A unit length vector with the same direction as this.
 */
Vec2.prototype.direction = function() {
  var result = Object.create(Vec2.prototype);
  result.storage = new Float32Array(2);
  var l = this.length();
  result.storage[0] = this.storage[0] / l;
  result.storage[1] = this.storage[1] / l;
  return result;
};

/**
 * @method setNormalized
 * @memberof Vec2.prototype  
 * @description Scales the argmument vector by the inverse of its length, storing the result in this vector.
 * @param {Vec2} b - The vector to normalize.
 * @return {Vec2} this
 */
Vec2.prototype.setNormalized = function(b) {
  var l = b.length();
  this.storage[0] = b.storage[0] / l;
  this.storage[1] = b.storage[1] / l;
  return this;
};

/**
 * @method dot
 * @memberof Vec2.prototype  
 * @description Computes the dot product with another vector.
 * @param {Vec2 | Vec2 | Object | Number} [u=0] - Any object (properties x, y are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @return {Number}
 */
Vec2.prototype.dot = function(u, v) {
  return this.storage[0] * (u && u.x || Number(u).valueOf() || 0) +
         this.storage[1] * (u && u.y || Number(v).valueOf() || 0) ;
};

/**
 * @method xy01mul
 * @memberof Vec2.prototype
 * @description Multiplies the vector (considering it a row vector, augmented by 0, 1 to get a homogeneous position vector) with a matrix, from the right. The contents of this are overwritten with the transformed vector with the result. See [xy01times]{@link Vec2#xy01times} for a version creating a new vector instance.
 * @param m {Mat4} The 4x4 linear homogeneous transformation matrix using column-major representation.
 * @return {Vec2} this
 */
Vec2.prototype.xy01mul = function(m) {
  var x = this.storage[0];
  var y = this.storage[1];
  var w = 
    x * m.storage[12] +
    y * m.storage[13] +
        m.storage[15] ;
  this.storage[0] = (
    x * m.storage[ 0] +
    y * m.storage[ 1] +
        m.storage[ 3] ) / w;
  this.storage[1] = (
    x * m.storage[ 4] +
    y * m.storage[ 5] +
        m.storage[ 7] ) / w;
  return this;
};

/**
 * @method setxy01Transformed
 * @memberof Vec2.prototype
 * @description Multiplies the argument vector (considering it a row vector, augmented by 0, 1 to a homogeneous position vector) with the argument matrix, from the right. The contents of this are overwritten with the transformed vector with the result. See [xy01times]{@link Vec2#xy01times} for a version creating a new vector instance.
 * @param v {Vec2} The vector to be transformed. 
 * @param m {Mat4} The 4x4 linear homogeneous transformation matrix using column-major representation.
 * @return {Vec2} this
 */
Vec2.prototype.setxy01Transformed = function(v, m) {
  var x = v.storage[0];
  var y = v.storage[1];
  var w = 
    x * m.storage[12] +
    y * m.storage[13] +
        m.storage[15] ;
  this.storage[0] = (
    x * m.storage[ 0] +
    y * m.storage[ 1] +
        m.storage[ 3] ) / w;
  this.storage[1] = (
    x * m.storage[ 4] +
    y * m.storage[ 5] +
        m.storage[ 7] ) / w;
  return this;
};

/**
 * @method xy00mul
 * @memberof Vec2.prototype
 * @description Multiplies the vector (considering it a row vector, augmented by a 0 to get a homogeneous direction vector) with a matrix, from the right. The contents of this are overwritten with the transformed vector with the result. See [xy00times]{@link Vec2#xy00times} for a version creating a new vector instance.
 * @param m {Mat4} The 4x4 linear homogeneous transformation matrix using column-major representation.
 * @return {Vec2} this
 */
Vec2.prototype.xy00mul = function(m) {
  var x = this.storage[0];
  var y = this.storage[1];
  this.storage[0] =
    x * m.storage[ 0] +
    y * m.storage[ 1] ;
  this.storage[1] =
    x * m.storage[ 4] +
    y * m.storage[ 5] ;
  return this;
};

/**
 * @method setxy00Transformed
 * @memberof Vec2.prototype
 * @description Multiplies the argument vector (considering it a row vector, augmented by 0 to a homogeneous direction vector) with the argument matrix, from the right. The contents of this are overwritten with the transformed vector with the result. See [xy00times]{@link Vec2#xy00times} for a version creating a new vector instance.
 * @param v {Vec2} The vector to be transformed.  
 * @param m {Mat4} The 4x4 linear homogeneous transformation matrix using column-major representation.
 * @return {Vec2} this
 */
 Vec2.prototype.setxy00Transformed = function(v, m) {
  var x = v.storage[0];
  var y = v.storage[1];
  this.storage[0] =
    x * m.storage[ 0] +
    y * m.storage[ 1] ;
  this.storage[1] =
    x * m.storage[ 4] +
    y * m.storage[ 5] ;
  return this;
};

/**
 * @method commit
 * @memberof Vec2.prototype  
 * @description Sets the value of the vector to a WebGL vec2 uniform variable.
 * @param {WebGLRenderingContext} gl - rendering context
 * @param {WebGLUniformLocation} uniformLocation - location of the uniform variable in the currently used WebGL program
 */
Vec2.prototype.commit = function(gl, uniformLocation){
  gl.uniform2fv(uniformLocation, this.storage);
};

// CommonJS style export to allow file to be required in server side node.js
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
  module.exports = Vec2;
}
