/**
 * @file WebGLMath {@link Sampler2D} class
 * @copyright Laszlo Szecsi 2017
 */

/**
 * @class Sampler2D
 * @classdesc Stores a WebGL texture unit index, and a WebGL texture to be bound to it. May reflect an ESSL sampler2d uniform variable.
 * @description Creates object.
 * @param {Number} textureUnit - The texture unit index. This should be different for every texture used in the same program, and less than the maximum texture unit count, which is at least 8 in WebGL.
 * @constructor
 */
 var Sampler2D = function(textureUnit){
  this.glTexture = null;
  this.storage = new Int32Array([textureUnit]);
};

/**
 * @method set
 * @memberof Sampler2D.prototype  
 * @description Assigns a texture.
 * @param {Object | WebGLTexture} texture - A WebGL texture, or any object with the `glTexture` property that stores a WebGL texture.
 */
Sampler2D.prototype.set = function(texture){
  this.glTexture = texture && texture.glTexture || texture || null;
};

/**
 * @method commit
 * @memberof Sampler2D.prototype  
 * @description Sets the value of the texture unit index to the WebGL sampler2d uniform variable, and binds the texture to the corresponding texture unit.
 * @param {WebGLRenderingContext} gl - rendering context
 * @param {WebGLUniformLocation} uniformLocation - location of the uniform variable in the currently used WebGL program
 */
Sampler2D.prototype.commit = function(gl, uniformLocation){
  if(this.glTexture) {
    gl.uniform1iv(uniformLocation, this.storage);
    gl.activeTexture(gl.TEXTURE0 + this.storage[0]);
    gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
  } else {
    throw new Error("No texture bound to uniform Sampler2D.");
  }
};

