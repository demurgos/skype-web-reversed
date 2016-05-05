define("jSkype/services/entitlement/main", [
  "require",
  "exports",
  "module",
  "jSkype/services/entitlement/facade"
], function (e, t) {
  var n = e("jSkype/services/entitlement/facade"), r;
  t.getInstance = function (t, i) {
    return r || (r = new n(t, i)), r;
  };
})
