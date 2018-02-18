const ResourceObject = require('./ResourceObject.js');

function Included(arr) {

  var _included = arr || [];

  var _history = {};

  var _getKey = (type, id) => (`${type}-${id}`);

  var _index = _included.reduce((mapping, obj) => {
    mapping[_getKey(obj.type, obj.id)] = new ResourceObject(obj);
    return mapping;
  }, {});

  var findResourceObject = (type, id, parent) => {
    var key = _getKey(type, id);

    // Prevents infinite recursive loops
    if(parent){
      let parentKey = _getKey(parent.getType(), parent.getId());
      let historyKey = `${parentKey} => ${key}`;
      // has parent requested child before?
      if(_history.hasOwnProperty(historyKey)){
        return null;
      }else{
        _history[historyKey] = true;
      }
    }

    return _index.hasOwnProperty(key) ? _index[key] : null;
  }

  return {
    findResourceObject: findResourceObject
  }
}

module.exports = Included;
