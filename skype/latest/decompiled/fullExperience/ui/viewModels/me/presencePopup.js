define("ui/viewModels/me/presencePopup", [
  "require",
  "vendor/knockout",
  "utils/common/async",
  "constants/common",
  "cafe/applicationInstance",
  "swx-enums",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionSources",
  "services/serviceLocator",
  "utils/common/eventMixin",
  "lodash-compat",
  "utils/common/outsideClickHandler"
], function (e) {
  function h(e) {
    function p() {
      n.execute(function () {
        f.isOpened(!1);
      }), c.remove("PresencePopup");
    }
    function d(t) {
      !f.isOpened() && e.key === t && (c.add("PresencePopup", p), f.isOpened(!0));
    }
    function v() {
      f.currentStatus(l.status());
    }
    var f = this, l = i.get().personsAndGroupsManager.mePerson, h = a.resolve(r.serviceLocator.ACTION_TELEMETRY);
    f.isOpened = t.observable(!1), f.currentStatus = t.observable(l.status()), f.presenceStatuses = [
      {
        status: s.onlineStatus.Online,
        l10nKey: "message_text_presenceAvailable",
        cssClass: "PresencePopup-status--available"
      },
      {
        status: s.onlineStatus.Busy,
        l10nKey: "message_text_presenceBusy",
        cssClass: "PresencePopup-status--busy"
      },
      {
        status: s.onlineStatus.Hidden,
        l10nKey: "message_text_presenceNotAvailable",
        cssClass: "PresencePopup-status--hidden"
      }
    ], f.updateStatus = function (t) {
      var n = f.presenceStatuses[t].status, r = l.status();
      return n !== r && (l.status(n), h.recordAction(o.me.presenceChanged, {
        source: u.me.area,
        pickerVersion: "threeState",
        oldStatus: r,
        newStatus: n,
        meExpanded: e.key === "Me-expanded"
      }), p()), !0;
    }, f.getPresenceStatusCssClasses = function (e) {
      var t = "PresencePopup-status " + f.presenceStatuses[e].cssClass;
      return f.currentStatus() === f.presenceStatuses[e].status && (t += " PresencePopup-status--selected"), t;
    }, f.init = function () {
      l.status.changed(v), f.registerEvent(r.events.me.PRESENCE_POPUP_SHOW, d);
    }, f.dispose = function () {
      l.status.changed.off(v);
    };
  }
  var t = e("vendor/knockout"), n = e("utils/common/async"), r = e("constants/common"), i = e("cafe/applicationInstance"), s = e("swx-enums"), o = e("ui/telemetry/actions/actionNames"), u = e("ui/telemetry/actions/actionSources"), a = e("services/serviceLocator"), f = e("utils/common/eventMixin"), l = e("lodash-compat"), c = e("utils/common/outsideClickHandler");
  return h.build = function (e, t) {
    return new h(e, t);
  }, l.assign(h.prototype, f), h;
})
