const ResourceObject = require('./ResourceObject.js');

function Included(arr) {

  var _included = arr || [];

  var _getKey = (type, id) => (`${type}-${id}`);

  var _index = _included.reduce((mapping, obj) => {
    mapping[_getKey(obj.type, obj.id)] = new ResourceObject(obj);
    return mapping;
  }, {});

  var findResourceObject = (type, id) => {
    let key = _getKey(type, id);

    return _index.hasOwnProperty(key) ? _index[key] : null;
  }

  return {
    findResourceObject: findResourceObject
  }
}

module.exports = Included;
