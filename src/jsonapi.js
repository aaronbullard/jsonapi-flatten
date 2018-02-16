const ResourceObject = require('./ResourceObject.js');
const Included = require('./Included.js');

function JsonApi(obj) {

  var _jsonapi = obj;

  var _included = null;

  var _getDataAsResourceObjects = () => {
    let data = _jsonapi.data;

    if(Array.isArray(_jsonapi.data)){
      data = data.map( d => new ResourceObject(d));
    }else{
      data = new ResourceObject(data);
    }

    return data;
  }

  var _getIncluded = () => {
    if(!_included){
      _included = new Included(_jsonapi.included);
    }

    return _included;
  }

  var flatten = () => {
    let data = _getDataAsResourceObjects();

    if(Array.isArray(data)){
      return data.map(res => res.flatten( _getIncluded() ));
    }else{
      return data.flatten( _getIncluded() );
    }
  }

  return {
    flatten: flatten
  }
}

module.exports = JsonApi;
