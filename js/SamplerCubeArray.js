/**
 * @file WebGLMath SamplerCubeArray class
 * @copyright Laszlo Szecsi 2017
 */

/**
 * @class SamplerCubeArray
 * @classdesc Array of 2d cube samplers. May reflect an ESSL array-of-samplerCubes uniform variable.
 * <BR> Individual [SamplerCube]{@link SamplerCube} elements are available through the index operator [].
 * @param {Number} size - The number of SamplerCube elements in the array.
 * @param {Number} baseTextureUnit - The texture unit index of the first element. Other elements are assigned to texture units contiguously. 
 * @constructor
 */
var SamplerCubeArray = function(size, baseTextureUnit){
  this.length = size;
  this.storage = new Int32Array(size);
  for(var i=0; i<size; i++){
  	this.storage[i] = i + baseTextureUnit;
    var proxy = Object.create(SamplerCube.prototype);
    proxy.glTexture = null;
    proxy.storage = this.storage.subarray(i, (i+1));
    Object.defineProperty(this, i, {value: proxy} );
  }
};

/**
 * @method commit
 * @memberof SamplerCubeArray.prototype  
 * @description Sets the texture unit index of the all samplers in the array, and bind textures set to SamplerCube array elements.
 * @param {WebGLRenderingContext} gl - rendering context
 * @param {WebGLUniformLocation} uniformLocation - location of the uniform variable in the currently used WebGL program
 */
SamplerCubeArray.prototype.commit = function(gl, uniformLocation){
  gl.uniform1iv(uniformLocation, this.storage);
  for(var i=0; i<this.length; i++) {
    gl.activeTexture(gl.TEXTURE0 + this.storage[i]);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this[i].glTexture);
  }
};

