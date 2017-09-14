/**
 * @file WebGLMath {@link Vec4} class
 * @copyright Laszlo Szecsi 2017
 */

/**
 * @class Vec4
 * @classdesc Four-element vector of 32-bit floats. May reflect an ESSL vec4 uniform variable.
 * Low-performance convenience methods reproduce operator behaviour.
 * <table><tr><th>operator</th><th>method</th></tr>
 * <tr><td>+=</td><td>[add]{@link Vec4#add}</td></tr>
 * <tr><td>-=</td><td>[sub]{@link Vec4#sub}</td></tr>
 * <tr><td>*=</td><td>[mul]{@link Vec4#mul}</td></tr>
 * <tr><td>/=</td><td>[div]{@link Vec4#div}</td></tr> 
 * <tr><td>+</td><td>[plus]{@link Vec4#plus}</td></tr>
 * <tr><td>-</td><td>[minus]{@link Vec4#minus}</td></tr>
 * <tr><td>*</td><td>[times]{@link Vec4#times}</td></tr>
 * <tr><td>/</td><td>[over]{@link Vec4#over}</td></tr>
 * <tr><td>&middot;</td><td>[dot]{@link Vec4#dot}</td></tr> 
 * </table>
 * <BR> <code>a = b + c</code> can be computed as <code>var a = b.plus(c)</code>, when <code>a</code> does not yet exist, and performance does not matter. It is not required that <code>c</code> is a {@link Vec4}: it can be a vector of different length, an object literal, or its coordinates given as separate arguments.
 * <BR> <code>a.set(b).add(c)</code> is about three times faster. Variable <code>a</code> needs to exist, and be a {@link Vec4}. Neither b nor c are required to be {@link Vec4}s: they can be vectors of different length, object literals, or its coordinates given as separate arguments.
 * <BR> If <code>a</code>, <code>b</code> and <code>c</code> are {@link Vec4} instances, <code>a.setSum(b, c)</code> can be used for optimum performance. It is seven times faster than <code>a.set(b).add(c)</code>, or twenty times faster than <code>a = b.plus(c)</code>.
 * <BR> It is recommended to use optimized methods for time-critical per-frame tasks, while programmer-friendly interfaces are useful for one-time initializations, e.g. when constructing a scene.
 * @description  Without parameters, initializes the vector to (0, 0, 0, 1).
 * @param {Vec4 | Vec3 | Vec2 | Object | Number} [u=0] - Any object (properties x, y, z, w are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @param {Number} [s=0] - Ignored if u.z is defined. Otherwise, the value for coordinate z.
 * @param {Number} [t=1] - Ignored if u.w is defined. Otherwise, the value for coordinate w.
 * @constructor
 */
var Vec4 = function(u, v, s, t){
  /**
   * @name Vec4.prototype#storage
   * @description 4-element typed array for coordinate storage.
   * @type Float32Array
   */  
  this.storage = new Float32Array([
    u && u.x || Number(u).valueOf() || 0,
    u && u.y || Number(v).valueOf() || 0,
    u && u.z || Number(s).valueOf() || 0,
    (u && (u.w-1) || (Number(t).valueOf()-1) || 0) + 1
  ]);
};

/**
 * @method clone
 * @memberof Vec4.prototype 
 * @description Creates a copy.
 * @return {Vec4} A new instance with identical contents.
 */
Vec4.prototype.clone = function() {
  var result = Object.create(Vec4.prototype);
  result.storage = new Float32Array(this.storage);
  return result;
};

/**
 * @name Vec4.prototype#x
 * @description Alias for storage[0];
 * @type Number
 */
Object.defineProperty(Vec4.prototype, 'x', {
  get: function() { return this.storage[0]; },
  set: function(value) { this.storage[0] = value; }
});

/**
 * @name Vec4.prototype#y
 * @description Alias for storage[1]; 
 * @type Number
 */
Object.defineProperty(Vec4.prototype, 'y', {
  get: function() { return this.storage[1]; },
  set: function(value) { this.storage[1] = value; }
});

