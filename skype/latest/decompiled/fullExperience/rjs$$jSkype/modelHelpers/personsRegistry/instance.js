define("jSkype/modelHelpers/personsRegistry/instance", [
  "require",
  "exports",
  "module",
  "jSkype/modelHelpers/personsRegistry/registry"
], function (e, t) {
  var n = e("jSkype/modelHelpers/personsRegistry/registry"), r;
  t.reset = function () {
    r && (r.dispose(), r = null);
  };
  t.build = function () {
    return r || (r = new n()), r;
  };
});
