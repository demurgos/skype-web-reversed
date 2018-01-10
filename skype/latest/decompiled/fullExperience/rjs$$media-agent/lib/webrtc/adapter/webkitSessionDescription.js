(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/adapter/webkitSessionDescription", [
      "require",
      "exports",
      "../../common/userAgentAdapter"
    ], e);
}(function (e, t) {
  function i() {
    var e = [].slice.apply(arguments), t = e[0] && s(e[0].type);
    e.splice(0, t ? 1 : 0, null);
    var i = new (Function.prototype.bind.apply(n["default"].window.RTCSessionDescription, e))(), o = Object.getOwnPropertyDescriptor(n["default"].window.RTCSessionDescription.prototype, "type");
    return Object.defineProperty(i, "type", {
      get: function () {
        return t ? r : o.get.call(i);
      },
      set: function (e) {
        t = s(e);
        t || o.set.call(i, e);
      }
    }), i;
  }
  function s(e) {
    return r === e;
  }
  var n = e("../../common/userAgentAdapter"), r = "rollback";
  t.__esModule = !0;
  t["default"] = {
    build: function () {
      return i;
    }
  };
}));
