define("ui/contextMenu/items/shareScreen", [
  "require",
  "exports",
  "module",
  "swx-i18n",
  "ui/contextMenu/menuItem"
], function (e, t) {
  function i(e, i, s) {
    var o = n.fetch({ key: "callscreen_text_shareScreens" }), u = n.fetch({ key: "callscreen_text_stopSharingScreen" });
    r.call(this, t.TYPE, i ? o : u, s);
    this.isEnabled = function () {
      return !e();
    };
  }
  var n = e("swx-i18n").localization, r = e("ui/contextMenu/menuItem");
  i.prototype = Object.create(r.prototype);
  t.TYPE = "ShareScreenMenuItem";
  t.build = function (e, t, n) {
    return new i(e, t, n);
  };
});
