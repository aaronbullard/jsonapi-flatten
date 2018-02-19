'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ResourceObjectIdentifier = require('./ResourceObjectIdentifier.js');

var _ResourceObjectIdentifier2 = _interopRequireDefault(_ResourceObjectIdentifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResourceObject = function () {
  function ResourceObject(resource) {
    _classCallCheck(this, ResourceObject);

    this._resource = resource;
  }

  _createClass(ResourceObject, [{
    key: 'getType',
    value: function getType() {
      return this._resource.type;
    }
  }, {
    key: 'getId',
    value: function getId() {
      return this._resource.id;
    }
  }, {
    key: 'getLinks',
    value: function getLinks() {
      return this._resource.hasOwnProperty('links') ? this._resource.links : {};
    }
  }, {
    key: 'getAttributes',
    value: function getAttributes() {
      return this._resource.attributes;
    }
  }, {
    key: 'getRelationships',
    value: function getRelationships() {
      return this._resource.relationships;
    }
  }, {
    key: '_decorateRelationshipsAsResourceObjectIdentifiers',
    value: function _decorateRelationshipsAsResourceObjectIdentifiers(relationships) {
      var _this = this;

      var result = {};

      for (var type in relationships) {
        var data = relationships[type].data;

        if (Array.isArray(data)) {
          data = data.map(function (relation) {
            return new _ResourceObjectIdentifier2.default(relation, _this);
          });
        } else {
          data = new _ResourceObjectIdentifier2.default(data, this);
        }

        result[type] = data;
      }

      return result;
    }
  }, {
    key: 'flatten',
    value: function flatten(included) {
      // Create new object with _id, _type, {...attributes}
      var flat = Object.assign({ _id: this.getId(), _type: this.getType() }, this.getAttributes());

      // Get relationships decorated as
      var relationships = this._decorateRelationshipsAsResourceObjectIdentifiers(this.getRelationships());

      // add relationships
      for (var type in relationships) {
        flat[type] = Array.isArray(relationships[type]) ? relationships[type].map(function (roi) {
          return roi.flatten(included);
        }) : relationships[type].flatten(included);
      }

      return flat;
    }
  }]);

  return ResourceObject;
}();

exports.default = ResourceObject;