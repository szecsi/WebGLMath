"use strict";
/* exported UniformProvider */ 
class UniformProvider {
  constructor(...glslStructNames){
    this.glslStructNames = glslStructNames;
    this.components = new Set();
  }

  addComponentsAndGatherUniforms(...components){
    components.forEach(component => this.components.add(component) );
    this.definePropertiesMatchingUniforms(this);
  }

  definePropertiesMatchingUniforms(target){
    this.components.forEach(
      component => component.definePropertiesMatchingUniforms(target)
      );
  }

  draw(...uniformProviders){
    this.components.forEach(
      component => component.draw(this, ...uniformProviders)
      );
  }  
  
}

