'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ResourceObject = require('./ResourceObject.js');

var _ResourceObject2 = _interopRequireDefault(_ResourceObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Included = function () {
  function Included(arr) {
    var _this = this;

    _classCallCheck(this, Included);

    this._included = arr || [];

    this._history = {};

    this._index = this._included.reduce(function (mapping, obj) {
      mapping[_this._getKey(obj.type, obj.id)] = new _ResourceObject2.default(obj);
      return mapping;
    }, {});
  }

  _createClass(Included, [{
    key: '_getKey',
    value: function _getKey(type, id) {
      return type + '-' + id;
    }
  }, {
    key: 'findResourceObject',
    value: function findResourceObject(type, id, parent) {
      var key = this._getKey(type, id);

      // Prevents infinite recursive loops
      if (parent) {
        var parentKey = this._getKey(parent.getType(), parent.getId());
        var historyKey = parentKey + ' => ' + key;
        // has parent requested child before?
        if (this._history.hasOwnProperty(historyKey)) {
          return null;
        } else {
          this._history[historyKey] = true;
        }
      }

      return this._index.hasOwnProperty(key) ? this._index[key] : null;
    }
  }]);

  return Included;
}();

exports.default = Included;