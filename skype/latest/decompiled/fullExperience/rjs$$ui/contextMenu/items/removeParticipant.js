define("ui/contextMenu/items/removeParticipant", [
  "require",
  "swx-i18n",
  "ui/contextMenu/menuItem"
], function (e) {
  function r(e, i) {
    function o() {
      e.participants.remove(i);
    }
    if (!e || !i)
      throw new Error("Parameter missing: conversation and participant are required");
    var s = t.fetch({ key: "label_text_headerMenuRemoveGroup" });
    n.call(this, r.TYPE, s, o);
    this.isEnabled = function () {
      return e.participants.remove.enabled();
    };
  }
  var t = e("swx-i18n").localization, n = e("ui/contextMenu/menuItem");
  return r.prototype = Object.create(n.prototype), r.TYPE = "RemoveParticipantMenuItem", r;
});
