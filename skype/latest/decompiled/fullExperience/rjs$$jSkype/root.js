define("jSkype/root", [
  "require",
  "exports",
  "module",
  "jSkype/application",
  "jSkype/settings"
], function (e, t) {
  var n = e("jSkype/application"), r = e("jSkype/settings");
  t.Application = n;
  t.version = r.version;
});
