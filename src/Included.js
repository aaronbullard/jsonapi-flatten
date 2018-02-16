const ResourceObject = require('./ResourceObject.js');

function Included(arr) {

  var _included = arr || [];

  var _mapped = [];

  var _cache = {};

  var _cacheCount = {};

  var _getIncluded = () => {
    if(!_mapped.length){
      _mapped = _included.map(resobj => new ResourceObject(resobj));
    }

    return _mapped;
  }

  var _getKey = (type, id) => (`${type}-${id}`);

  var _cacheFindOrCreate = (key, callable) => {
    if(!_cache.hasOwnProperty(key)){
      _cache[key] = callable();
    }

    return _cache[key];
  }

  var findResourceObject = (type, id) => {
    return _cacheFindOrCreate(_getKey(type, id), () => {
      return _getIncluded().find((resource) => {
        return resource.getType() == type && resource.getId() == id;
      });
    });
  }

  return {
    findResourceObject: findResourceObject
  }
}

module.exports = Included;
