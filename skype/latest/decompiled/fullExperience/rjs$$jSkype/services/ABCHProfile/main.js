define("jSkype/services/ABCHProfile/main", [
  "require",
  "exports",
  "module",
  "jSkype/services/ABCHProfile/facade"
], function (e, t) {
  var n = e("jSkype/services/ABCHProfile/facade"), r;
  t.getInstance = function (t, i) {
    return r || (r = n.build(t, i)), r;
  };
});
