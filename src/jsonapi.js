const ResourceObject = require('./ResourceObject.js');
const Included = require('./Included.js');

function JsonApi(obj) {

  this._jsonapi = obj;

  this.getDataAsResourceObjects = function() {
    let data = this._jsonapi.data;

    if(Array.isArray(this._jsonapi.data)){
      data = data.map(function(d){ return new ResourceObject(d); });
    }else{
      data = new ResourceObject(data);
    }

    return data;
  }

  this.getIncluded = function() {
    return new Included(this._jsonapi.included);
  }

  this.flatten = function() {
    let data = this.getDataAsResourceObjects();

    if(Array.isArray(data)){
      return data.map(function(res){
        return res.flatten( this.getIncluded() )
      }.bind(this));
    }else{
      return data.flatten(this.getIncluded());
    }
  }
}

module.exports = JsonApi;
