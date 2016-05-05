define("ui/components/registrar", [
  "require",
  "exports",
  "module",
  "vendor/knockout"
], function (e, t) {
  var n = e("vendor/knockout");
  t.register = function (e) {
    e.forEach(function (e) {
      n.components.isRegistered(e.name) || n.components.register(e.name, e);
    });
  };
})
