define("jSkype/services/people/main", [
  "require",
  "exports",
  "module",
  "jSkype/services/people/facade"
], function (e, t) {
  var n = e("jSkype/services/people/facade"), r;
  t.getInstance = function (t, i) {
    return r || (r = n.build(t, i)), r;
  };
});
