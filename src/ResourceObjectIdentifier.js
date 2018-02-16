function ResourceObjectIdentifier(obj) {

  var _identifier = obj;

  var getType = () => _identifier.type;

  var getId = () => _identifier.id;

  var getIdentifier = () => _identifier;

  var flatten = (included) => {
    try{
      return included.findResourceObject(getType(), getId())
                     .flatten(included);
    }catch(e){
      return _identifier;
    }
  }

  return {
    getType: getType,
    getId: getId,
    flatten: flatten
  }
}


module.exports = ResourceObjectIdentifier;
