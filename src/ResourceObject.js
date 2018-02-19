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

  _decorateRelationshipsAsResourceObjectIdentifiers (relationships) {
    let result = {};

    for(var type in relationships){
      let data = relationships[type].data;

      if(Array.isArray(data)){
        data = data.map((relation) => new ResourceObjectIdentifier(relation, this) )
      }else{
        data = new ResourceObjectIdentifier(data, this);
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
