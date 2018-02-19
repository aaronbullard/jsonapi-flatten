import ResourceObject from './ResourceObject.js'

export default class Included
{
  constructor (arr) {
    this._included = arr || [];

    this._history = {};

    this._index = this._included.reduce((mapping, obj) => {
      mapping[this._getKey(obj.type, obj.id)] = new ResourceObject(obj);
      return mapping;
    }, {});
  }

  _getKey (type, id) {
    return (`${type}-${id}`);
  }

  findResourceObject (type, id, parent) {
    var key = this._getKey(type, id);

    // Prevents infinite recursive loops
    if(parent){
      let parentKey = this._getKey(parent.getType(), parent.getId());
      let historyKey = `${parentKey} => ${key}`;
      // has parent requested child before?
      if(this._history.hasOwnProperty(historyKey)){
        return null;
      }else{
        this._history[historyKey] = true;
      }
    }

    return this._index.hasOwnProperty(key) ? this._index[key] : null;
  }
}
