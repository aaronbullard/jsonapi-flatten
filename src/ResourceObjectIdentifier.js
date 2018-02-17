function ResourceObjectIdentifier(obj) {

  var _identifier = obj;

  var getType = () => _identifier.type;

  var getId = () => _identifier.id;

  var getIdentifier = () => _identifier;

  var flatten = (included) => {
    let object = included.findResourceObject(getType(), getId());

    return object == null
                ? {_type: getType(), _id: getId()}
                : object.flatten(included);
  }

  return {
    getType: getType,
    getId: getId,
    flatten: flatten
  }
}


module.exports = ResourceObjectIdentifier;
