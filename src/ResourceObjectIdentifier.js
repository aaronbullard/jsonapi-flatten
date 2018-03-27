export default class ResourceObjectIdentifier
{
    constructor(obj, parent) {
      this._identifier = obj;
      this._parent = parent;
    }

    getType () {
      return this._identifier.type;
    }

    getId () {
      return this._identifier.id;
    }

    flatten(included) {
      try {
        let object = included.findResourceObject(this.getType(), this.getId(), this._parent);

        return object == null
                    ? {_id: this.getId(), _type: this.getType()}
                    : object.flatten(included);
      }catch(e){
        return null;
      }
    }
}