/**
 * @name Vec4.prototype#z
 * @description Alias for storage[2]; 
 * @type Number
 */
Object.defineProperty(Vec4.prototype, 'z', {
  get: function() { return this.storage[2]; },
  set: function(value) { this.storage[2] = value; }
});

/**
 * @name Vec4.prototype#w
 * @description Alias for storage[3]; 
 * @type Number
 */
Object.defineProperty(Vec4.prototype, 'w', {
  get: function() { return this.storage[3]; },
  set: function(value) { this.storage[3] = value; }
});

/**
 * @method set
 * @memberof Vec4.prototype  
 * @description Simulates operator <code>=</code>. Sets the coordinates from another vector, or number values. Without parameters, sets (0, 0, 0, 1).
 * @param {Vec4 | Vec3 | Vec2 | Object | Number} [u=0] - Any object (properties x, y, z, w are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @param {Number} [s=0] - Ignored if u.z is defined. Otherwise, the value for coordinate z.
 * @param {Number} [t=1] - Ignored if u.w is defined. Otherwise, the value for coordinate w.
 * @return {Vec4} this
 */
Vec4.prototype.set = function(u, v, s, t) {
  this.storage[0] = u && u.x || Number(u).valueOf() || 0;
  this.storage[1] = u && u.y || Number(v).valueOf() || 0;
  this.storage[2] = u && u.z || Number(s).valueOf() || 0;
  this.storage[3] = (u && (u.w - 1) || (Number(t).valueOf()-1) || 0) + 1;
  return this;  
};

/**
 * @method random
 * @memberof Vec4
 * @static 
 * @description Return a new {@link Vec4} with random values that to lie between two values, elementwise.
 * @param {Vec4 | Vec3 | Vec2 | Object | Number} [minVal=0] - Specifies the lower end of the random range. If a scalar is given, it applies to all channels.
 * @param {Vec4 | Vec3 | Vec2 | Object | Number} [maxVal=1] - Specifies the upper end of the random range. If a scalar is given, it applies to all channels.
 * @return {Vec4} this
 */
Vec4.random = function(minVal, maxVal) {
  var result = Object.create(Vec4.prototype);
  result.storage = new Float32Array(4);
  var mina = minVal && minVal.x || Number(minVal).valueOf() || 0;
  var maxa = maxVal && ((maxVal.x-1) || (Number(maxVal).valueOf()-1) || 0) + 1;  
  result.storage[0] = Math.random() * (maxa - mina) + mina;
  mina = minVal && minVal.y || Number(minVal).valueOf() || 0;
  maxa = maxVal && ((maxVal.y-1) || (Number(maxVal).valueOf()-1) || 0) + 1;  
  result.storage[1] = Math.random() * (maxa - mina) + mina;
  mina = minVal && minVal.z || Number(minVal).valueOf() || 0;
  maxa = maxVal && ((maxVal.z-1) || (Number(maxVal).valueOf()-1) || 0) + 1;  
  result.storage[2] = Math.random() * (maxa - mina) + mina;
  mina = minVal && minVal.w || Number(minVal).valueOf() || 0;
  maxa = maxVal && ((maxVal.w-1) || (Number(maxVal).valueOf()-1) || 0) + 1;  
  result.storage[3] = Math.random() * (maxa - mina) + mina;
  return result;
};

/**
 * @method setRandom
 * @memberof Vec4.prototype  
 * @description Fill the vector with random values that to lie between two further values, elementwise.
 * @param {Vec4 | Vec3 | Vec2 | Object | Number} [minVal=0] - Specifies the lower end of the random range. If a scalar is given, it applies to all channels.
 * @param {Vec4 | Vec3 | Vec2 | Object | Number} [maxVal=1] - Specifies the upper end of the random range. If a scalar is given, it applies to all channels.
 * @return {Vec4} this
 */
