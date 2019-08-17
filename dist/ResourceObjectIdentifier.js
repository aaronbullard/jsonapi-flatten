"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ResourceObjectIdentifier =
/*#__PURE__*/
function () {
  function ResourceObjectIdentifier(obj, parent) {
    _classCallCheck(this, ResourceObjectIdentifier);

    this._identifier = obj;
    this._parent = parent;
  }

  _createClass(ResourceObjectIdentifier, [{
    key: "getType",
    value: function getType() {
      return this._identifier.type;
    }
  }, {
    key: "getId",
    value: function getId() {
      return this._identifier.id;
    }
  }, {
    key: "flatten",
    value: function flatten(included) {
      try {
        var object = included.findResourceObject(this.getType(), this.getId(), this._parent);
        return object == null ? {
          _id: this.getId(),
          _type: this.getType()
        } : object.flatten(included);
      } catch (e) {
        return null;
      }
    }
  }]);

  return ResourceObjectIdentifier;
}();

exports["default"] = ResourceObjectIdentifier;