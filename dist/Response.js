'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ResourceObject = require('./ResourceObject.js');

var _ResourceObject2 = _interopRequireDefault(_ResourceObject);

var _Included = require('./Included.js');

var _Included2 = _interopRequireDefault(_Included);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Response = function () {
  function Response(response) {
    _classCallCheck(this, Response);

    this._jsonapi = response;
    this._included = new _Included2.default(this._jsonapi.included);
  }

  _createClass(Response, [{
    key: '_getDataAsResourceObjects',
    value: function _getDataAsResourceObjects() {
      var data = this._jsonapi.data;

      if (Array.isArray(this._jsonapi.data)) {
        data = data.map(function (d) {
          return new _ResourceObject2.default(d);
        });
      } else {
        data = new _ResourceObject2.default(data);
      }

      return data;
    }
  }, {
    key: 'flatten',
    value: function flatten() {
      var _this = this;

      var data = this._getDataAsResourceObjects();

      if (Array.isArray(data)) {
        return data.map(function (resObj) {
          return resObj.flatten(_this._included);
        });
      } else {
        return data.flatten(this._included);
      }
    }
  }]);

  return Response;
}();

exports.default = Response;