Vec4.prototype.setRandom = function(minVal, maxVal) {
  var mina = minVal && minVal.x || Number(minVal).valueOf() || 0;
  var maxa = maxVal && ((maxVal.x-1) || (Number(maxVal).valueOf()-1) || 0) + 1;  
  this.storage[0] = Math.random() * (maxa - mina) + mina;
  mina = minVal && minVal.y || Number(minVal).valueOf() || 0;
  maxa = maxVal && ((maxVal.y-1) || (Number(maxVal).valueOf()-1) || 0) + 1;  
  this.storage[1] = Math.random() * (maxa - mina) + mina;
  mina = minVal && minVal.z || Number(minVal).valueOf() || 0;
  maxa = maxVal && ((maxVal.z-1) || (Number(maxVal).valueOf()-1) || 0) + 1;  
  this.storage[2] = Math.random() * (maxa - mina) + mina;
  mina = minVal && minVal.w || Number(minVal).valueOf() || 0;
  maxa = maxVal && ((maxVal.w-1) || (Number(maxVal).valueOf()-1) || 0) + 1;  
  this.storage[3] = Math.random() * (maxa - mina) + mina;
  return this;  
};

/**
 * @method clamp
 * @memberof Vec4.prototype
 * @description Constrains the value of this vector to lie between two further values, elementwise, overwriting the contents with the result.
 * @param {Vec4 | Vec3 | Vec2 | Object | Number} [minVal=0] - Specifies the lower end of the range into which to constrain the elements. If a scalar is given, it applies to all channels.
 * @param {Vec4 | Vec3 | Vec2 | Object | Number} [maxVal=1] - Specifies the upper end of the range into which to constrain the elements. If a scalar is given, it applies to all channels.
 * @return {Vec4} this
 */
