(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("trouter-client/lib/index", [
      "require",
      "exports",
      "./trouterclient"
    ], e);
}(function (e) {
  return e("./trouterclient"), function () {
    return this.trouter;
  }.call();
}));
