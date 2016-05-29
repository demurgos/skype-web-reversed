define("jSkype/services/electron", [
  "require",
  "exports",
  "module",
  "browser/window"
], function (e, t) {
  var n = e("browser/window");
  t.getSkypeModule = function () {
    return n.Skype.getSkypeModule();
  };
  t.registerPresence = function (e, t) {
    return n.Skype.registerPresence(e, t);
  };
});
