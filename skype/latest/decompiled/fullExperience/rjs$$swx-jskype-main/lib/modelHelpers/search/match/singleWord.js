(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/search/match/singleWord", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function r(e, t) {
    var r = new RegExp(n.escapeRegExp(t), "i");
    return !!e.match(r);
  }
  var n = e("lodash-compat");
  t.func = r;
}));
