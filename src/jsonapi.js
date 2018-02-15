const JsonAPI = {};

JsonAPI.flattenAttributes = function(object) {
    return Object.assign({id: object.id}, object.attributes);
}

JsonAPI.appendAttributesToRelationship = function(relationship, includes){
    let attributes = this.findIncluded(includes, relationship.type, relationship.id).attributes;

    relationship.attributes = attributes;

    return relationship;
}

JsonAPI.appendAttributesToRelationships = function(relationships, includes){
    // Loop through each relationship
    for(var type in relationships){
        // is data an instance or array
        if(Array.isArray(relationships[type].data)){
            relationships[type].data = relationships[type].data.map((relationship) => {
                return this.appendAttributesToRelationship(relationship, includes);
            });
        }else{
            relationships[type].data = this.appendAttributesToRelationship(relationships[type].data, includes);
        }
    }

    return relationships;
}

JsonAPI.findIncluded = function(includes, type, id){
    for(let x in includes){
        if(includes[x].type == type && includes[x].id == id){
            return includes[x];
        }
    }
}

JsonAPI.normalize = function(entity, includes) {
    // for each entities relationships
    // 1) hydrate with attributes
    let hydrated_relationships = this.appendAttributesToRelationships(entity.relationships, includes);

    // 2) flatten relationships
    let flatten_relationships = {};
    for(let type in hydrated_relationships){
      let data = hydrated_relationships[type].data;
      if(Array.isArray(data)){
        data = data.map(this.flattenAttributes)
      }else{
        data = this.flattenAttributes(data)
      }

      flatten_relationships[type] = data;
    }

    // Append relationships to entities
    let normalized = Object.assign(this.flattenAttributes(entity), flatten_relationships)

    return normalized;
}

module.exports = JsonAPI
