define("ui/contextMenu/items/avSettings", [
  "require",
  "exports",
  "module",
  "swx-i18n",
  "ui/contextMenu/menuItem"
], function (e, t) {
  function i(e, i) {
    r.call(this, t.TYPE, n.fetch({ key: "callscreen_text_showAVSettings" }), i);
    this.isEnabled = function () {
      return !e();
    };
  }
  var n = e("swx-i18n").localization, r = e("ui/contextMenu/menuItem");
  i.prototype = Object.create(r.prototype);
  t.TYPE = "AVSettingsMenuItem";
  t.build = function (e, t) {
    return new i(e, t);
  };
});
