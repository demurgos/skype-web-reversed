define("ui/viewModels/chat/moreActionsButton", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "vendor/knockout",
  "constants/common",
  "utils/common/eventMixin",
  "swx-i18n",
  "ui/contextMenu/items/all",
  "services/serviceLocator",
  "ui/telemetry/actions/actionNames"
], function (e, t) {
  function l(e) {
    function n() {
      var e = a.resolve(i.serviceLocator.ACTION_TELEMETRY);
      e.recordAction(f.conversation.moreActionsButton);
    }
    var t = this;
    t.cssClass = e.cssClass, t.tabIndex = e.tabIndex, t.title = o.fetch({ key: "button_text_moreActions" }), t.showMenuOptions = r.observable(!1), t.hasMenuOptions = function () {
      return !0;
    }, t.getMenuOptions = function () {
      var t = [];
      return n(), t.push(u.AddParticipantsMenuItem.build(e.addParticipantsDisabled, e.addParticipantsAction)), t.push(u.ScheduleCallMenuItem.build(e.conversation)), t;
    };
  }
  var n = e("lodash-compat"), r = e("vendor/knockout"), i = e("constants/common"), s = e("utils/common/eventMixin"), o = e("swx-i18n").localization, u = e("ui/contextMenu/items/all"), a = e("services/serviceLocator"), f = e("ui/telemetry/actions/actionNames");
  n.assign(l.prototype, s), t.build = function (e) {
    return new l(e);
  };
})
