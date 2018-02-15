const ResourceObject = require('./ResourceObject.js');

function Included(arr) {

  this._included = arr || [];

  this.getIncluded = function() {
    return this._included.map(function(resobj){
      return new ResourceObject(resobj);
    });
  }

  this.findResourceObject = function(type, id) {
    return this.getIncluded().find(function(resource){
      return resource.getType() == type && resource.getId() == id;
    });
  }
}

module.exports = Included;
