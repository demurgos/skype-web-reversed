(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-common/lib/builderMixin", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function r() {
    return r.prototype;
  }
  var n = e("lodash-compat");
  r.prototype = {
    build: function () {
      var e = Object.create(this.prototype);
      return this.apply(e, arguments) || e;
    }
  };
  n.assign(r, r.prototype);
  var i = r;
  return i;
}));
