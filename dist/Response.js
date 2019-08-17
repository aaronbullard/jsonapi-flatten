"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ResourceObject = _interopRequireDefault(require("./ResourceObject.js"));

var _Included = _interopRequireDefault(require("./Included.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Response =
/*#__PURE__*/
function () {
  function Response(response) {
    _classCallCheck(this, Response);

    this._jsonapi = response;
    this._included = new _Included["default"](this._jsonapi.included);
  }

  _createClass(Response, [{
    key: "_getDataAsResourceObjects",
    value: function _getDataAsResourceObjects() {
      var data = this._jsonapi.data;

      if (Array.isArray(this._jsonapi.data)) {
        data = data.map(function (d) {
          return new _ResourceObject["default"](d);
        });
      } else {
        data = new _ResourceObject["default"](data);
      }

      return data;
    }
  }, {
    key: "flatten",
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

exports["default"] = Response;