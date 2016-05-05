define("ui/controls/me/me", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "browser/document",
  "text!views/me/me.html"
], function (e, t) {
  var n = e("vendor/knockout"), r = e("browser/document"), i = e("text!views/me/me.html");
  t.name = "me", t.render = function (e, t) {
    var s = r.createElement("div");
    s.className = "swxMe", s.innerHTML = i, n.applyBindings(null, s), t(s);
  };
})
