define("jSkype/root", [
  "require",
  "exports",
  "module",
  "jSkype/application",
  "jskype-settings-instance"
], function (e, t) {
  var n = e("jSkype/application"), r = e("jskype-settings-instance");
  t.Application = n;
  t.version = r.version;
});
