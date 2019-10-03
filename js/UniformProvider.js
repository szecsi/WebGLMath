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

  using(...overriders){
      return {
        target : this,
        draw : function(...uniformProviders){
          const overrides = {};
          for(const overrider of overriders) {
            overrides[overrider.constructor.name] = overrider;
          }
          this.target.drawWithOverrides(overrides, ...uniformProviders);
        },
        drawWithOverrides : function(overrides, ...uniformProviders){
          overrides[overrider.constructor.name] = overrider;
          this.target.drawWithOverrides(overrides, ...uniformProviders);
        }        
      };
  }

  drawWithOverrides(overrides, ...uniformProviders){
    for(let component of this.components){
      if(component.constructor.name in overrides){
        component = overrides[component.constructor.name];
      }
      if('drawWithOverrides' in component) {
        component.drawWithOverrides(overrides, this, ...uniformProviders);
      } else {
        component.draw(this, ...uniformProviders);
      }
    }
  }  
  
}

