/* exported UniformReflection */
/**
 * @file WebGLMath UniformReflection object
 * @copyright Laszlo Szecsi 2019
 */
"use strict";
/**
 * @class UniformReflection
 * @classdesc A collection of static factory methods that return WebGLMath objects reflecting WebGL uniforms.
 * The purpose is to offer a way of creating objects by ESSL type name and array size.
 * It also offers the static addProperties method to automate populating objects with reflected uniforms.
 */
const UniformReflection = {
  /**
   * @method addProperties
   * @memberof UniformReflection
   * @static 
   * @description Populates a target object with reflection properties matching the uniforms in a given struct of a given WebGL program, and adds a method that commits all reflection properties to their respective uniforms.
   * @param {Object} target - The object to gain the properties and the method.
   * @param {WebGLRenderingContext} gl - The rendering context.
   * @param {WebGLProgram} glProgram - The WebGL program whose active uniforms are to be reflected.
   * @param {String} prefix - Only uniforms whose names start with this prefix are reflected. The prefix---and additional characters before and including the first '.' ---are trimmed off. 
   */  
  addProperties : function(target, gl, glProgram, prefix){
    prefix = prefix || "";
    target.uniformDescs = {}; 
    let textureUnitCount = 0;
    const nUniforms = gl.getProgramParameter(glProgram, gl.ACTIVE_UNIFORMS); 
    for(let i=0; i<nUniforms; i++){ 
      const glUniform = gl.getActiveUniform(glProgram, i); 
      const uniformDesc = { 
        type      : glUniform.type, 
        size      : glUniform.size || 1, 
        location  : gl.getUniformLocation(glProgram, glUniform.name) 
      };
      if(glUniform.type === gl.SAMPLER_2D || glUniform.type === gl.SAMPLER_CUBE){ 
        uniformDesc.textureUnit = textureUnitCount; 
        textureUnitCount += uniform.size; 
      }  

      let reflectionName = glUniform.name.split('[')[0];
      if(reflectionName.startsWith(prefix)) {
        reflectionName = reflectionName.slice(prefix.length);
        reflectionName = reflectionName.replace(/^\w*\./, "");

        target.uniformDescs[reflectionName] = uniformDesc;
        const reflectionVariable = 
            UniformReflection.makeVar(gl, uniformDesc.type, uniformDesc.size, uniformDesc.textureUnit);
        if(target.reflectionName){
          if(target.reflectionName.constructor !== reflectionVariable.constructor ||
            target.reflectionName.storage.length !== reflectionVariable.storage.length
            )
            throw new Error("Uniform with the same name but different type: " + target.reflectionName);
        } else {
          Object.defineProperty(target, reflectionName, {value: reflectionVariable} );
        }
      }
    }
    Object.defineProperty(target, "commitUniforms", { value: function(gl){
      Object.keys(this.uniformDescs).forEach( (reflectionName) => { 
        const uniformDesc = this.uniformDescs[reflectionName];
        this[reflectionName].commit(gl, uniformDesc.location);
      });
    }});
  },
  /**
   * @method makeVar
   * @memberof UniformReflection
   * @static 
   * @description Returns a new reflection variable based on a numberical WebGL type ID.
   * @param {WebGLRenderingContext} gl - The rendering context.
   * @param {Number} type - The numeric type of the uniform, i.e. a value of a type identifier property in the rendering context.
   * @param {Number} arraySize - The number of elements in the uniform, if it is an array. Otherwise, it must be 1.
   * @return {Vec1 | Vec1Array | Vec2 | Vec2Array | Vec3 | Vec3Array | Vec4 | Vec4Array | Mat4 | Mat4Array | Sampler2D | Sampler2DArray | SamplerCube | SamplerCubeArray} The new reflection object.
   */  
  makeVar : function(gl, type, arraySize, samplerIndex) {
    switch(type) {
      case gl.FLOAT        : return this.float(arraySize);
      case gl.FLOAT_VEC2   : return this.vec2(arraySize);
      case gl.FLOAT_VEC3   : return this.vec3(arraySize);
      case gl.FLOAT_VEC4   : return this.vec4(arraySize);
      case gl.FLOAT_MAT4   : return this.mat4(arraySize);
      case gl.SAMPLER_2D   : return this.sampler2D(arraySize, samplerIndex);
      case gl.SAMPLER_CUBE : return this.samplerCube(arraySize, samplerIndex);      
    }
  },
  /**
   * @method float
   * @memberof UniformReflection
   * @static 
   * @description Returns a new {@link Vec1} or {@link Vec1Array} with appropriate size.
   * @param {arraySize} - The number of elements in the uniform, if it is an array. For a single float, it must be 1.
   * @return {Vec1 | Vec1Array} The new reflection object.
   */
  float : function(arraySize){ if(arraySize === 1) { return new Vec1(); } else { return new Vec1Array   (arraySize); } },
  /**
   * @method vec2
   * @memberof UniformReflection
   * @static 
   * @description Returns a new {@link Vec2} or {@link Vec2Array} with appropriate size.
   * @param {arraySize} - The number of elements in the uniform, if it is an array. For a single vec2, it must be 1.
   * @return {Vec2 | Vec2Array} The new reflection object.
   */
  vec2  : function(arraySize){ if(arraySize === 1) { return new Vec2(); } else { return new Vec2Array   (arraySize); } },
  /**
   * @method vec3
   * @memberof UniformReflection
   * @static 
   * @description Returns a new {@link Vec3} or {@link Vec3Array} with appropriate size.
   * @param {arraySize} - The number of elements in the uniform, if it is an array. For a single vec3, it must be 1.
   * @return {Vec3 | Vec3Array} The new reflection object.
   */
  vec3  : function(arraySize){ if(arraySize === 1) { return new Vec3(); } else { return new Vec3Array   (arraySize); } },
  /**
   * @method vec4
   * @memberof UniformReflection
   * @static 
   * @description Returns a new {@link Vec4} or {@link Vec4Array} with appropriate size.
   * @param {arraySize} - The number of elements in the uniform, if it is an array. For a single vec4, it must be 1.
   * @return {Vec4 | Vec4Array} The new reflection object.
   */
  vec4  : function(arraySize){ if(arraySize === 1) { return new Vec4(); } else { return new Vec4Array   (arraySize); } },
  /**
   * @method mat4
   * @memberof UniformReflection
   * @static 
   * @description Returns a new {@link Mat4} or {@link Mat4Array} with appropriate size.
   * @param {arraySize} - The number of elements in the uniform, if it is an array. For a single mat4, it must be 1.
   * @return {Mat4 | Mat4Array} The new reflection object.
   */
  mat4  : function(arraySize){ if(arraySize === 1) { return new Mat4(); } else { return new Mat4Array   (arraySize); } },
  /**
   * @method mat4
   * @memberof UniformReflection
   * @static 
   * @description Returns a new {@link Sampler2D} object.
   * @param {arraySize} - Ignored. There are no Sampler2D arrays in ESSL.
   * @return {Mat4 | Mat4Array} The new reflection object.
   */  
  sampler2D :      function(arraySize, samplerIndex){ if(arraySize === 1) { return new Sampler2D(samplerIndex); } else { return new Sampler2DArray(arraySize, samplerIndex);}},
  samplerCube :    function(arraySize, samplerIndex){ if(arraySize === 1) { return new SamplerCube(samplerIndex); } else { return new SamplerCubeArray(arraySize, samplerIndex);}}
};
