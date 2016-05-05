define("jSkype/services/contacts/main", [
  "require",
  "exports",
  "module",
  "jSkype/services/contacts/facade"
], function (e, t) {
  var n = e("jSkype/services/contacts/facade"), r;
  t.getInstance = function (t, i, s) {
    return r || (r = new n(t, i, s), r.init()), r;
  };
})
