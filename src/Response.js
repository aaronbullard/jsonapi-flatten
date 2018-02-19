import ResourceObject from './ResourceObject.js'
import Included from './Included.js'

export default class Response {

  constructor (response) {
    this._jsonapi = response;
    this._included = new Included(this._jsonapi.included);
  }

  _getDataAsResourceObjects () {
    let data = this._jsonapi.data;

    if(Array.isArray(this._jsonapi.data)){
      data = data.map( d => new ResourceObject(d));
    }else{
      data = new ResourceObject(data);
    }

    return data;
  }

  flatten () {
    let data = this._getDataAsResourceObjects();

    if(Array.isArray(data)){
      return data.map(resObj => resObj.flatten( this._included ));
    }else{
      return data.flatten( this._included );
    }
  }
}
