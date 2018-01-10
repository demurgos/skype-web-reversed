(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-polyfill-initializer/lib/polyfillInitializer", [
      "require",
      "exports",
      "./string",
      "./function",
      "es6-promise",
      "blueimp-canvas-to-blob"
    ], e);
}(function (e, t) {
  var n = e("./string"), r = e("./function"), i = e("es6-promise");
  e("blueimp-canvas-to-blob");
  i.polyfill();
  String.prototype.localeCompare === undefined && (String.prototype.localeCompare = n.localeCompare);
  Function.prototype.name === undefined && r.polyfillFunctionName();
}));
