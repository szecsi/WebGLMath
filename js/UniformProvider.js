"use strict";
/* exported UniformProvider */ 
class UniformProvider {
  constructor(...glslStructNames){
    this.glslStructNames = glslStructNames;
    this.components = new Set();
  }

  addComponentsAndGatherUniforms(...components){
    for(const component of components){
      this.components.add(component);
    }
    this.definePropertiesMatchingUniforms(this);
  }

  definePropertiesMatchingUniforms(target){
    for(const component of this.components){
      if('definePropertiesMatchingUniforms' in component){
        component.definePropertiesMatchingUniforms(target);
      }
    }
  }

  draw(...uniformProviders){
    for(const component of this.components){
      component.draw(this, ...uniformProviders);
    }
  }  
  
}