Vec4.prototype.clamp = function(minVal, maxVal) {
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
  mina = minVal && minVal.w || Number(minVal).valueOf() || 0;
  if(this.storage[3] < mina){
    this.storage[3] = mina;
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
  maxa = maxVal && ((maxVal.w-1) || (Number(maxVal).valueOf()-1) || 0) + 1;
  if(this.storage[3] > maxa){
    this.storage[3] = maxa;
  }
  return this;  
};

/**
 * @method setClamped
 * @memberof Vec4.prototype  
 * @description Fast. Constrains a value to lie between two further values, elementwise, storing the result in this vector.
 * @param {Vec4} b - The value to constrain.
 * @param {Vec4 | Vec3 | Vec2 | Object | Number} [minVal=0] - Specifies the lower end of the range into which to constrain the elements. If a scalar is given, it applies to all channels.
 * @param {Vec4 | Vec3 | Vec2 | Object | Number} [maxVal=1] - Specifies the upper end of the range into which to constrain the elements. If a scalar is given, it applies to all channels.
 * @return {Vec4} this
 */
Vec4.prototype.setClamped = function(b, minVal, maxVal) {
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
  mina = minVal && minVal.w || Number(minVal).valueOf() || 0;
  maxa = maxVal && ((maxVal.w-1) || (Number(maxVal).valueOf()-1) || 0) + 1;
  if(b.storage[3] < mina){
    this.storage[3] = mina;
  } else if(b.storage[3] > maxa){
    this.storage[3] = maxa;
  } else {
    this.storage[3] = b.storage[3];
  }
  return this;
};

/**
 * @method add
 * @memberof Vec4.prototype  
 * @description Simulates operator <code>+=</code>. Adds another vector to this vector, overwriting the contents with the result.
 * @param {Vec4 | Vec3 | Vec2 | Object | Number} [u=0] - Any object (properties x, y, z, w are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @param {Number} [s=0] - Ignored if u.z is defined. Otherwise, the value for coordinate z.
 * @param {Number} [t=0] - Ignored if u.w is defined. Otherwise, the value for coordinate w.
 * @return {Vec4} this
 */
Vec4.prototype.add = function(u, v, s, t) {
  this.storage[0] += u && u.x || Number(u).valueOf() || 0;
  this.storage[1] += u && u.y || Number(v).valueOf() || 0;
  this.storage[2] += u && u.z || Number(s).valueOf() || 0;
  this.storage[3] += u && u.w || Number(t).valueOf() || 0;
  return this;  
};

/**
 * @method addScaled
 * @memberof Vec4.prototype  
 * @description Simulates <code>+= dt *</code>. Adds another vector, scaled by `dt`, to this vector, overwriting the contents with the result.
 * @param {Number} dt - Scaling factor.
 * @param {Vec4 | Object | Number} [u=0] - Any object (property x), or a numerical value.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y. 
 * @param {Number} [s=0] - Ignored if u.z is defined. Otherwise, the value for coordinate z.
 * @param {Number} [t=0] - Ignored if u.w is defined. Otherwise, the value for coordinate w.
 * @return {Vec4} this
 */
Vec4.prototype.addScaled = function(dt, u, v, s, t) {
  this.storage[0] += dt * (u && u.x || Number(u).valueOf() || 0);
  this.storage[1] += dt * (u && u.y || Number(v).valueOf() || 0);
  this.storage[2] += dt * (u && u.z || Number(s).valueOf() || 0);
  this.storage[3] += dt * (u && u.w || Number(t).valueOf() || 0);
  return this;  
};

/**
 * @method plus
 * @memberof Vec4.prototype  
 * @description Simulates operator <code>+</code>. Adds this vector and the parameter vector, and returns the result in a new instance.
 * @param {Vec4 | Vec3 | Vec2 | Object | Number} [u=0] - Any object (properties x, y, z, w are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @param {Number} [s=0] - Ignored if u.z is defined. Otherwise, the value for coordinate z.
 * @param {Number} [t=0] - Ignored if u.w is defined. Otherwise, the value for coordinate w.
 * @return {Vec4} the sum of the two vectors
 */
Vec4.prototype.plus = function(u, v, s, t) {
  var result = Object.create(Vec4.prototype);
  result.storage = new Float32Array(4);
  result.storage[0] = this.storage[0] + (u && u.x || Number(u).valueOf() || 0);
  result.storage[1] = this.storage[1] + (u && u.y || Number(v).valueOf() || 0);
  result.storage[2] = this.storage[2] + (u && u.z || Number(s).valueOf() || 0);
  result.storage[3] = this.storage[3] + (u && u.w || Number(t).valueOf() || 0);
  return result;
};


/**
 * @method setSum
 * @memberof Vec4.prototype  
 * @description Fast. Adds the two argument vectors, storing the result in this vector.
 * @param {Vec4} b - Term 1.
 * @param {Vec4} c - Term 2. 
 * @return {Vec4} this
 */
Vec4.prototype.setSum = function(b, c) {
  this.storage[0] = b.storage[0] + c.storage[0];
  this.storage[1] = b.storage[1] + c.storage[1];
  this.storage[2] = b.storage[2] + c.storage[2];
  this.storage[3] = b.storage[3] + c.storage[3];
  return this;  
};

/**
 * @method sub
 * @memberof Vec4.prototype  
 * @description Simulates operator <code>-=</code>. Subtracts another vector from this vector, overwriting the contents with the result.
 * @param {Vec4 | Vec3 | Vec2 | Object | Number} [u=0] - Any object (properties x, y, z, w are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @param {Number} [s=0] - Ignored if u.z is defined. Otherwise, the value for coordinate z.
 * @param {Number} [t=0] - Ignored if u.w is defined. Otherwise, the value for coordinate w.
 * @return {Vec4} this
 */
Vec4.prototype.sub = function(u, v, s, t) {
  this.storage[0] -= u && u.x || Number(u).valueOf() || 0;
  this.storage[1] -= u && u.y || Number(v).valueOf() || 0;
  this.storage[2] -= u && u.z || Number(s).valueOf() || 0;
  this.storage[3] -= u && u.w || Number(t).valueOf() || 0;  
  return this;  
};

/**
 * @method minus
 * @memberof Vec4.prototype  
 * @description Simulates operator <code>-</code>. Subtracts the parameter vector from this vector, and returns the result in a new instance.
 * @param {Vec4 | Vec3 | Vec2 | Object | Number} [u=0] - Any object (properties x, y, z, w are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @param {Number} [s=0] - Ignored if u.z is defined. Otherwise, the value for coordinate z.
 * @param {Number} [t=0] - Ignored if u.w is defined. Otherwise, the value for coordinate w.
 * @return {Vec4} the difference of the two vectors
 */
Vec4.prototype.minus = function(u, v, s, t) {
  var result = Object.create(Vec4.prototype);
  result.storage = new Float32Array(4);
  result.storage[0] = this.storage[0] - (u && u.x || Number(u).valueOf() || 0);
  result.storage[1] = this.storage[1] - (u && u.y || Number(v).valueOf() || 0);
  result.storage[2] = this.storage[2] - (u && u.z || Number(s).valueOf() || 0);
  result.storage[3] = this.storage[3] - (u && u.w || Number(t).valueOf() || 0);
  return result;
};

/**
 * @method setDifference
 * @memberof Vec4.prototype  
 * @description Fast. Substracts the second argument vector from the first one, storing the result in this vector.
 * @param {Vec4} b - Minuend.
 * @param {Vec4} c - Subtrahend. 
 * @return {Vec4} this
 */
Vec4.prototype.setDifference = function(b, c) {
  this.storage[0] = b.storage[0] - c.storage[0];
  this.storage[1] = b.storage[1] - c.storage[1];
  this.storage[2] = b.storage[2] - c.storage[2];
  this.storage[3] = b.storage[3] - c.storage[3];
  return this;  
};

/**
 * @method mul
 * @memberof Vec4.prototype  
 * @description Simulates operator <code>*=</code>. Multiplies, this vector with another vector elementwise, matrix, or scalar, from the right, overwriting the contents with the result.
 * @param {Mat4 | Vec4 | Vec3 | Vec2 | Object | Number} [u=1] - A 4x4 matrix, or any object (properties x, y, z, w are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=1] - Ignored if u is a matrix, or u.y is defined. Otherwise, the value for coordinate y. Defaults to the value of parameter u, if it is a number.
 * @param {Number} [s=1] - Ignored if u is a matrix, or u.z is defined. Otherwise, the value for coordinate z. Defaults to the value of parameter u, if it is a number.
 * @param {Number} [t=1] - Ignored if u is a matrix, or u.w is defined. Otherwise, the value for coordinate w. Defaults to the value of parameter u, if it is a number.
 * @return {Vec4} this
 */
Vec4.prototype.mul = function(u, v, s, t) {
  if(u instanceof Mat4) {
    this.transform(u);
  } else {
    this.storage[0] *= u && ((u.x - 1) || (Number(u).valueOf()-1) || 0) + 1;
    this.storage[1] *= u && ((u.y - 1) || (Number(v).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1;
    this.storage[2] *= u && ((u.z - 1) || (Number(s).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1;
    this.storage[3] *= u && ((u.w - 1) || (Number(t).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1;
  }
  return this;  
};

/**
 * @method times
 * @memberof Vec4.prototype
 * @description Simulates operator <code>*</code>. Multiplies, this vector with another vector elementwise, matrix, or scalar, from the right, and returns the result in a new instance.
 * @param {Mat4 | Vec4 | Vec3 | Vec2 | Object | Number} [u=1] - A 4x4 matrix, or any object (properties x, y, z, w are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=1] - Ignored if u is a matrix, or u.y is defined. Otherwise, the value for coordinate y. Defaults to the value of parameter u, if it is a number.
 * @param {Number} [s=1] - Ignored if u is a matrix, or u.z is defined. Otherwise, the value for coordinate z. Defaults to the value of parameter u, if it is a number.
 * @param {Number} [t=1] - Ignored if u is a matrix, or u.w is defined. Otherwise, the value for coordinate w. Defaults to the value of parameter u, if it is a number.
 * @return {Vec4} the vector transformed by the matrix, or the elementwise product of the two vectors, or the scaled vector
 */
Vec4.prototype.times = function(u, v, s, t) {
  var result = Object.create(Vec4.prototype);
  result.storage = new Float32Array(4);
  if(u instanceof Mat4) {
    result.setTransformed(this, u);
  } else {
    result.storage[0] = this.storage[0] * (u && ((u.x - 1) || (Number(u).valueOf()-1) || 0) + 1);
    result.storage[1] = this.storage[1] * (u && ((u.y - 1) || (Number(v).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1);
    result.storage[2] = this.storage[2] * (u && ((u.z - 1) || (Number(s).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1);
    result.storage[3] = this.storage[3] * (u && ((u.w - 1) || (Number(t).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1);
  }
  return result;
};

/**
 * @method setProduct
 * @memberof Vec4.prototype  
 * @description Fast. Multiplies, elementwise, the two argument vectors, storing the result in this vector.
 * @param {Vec4} b - Factor 1.
 * @param {Vec4} c - Factor 2. 
 * @return {Vec4} this
 */
Vec4.prototype.setProduct = function(b, c) {
  this.storage[0] = b.storage[0] * c.storage[0];
  this.storage[1] = b.storage[1] * c.storage[1];
  this.storage[2] = b.storage[2] * c.storage[2];
  this.storage[3] = b.storage[3] * c.storage[3];
  return this;  
};

/**
 * @method div
 * @memberof Vec4.prototype  
 * @description Simulates operator <code>/=</code>. Divides, elementwise, this vector with another vector, or scalar, overwriting the contents with the result.
 * @param {Vec4 | Vec3 | Vec2 | Object | Number} [u=1] - Any object (properties x, y, z, w are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=1] - Ignored if u.y is defined. Otherwise, the value for coordinate y. Defaults to the value of parameter u, if it is a number.
 * @param {Number} [s=1] - Ignored if u.z is defined. Otherwise, the value for coordinate z. Defaults to the value of parameter u, if it is a number.
 * @param {Number} [t=1] - Ignored if u.w is defined. Otherwise, the value for coordinate w. Defaults to the value of parameter u, if it is a number.
 * @return {Vec4} this
 */
Vec4.prototype.div = function(u, v, s, t) {
  this.storage[0] /= u && ((u.x - 1) || (Number(u).valueOf()-1) || 0) + 1;
  this.storage[1] /= u && ((u.y - 1) || (Number(v).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1;
  this.storage[2] /= u && ((u.z - 1) || (Number(s).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1;
  this.storage[3] /= u && ((u.w - 1) || (Number(t).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1;
  return this;  
};

/**
 * @method over
 * @memberof Vec4.prototype
 * @description Simulates operator <code>/</code>. Divides, elementwise, this vector with another vector, or scalar, and returns the result in a new instance.
 * @param {Vec4 | Vec3 | Vec2 | Object | Number} [u=1] - Any object (properties x, y, z, w are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=1] - Ignored if u.y is defined. Otherwise, the value for coordinate y. Defaults to the value of parameter u, if it is a number.
 * @param {Number} [s=1] - Ignored if u.z is defined. Otherwise, the value for coordinate z. Defaults to the value of parameter u, if it is a number.
 * @param {Number} [t=1] - Ignored if u.w is defined. Otherwise, the value for coordinate w. Defaults to the value of parameter u, if it is a number.
 * @return {Vec4} the elementwise product of the two vectors
 */
Vec4.prototype.over = function(u, v, s, t) {
  var result = Object.create(Vec4.prototype);
  result.storage = new Float32Array(4);
  result.storage[0] = this.storage[0] / (u && ((u.x - 1) || (Number(u).valueOf()-1) || 0) + 1);
  result.storage[1] = this.storage[1] / (u && ((u.y - 1) || (Number(v).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1);
  result.storage[2] = this.storage[2] / (u && ((u.z - 1) || (Number(s).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1);
  result.storage[3] = this.storage[3] / (u && ((u.w - 1) || (Number(t).valueOf()-1) || (Number(u).valueOf()-1) || 0) + 1);
  return result;
};

/**
 * @method setQuotient
 * @memberof Vec4.prototype  
 * @description Fast. Divides, elementwise, the two argument vectors, storing the result in this vector.
 * @param {Vec4} b - Dividend.
 * @param {Vec4} c - Divisor. 
 * @return {Vec4} this
 */
Vec4.prototype.setQuotient = function(b, c) {
  this.storage[0] = b.storage[0] / c.storage[0];
  this.storage[1] = b.storage[1] / c.storage[1];
  this.storage[2] = b.storage[2] / c.storage[2];
  this.storage[3] = b.storage[3] / c.storage[3];
  return this;  
};

/**
 * @method setScaled
 * @memberof Vec4.prototype  
 * @description Fast. Scales the vector by a scalar.
 * @param {Vec4} a - Vector to scale.
 * @param {Number} s - Scale factor. 
 * @return {Vec4} this
 */
Vec4.prototype.setScaled = function(a, s){
  this.storage[0] = a.x * s;
  this.storage[1] = a.y * s;
  this.storage[2] = a.z * s;  
  this.storage[3] = a.w * s;
  return this;
};

/**
 * @method setScaledByInverse
 * @memberof Vec4.prototype  
 * @description Fast. Scales the vector by the reciprocal of scalar.
 * @param {Vec4} a - Vector to scale.
 * @param {Number} s - Scale factor inverse.
 * @return {Vec4} this
 */
Vec4.prototype.setScaledByInverse = function(a, s){
  this.storage[0] = a.x / s;
  this.storage[1] = a.y / s;
  this.storage[2] = a.z / s;  
  this.storage[3] = a.w / s;
  return this;  
};

/**
 * @method length2
 * @memberof Vec4.prototype  
 * @description Computes the length squared.
 * @return {Number} x*x + y*y + z*z + w*w
 */
Vec4.prototype.length2 = function() {
  return this.storage[0] * this.storage[0] + this.storage[1] * this.storage[1] + this.storage[2] * this.storage[2] + this.storage[3] * this.storage[3];
};

/**
 * @method length
 * @memberof Vec4.prototype  
 * @description Computes the vector length.
 * @return {Number}
 */
Vec4.prototype.length = function() {
  return Math.sqrt(this.length2());
};

/**
 * @method normalize
 * @memberof Vec4.prototype  
 * @description Scales the vector by the inverse of its length, overwriting the contents with the result.
 * @return {Vec4} this
 */
Vec4.prototype.normalize = function() {
  var l = this.length();
  this.storage[0] /= l;
  this.storage[1] /= l;
  this.storage[2] /= l;  
  this.storage[3] /= l;
  return this;
};

/**
 * @method direction
 * @memberof Vec4.prototype  
 * @description Scales the vector by the inverse of its length, and returns the result in a new instance.
 * @return {Vec4} A unit length vector with the same direction as this.
 */
Vec4.prototype.direction = function() {
  var result = Object.create(Vec4.prototype);
  result.storage = new Float32Array(4);
  var l = this.length();
  result.storage[0] = this.storage[0] / l;
  result.storage[1] = this.storage[1] / l;
  result.storage[2] = this.storage[2] / l;
  result.storage[3] = this.storage[3] / l;
  return result;
};

/**
 * @method setNormalized
 * @memberof Vec4.prototype  
 * @description Scales the argmument vector by the inverse of its length, storing the result in this vector.
 * @param b {Vec4} - The vector to normalize.
 * @return {Vec4} this
 */
Vec4.prototype.setNormalized = function(b) {
  var l = b.length();
  this.storage[0] = b.storage[0] / l;
  this.storage[1] = b.storage[1] / l;
  this.storage[2] = b.storage[2] / l;  
  this.storage[3] = b.storage[3] / l;
  return this;
};

/**
 * @method dot
 * @memberof Vec4.prototype  
 * @description Computes the dot product with another vector.
 * @param {Vec4 | Vec3 | Vec2 | Object | Number} [u=0] - Any object (properties x, y, z, w are interpreted as coordinates, if given), or a numerical value for coordinate x.
 * @param {Number} [v=0] - Ignored if u.y is defined. Otherwise, the value for coordinate y.
 * @param {Number} [s=0] - Ignored if u.z is defined. Otherwise, the value for coordinate z.
 * @param {Number} [t=0] - Ignored if u.w is defined. Otherwise, the value for coordinate w.
 * @return {Number}
 */
Vec4.prototype.dot = function(u, v, s, t) {
  return this.storage[0] * (u && u.x || Number(u).valueOf() || 0) +
         this.storage[1] * (u && u.y || Number(v).valueOf() || 0) +
         this.storage[2] * (u && u.z || Number(s).valueOf() || 0) +
         this.storage[3] * (u && u.w || Number(t).valueOf() || 0);
};

/**
 * @method transform
 * @memberof Vec4.prototype
 * @description Multiplies the vector (considering it a row vector) with a matrix, from the right. The contents of this are overwritten with the transformed vector with the result. See {@link Vec4.prototype#times} for a version creating a new vector instance.
 * @param m {Mat4} The 4x4 linear homogeneous transformation matrix using column-major representation.
 * @return {Vec4} this
 */
Vec4.prototype.transform = function(m) {
  var x = this.storage[0];
  var y = this.storage[1];
  var z = this.storage[2];
  var w = this.storage[3];
  this.storage[0] =
    x * m.storage[ 0] +
    y * m.storage[ 1] +
    z * m.storage[ 2] +
    w * m.storage[ 3] ;
  this.storage[1] =
    x * m.storage[ 4] +
    y * m.storage[ 5] +
    z * m.storage[ 6] +
    w * m.storage[ 7] ;
  this.storage[2] =
    x * m.storage[ 8] +
    y * m.storage[ 9] +
    z * m.storage[10] +
    w * m.storage[11] ;
  this.storage[3] =
    x * m.storage[12] +
    y * m.storage[13] +
    z * m.storage[14] +
    w * m.storage[15] ;
  return this;
};

/**
 * @method setTransformed
 * @memberof Vec4.prototype
 * @description Multiplies the argument vector (considering it a row vector) with the argument matrix, from the right. The contents of this are overwritten with the transformed vector with the result. See {@link Vec4.prototype#times} for a version creating a new vector instance.
 * @param m {Mat4} The 4x4 linear homogeneous transformation matrix using column-major representation.
 * @return {Vec4} this
 */
Vec4.prototype.setTransformed = function(v, m) {
  this.storage[0] =
    v.storage[0] * m.storage[ 0] +
    v.storage[1] * m.storage[ 1] +
    v.storage[2] * m.storage[ 2] +
    v.storage[3] * m.storage[ 3] ;
  this.storage[1] =
    v.storage[0] * m.storage[ 4] +
    v.storage[1] * m.storage[ 5] +
    v.storage[2] * m.storage[ 6] +
    v.storage[3] * m.storage[ 7] ;
  this.storage[2] =
    v.storage[0] * m.storage[ 8] +
    v.storage[1] * m.storage[ 9] +
    v.storage[2] * m.storage[10] +
    v.storage[3] * m.storage[11] ;
  this.storage[3] =
    v.storage[0] * m.storage[12] +
    v.storage[1] * m.storage[13] +
    v.storage[2] * m.storage[14] +
    v.storage[3] * m.storage[15] ;
  return this;
};

/**
 * @method commit
 * @memberof Vec4.prototype  
 * @description Sets the value of the vector to a WebGL vec4 uniform variable.
 * @param {WebGLRenderingContext} gl - rendering context
 * @param {WebGLUniformLocation} uniformLocation - location of the uniform variable in the currently used WebGL program
 */
Vec4.prototype.commit = function(gl, uniformLocation){
  gl.uniform4fv(uniformLocation, this.storage);
};

// CommonJS style export to allow file to be required in server side node.js
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
  module.exports = Vec4;
}
