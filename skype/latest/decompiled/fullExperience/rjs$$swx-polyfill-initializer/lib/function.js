(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-polyfill-initializer/lib/function", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n() {
    Object.defineProperty(Function.prototype, "name", {
      get: function () {
        try {
          return this.toString().match(/\s*function\s+([_\$\w\d]*)\.*/)[1];
        } catch (e) {
          return "";
        }
      }
    });
  }
  t.polyfillFunctionName = n;
}));
