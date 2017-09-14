/**
 * @file WebGLMath Mat4Array class
 * @copyright Laszlo Szecsi 2017
 */

/**
 * @class Mat4Array
 * @classdesc Array of four by four matrices of 32-bit floats. May reflect an ESSL array-of-mat4s uniform variable.
 * <BR> Individual [Mat4]{@link Mat4} elements are available through the index operator [].
 * @param {Number} size - The number of Mat4 elements in the array.
 * @constructor
 */
var Mat4Array = function(size){
  this.length = size;
  this.storage = new Float32Array(size * 16);
};

/**
 * @method at
 * @memberof Mat4Array.prototype  
 * @description Returns a new Mat4 object that captures an element of the array. The new vector is a view on the original data, not a copy.
 * @param index {Number} - Index of the element.
 * @return {Mat4} new view on one of the array's elements
 */
Mat4Array.prototype.at = function(index){
  var result = Object.create(Mat4.prototype);
  result.storage = this.storage.subarray(index*16, index*16+16);
  return result;  
}

/**
 * @method subarray
 * @memberof Mat4Array.prototype  
 * @description Returns a new Mat4Array object that captures a subrange of the array. The new array is a view on the original data, not a copy.
 * @param {Number} [begin=0] - Element to begin at. The offset is inclusive. The whole array will be cloned if this value is not specified.
 * @param {Number} [end=length] - Element to end at. The offset is exclusive. If not specified, all elements from the one specified by begin to the end of the array are included in the new view.
 * @return {Mat4Array} new view on some of the array's elements
 */
Mat4Array.prototype.subarray = function(begin, end){
  var result = Object.create(Mat4Array.prototype);
  result.storage = this.storage.subarray(begin*16, end*16);
  return result;
};

/**
 * @method commit
 * @memberof Mat4Array.prototype  
 * @description Sets the value of the matrix array to a WebGL mat4 array uniform variable.
 * @param {WebGLRenderingContext} gl - rendering context
 * @param {WebGLUniformLocation} uniformLocation - location of the uniform variable in the currently used WebGL program
 */
Mat4Array.prototype.commit = function(gl, uniformLocation){
  gl.uniformMatrix4fv(uniformLocation, false, this.storage);
};

// CommonJS style export to allow file to be required in server side node.js
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
  module.exports = Mat4Array;
}