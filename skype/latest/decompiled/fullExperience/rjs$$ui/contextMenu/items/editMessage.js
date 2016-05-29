define("ui/contextMenu/items/editMessage", [
  "require",
  "swx-i18n",
  "ui/contextMenu/menuItem",
  "swx-enums",
  "constants/common"
], function (e) {
  function s(e, o) {
    function a() {
      e.dispatchEvent(i.message.EDIT, o, e.DIRECTION.PARENT);
    }
    if (!e || !o)
      throw new Error("Parameter missing: context and message are required");
    var u = t.fetch({ key: "chatLogmenuItem_text_edit" });
    n.call(this, s.TYPE, u, a);
    this.isEnabled = function () {
      var e = o.status() === r.activityStatus.Succeeded, t = o.html && o.html.set.enabled() && o.text && o.type() !== r.activityType.SystemMessage;
      return !!e && !!t;
    };
  }
  var t = e("swx-i18n").localization, n = e("ui/contextMenu/menuItem"), r = e("swx-enums"), i = e("constants/common").events;
  return s.prototype = Object.create(n.prototype), s.TYPE = "EditMessageMenuItem", s;
});
