import ResourceObjectIdentifier from './ResourceObjectIdentifier.js'

export default class ResourceObject
{
  constructor (resource) {
    this._resource = resource;
  }

  getType () {
    return this._resource.type;
  }

  getId () {
    return this._resource.id;
  }

  getLinks () {
    return this._resource.hasOwnProperty('links') ? this._resource.links : {};
  }

  getAttributes () {
    return this._resource.attributes;
  }

  getRelationships () {
    return this._resource.relationships;
  }

  getResourceObjectIdentifier () {
    return new ResourceObjectIdentifier({
      type: this.getType(),
      id: this.getId()
    })
  }

  _decorateRelationshipsAsResourceObjectIdentifiers (relationships) {
    let result = {};

    for(var type in relationships){
      let data = relationships[type].data;
      let parent = this.getResourceObjectIdentifier();

      if(Array.isArray(data)){
        data = data.map((relation) => new ResourceObjectIdentifier(relation, parent) )
      }else{
        data = new ResourceObjectIdentifier(data, parent);
      }

      result[type] = data;
    }

    return result;
  }

  flatten (included) {
    // Create new object with _id, _type, {...attributes}
    let flat = Object.assign(
      {_id: this.getId(), _type: this.getType()},
      this.getAttributes()
    );

    // Get relationships decorated as
    let relationships = this._decorateRelationshipsAsResourceObjectIdentifiers(this.getRelationships());

    // add relationships
    for(var type in relationships){
      flat[type] = Array.isArray(relationships[type])
                    ? relationships[type].map(roi => roi.flatten(included))
                    : relationships[type].flatten(included);
    }

    return flat;
  }

}
