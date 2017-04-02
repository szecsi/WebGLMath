/**
 * @file WebGLMath {@link SamplerCube} class
 * @copyright Laszlo Szecsi 2017
 */

/**
 * @class SamplerCube
 * @classdesc Stores a WebGL texture unit index, and a WebGL texture to be bound to it. May reflect an ESSL samplerCube uniform variable.
 * @description Creates object.
 * @param {Number} textureUnit - The texture unit index. This should be different for every texture used in the same program, and less than the maximum texture unit count, which is at least 8 in WebGL.
 * @constructor
 */
var SamplerCube = function(textureUnit){
  this.glTexture = null;
  this.textureUnit = textureUnit;
};

/**
 * @method set
 * @memberof SamplerCube.prototype  
 * @description Assigns a texture.
 * @param {Object | WebGLTexture} texture - A WebGL texture, or any object with the `glTexture` property that stores a WebGL texture.
 */
SamplerCube.prototype.set = function(texture){
  this.glTexture = texture && texture.glTexture || texture || null;
};

/**
 * @method commit
 * @memberof SamplerCube.prototype  
 * @description Sets the value of the texture unit index to the WebGL samplerCube uniform variable, and binds the texture to the corresponding texture unit.
 * @param {WebGLRenderingContext} gl - rendering context
 * @param {WebGLUniformLocation} uniformLocation - location of the uniform variable in the currently used WebGL program
 */
SamplerCube.prototype.commit = function(gl, uniformLocation){
  if(this.glTexture) {
    gl.uniform1i(uniformLocation, this.textureUnit);
    gl.activeTexture(gl.TEXTURE0 + this.textureUnit);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.glTexture);
  } else {
  	throw new Error("No texture bound to uniform SamplerCube.");
  }
};
