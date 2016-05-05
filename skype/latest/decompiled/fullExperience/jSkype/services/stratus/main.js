define("jSkype/services/stratus/main", [
  "require",
  "exports",
  "module",
  "jSkype/services/stratus/facade"
], function (e, t) {
  var n = e("jSkype/services/stratus/facade"), r;
  t.getInstance = function (e, t) {
    return r || (r = new n(e, t)), r;
  };
})
