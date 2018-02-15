const ResourceObjectIdentifier = require('./ResourceObjectIdentifier.js')

function ResourceObject(resobj) {

  this._resource = resobj;

  this.getType = function() {
    return this._resource.type;
  }

  this.getId = function(){
    return this._resource.id;
  }

  this.getAttributes = function() {
    return this._resource.attributes;
  }

  this.getRelationships = function() {
    let relationships = {};

    for(var type in this._resource.relationships){
      let data = this._resource.relationships[type].data;

      if(Array.isArray(data)){
        data = data.map(function(relation){ return new ResourceObjectIdentifier(relation);  })
      }else{
        data = new ResourceObjectIdentifier(data);
      }

      relationships[type] = data;
    }

    return relationships;
  }

  this.flatten = function(included) {
    let flat = Object.assign({_id: this.getId(), _type: this.getType()}, this.getAttributes());

    // add relationships
    let relationships = this.getRelationships();
    for(var type in relationships){
      flat[type] = Array.isArray(relationships[type])
                    ? relationships[type].map((roi) => roi.flatten(included))
                    : relationships[type].flatten(included);
    }

    return flat;
  }
}

module.exports = ResourceObject;
