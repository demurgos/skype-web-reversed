define("ui/contextMenu/items/addParticipants", [
  "require",
  "exports",
  "module",
  "swx-i18n",
  "ui/contextMenu/menuItem"
], function (e, t) {
  function i(e, i) {
    var s = n.fetch({ key: "actionsMenuItem_text_addParticipants" });
    r.call(this, t.TYPE, s, i), this.isEnabled = function () {
      return !e();
    };
  }
  var n = e("swx-i18n").localization, r = e("ui/contextMenu/menuItem");
  i.prototype = Object.create(r.prototype), t.TYPE = "AddParticipantsMenuItem", t.build = function (e, t) {
    return new i(e, t);
  };
})
