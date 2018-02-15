function ResourceObjectIdentifier(obj) {

  this._identifier = obj;

  this.getType = function() {
    return this._identifier.type;
  }

  this.getId = function() {
    return this._identifier.id;
  }

  this.flatten = function(included) {
    try{
      return included.findResourceObject(this.getType(), this.getId())
                     .flatten(included);
    }catch(e){
      return this._identifier;
    }
  }
}

module.exports = ResourceObjectIdentifier;
