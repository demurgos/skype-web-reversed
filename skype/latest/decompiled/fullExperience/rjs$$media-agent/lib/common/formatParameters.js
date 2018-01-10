(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/common/formatParameters", [
      "require",
      "exports",
      "./utils"
    ], e);
}(function (e, t) {
  function r(e) {
    var t = {}, r = this;
    this.setIfMissing = function (e, n) {
      r.contains(e) || (t[e] = n);
    };
    this.get = function (e) {
      return t[e];
    };
    this.names = function () {
      return Object.keys(t);
    };
    this.contains = function (e) {
      return t.hasOwnProperty(e);
    };
    this.toString = function () {
      var e = "";
      return n["default"].forOwn(t, function (t, n) {
        e += (e ? ";" : "") + n;
        typeof t != "undefined" && (e += "=" + t);
      }), e;
    };
    (function () {
      e && e.split(";").forEach(function (e) {
        var n = e.split("=");
        t[n[0]] = n[1];
      });
    }());
  }
  var n = e("./utils");
  t.__esModule = !0;
  t["default"] = {
    build: function (e) {
      return new r(e);
    }
  };
}));
