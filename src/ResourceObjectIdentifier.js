function ResourceObjectIdentifier(obj, parent) {

  var _identifier = obj;

  var _parent = parent;

  var getType = () => _identifier.type;

  var getId = () => _identifier.id;

  var flatten = (included) => {
    let object = included.findResourceObject(getType(), getId(), _parent);

    return object == null
                ? {_id: getId(), _type: getType()}
                : object.flatten(included);
  }

  return {
    getType: getType,
    getId: getId,
    flatten: flatten
  }
}


module.exports = ResourceObjectIdentifier;
