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
   * @description Populates a target object (or objects) with reflection properties matching the uniforms in a WebGL program.
   * @param {WebGLRenderingContext} gl - The rendering context.
   * @param {WebGLProgram} glProgram - The WebGL program whose active uniforms are to be reflected.
   * @param {Object} target - The object to gain the properties matching uniforms that are not defined in structs.
   * @param {Object} [structTargets = window.Uniforms] - For uniforms defined in structs, the reflection property is added to structTargets[<struct name>], which must be an Object, or undefined, in which case a new object is created.
   * @return {Proxy} - The target object wrapped in a proxy that only prints a warning on accessing non-existent properties.
   */  
  addProperties : function(gl, glProgram, target, structTargets){
    if(!("Uniforms" in window)){ window.Uniforms = UniformReflection.makeProxy({},"uniform struct");}
    structTargets = structTargets || window.Uniforms;
    // for all uniforms used in glProgram
    const nUniforms = gl.getProgramParameter(glProgram, gl.ACTIVE_UNIFORMS);
    for(let i=0; i<nUniforms; i++){ 
      const glUniform = gl.getActiveUniform(glProgram, i); 
      // create an object of approriate type
      const reflectionVariable = 
          UniformReflection.makeVar(gl, glUniform.type, glUniform.size || 1);
      // separate struct name (if exists) and unqualified uniform name
      const nameParts = glUniform.name.split('[')[0].split('.');
      const uniformName = nameParts[nameParts.length - 1];
      const structName = nameParts[nameParts.length - 2];      

      let t = target; // uniform should be reflected in target, by default
      if(structName) { // except if it is defined in a struct
        if(!(structName in structTargets)) { // add a reflection object for the struct
          Object.defineProperty(structTargets, structName, {value: UniformReflection.makeProxy({})} );
        }
        t = structTargets[structName]; // uniform defined in struct should be reflected here
      }
      if(uniformName in t){ // if reflection property already exists, check compatibility
        if(t[uniformName].constructor !== reflectionVariable.constructor ||
          t[uniformName].storage.length !== reflectionVariable.storage.length){
          throw new Error("Trying to reflect incompatible uniforms both called " + uniformName + "to the same target object.");
        }
      } else {
        Object.defineProperty(t, uniformName, {value: reflectionVariable} );
      }
    }

    return UniformReflection.makeProxy(target);
  },
  /**
   * @method commitProperties
   * @memberof UniformReflection
   * @static 
   * @description Commits the reflection properties of a source object (or objects) matching the uniforms in a given WebGL program.
   * @param {WebGLRenderingContext} gl - The rendering context.
   * @param {WebGLProgram} glProgram - The WebGL program whose active uniforms are to be set.
   * @param {Object} source - The object whose properties should be committed to the uniforms not defined in structs.
   * @param {Object} [structSources = window.Uniforms] - For uniforms defined in structs, the properties of structSources[<struct name>] are committed.
   */  
  commitProperties : function(gl, glProgram, source, structSources){
    structSources = structSources || window.Uniforms;
    let textureUnitCount = 0;
    // for all uniforms used in glProgram
    const nUniforms = gl.getProgramParameter(glProgram, gl.ACTIVE_UNIFORMS); 
    for(let i=0; i<nUniforms; i++){ 
      const glUniform = gl.getActiveUniform(glProgram, i); 
      // keep track of texture units used
      if(glUniform.type === gl.SAMPLER_2D || glUniform.type === gl.SAMPLER_CUBE){ 
        textureUnitCount += glUniform.size || 1; 
      }
      // separate struct name (if exists) and unqualified uniform name
      const nameParts = glUniform.name.split('[')[0].split('.');
      const uniformName = nameParts[nameParts.length - 1];
      const structName = nameParts[nameParts.length - 2];      
      // get uniform location and commit reflection property there
      const location = gl.getUniformLocation(glProgram, glUniform.name);
      // use struct source instead of source for uniforms defined in structs
      (structName?structSources[structName]:source)[uniformName].commit(gl, location, textureUnitCount);
    }
  },  
  /**
   * @method makeProxy
   * @memberof UniformReflection
   * @static 
   * @description Returns an object that forwards property accesses to a target, and prints a warning message if the target does not have the proerty, instead of causing an error.
   * @param {Object} target - The object whose propery accesses are to be guarded.
   * @param {String} [type="uniform"] - Printed as part of the warning message.
   */  
  makeProxy : function(target, type){
    type = type || "uniform";
    return new Proxy(target, { 
      get : function(target, name){ 
        if(!(name in target)){ 
          console.error("WARNING: Ignoring attempt to access property '" + 
            name + "'. Is '" + name + "' an unused " + type + "?" ); 
          return UniformReflection.dummy; 
        } 
        return target[name]; 
      }, 
    });  
  },  
  /**
   * @property dummy
   * @memberof UniformReflection
   * @static 
   * @description Absorbs all function calls and property accesses without effect. 
   * @type Proxy
   */  
  // absorbs all function calls and property accesses without effect
  dummy : new Proxy(() => false, { 
    get: function(){ 
      return UniformReflection.dummy; 
    }, 
    apply: function(){ 
      return UniformReflection.dummy; 
    }, 
  }),
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
