define("jSkype/modelHelpers/search/match/singleWord", [
  "require",
  "exports",
  "module",
  "lodash-compat"
], function (e, t) {
  var n = e("lodash-compat");
  t.func = function (e, t) {
    var r = new RegExp(n.escapeRegExp(t), "i");
    return !!e.match(r);
  };
});
