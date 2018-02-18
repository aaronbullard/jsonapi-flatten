const ResourceObjectIdentifier = require('./ResourceObjectIdentifier.js')

function ResourceObject(obj) {

  var _resource = obj;

  var getType = () => _resource.type;

  var getId = () => _resource.id;

  var _getAttributes = () => _resource.attributes;

  var _getRelationships = () => {
    let relationships = {};

    for(var type in _resource.relationships){
      let data = _resource.relationships[type].data;

      if(Array.isArray(data)){
        data = data.map((relation) => new ResourceObjectIdentifier(relation, getResourceObjectIdentifier()) )
      }else{
        data = new ResourceObjectIdentifier(data, getResourceObjectIdentifier());
      }

      relationships[type] = data;
    }

    return relationships;
  }

  var getLinks = () => {
    return _resource.hasOwnProperty('links') ? _resource.links : {};
  }

  var getResourceObjectIdentifier = () => {
    return new ResourceObjectIdentifier({
      type: getType(),
      id: getId()
    })
  }

  var flatten = (included) => {
    let flat = Object.assign({_id: getId(), _type: getType()}, _getAttributes());
    let relationships = _getRelationships();

    // add relationships
    for(var type in relationships){
      flat[type] = Array.isArray(relationships[type])
                    ? relationships[type].map(roi => roi.flatten(included))
                    : relationships[type].flatten(included);
    }

    return flat;
  }

  return {
    getType: getType,
    getId: getId,
    getResourceObjectIdentifier: getResourceObjectIdentifier,
    getLinks: getLinks,
    flatten: flatten
  }
}


module.exports = ResourceObject;
