define("ui/viewModels/me/presencePopup", [
  "require",
  "vendor/knockout",
  "swx-utils-common",
  "swx-constants",
  "swx-cafe-application-instance",
  "swx-enums",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionSources",
  "swx-service-locator-instance",
  "utils/common/eventMixin",
  "browser/document",
  "swx-focus-handler",
  "lodash-compat",
  "utils/common/outsideClickHandler"
], function (e) {
  function d(e) {
    function m() {
      n.execute(function () {
        h.isOpened(!1);
      });
      p.remove("PresencePopup");
      c.get().addFocusRequestToQueue(f);
    }
    function g(t) {
      !h.isOpened() && e.key === t && (f = l.activeElement, p.add("PresencePopup", m), h.isOpened(!0));
    }
    function y() {
      h.currentStatus(d.status());
    }
    var f, h = this, d = i.get().personsAndGroupsManager.mePerson, v = a.resolve(r.serviceLocator.ACTION_TELEMETRY);
    h.isOpened = t.observable(!1);
    h.currentStatus = t.observable(d.status());
    h.presenceStatuses = [
      {
        status: s.onlineStatus.Online,
        l10nKey: "message_text_presenceOnline",
        cssClass: "PresencePopup-status--online"
      },
      {
        status: s.onlineStatus.Away,
        l10nKey: "message_text_presenceAway",
        cssClass: "PresencePopup-status--idle"
      },
      {
        status: s.onlineStatus.DoNotDisturb,
        l10nKey: "message_text_presenceDoNotDisturb",
        cssClass: "PresencePopup-status--dnd"
      },
      {
        status: s.onlineStatus.Hidden,
        l10nKey: "message_text_presenceHidden",
        cssClass: "PresencePopup-status--hidden"
      }
    ];
    h.updateStatus = function (t) {
      var n = h.presenceStatuses[t].status, r = d.status();
      return n !== r && (d.status(n), v.recordAction(o.me.presenceChanged, {
        source: u.me.area,
        pickerVersion: "threeState",
        oldStatus: r,
        newStatus: n,
        meExpanded: e.key === "Me-expanded"
      }), m()), !0;
    };
    h.getPresenceStatusCssClasses = function (e) {
      var t = "PresencePopup-status popup-select-option " + h.presenceStatuses[e].cssClass;
      return h.currentStatus() === h.presenceStatuses[e].status && (t += " popup-select-option--selected"), t;
    };
    h.init = function () {
      d.status.changed(y);
      h.registerEvent(r.events.me.PRESENCE_POPUP_SHOW, g);
    };
    h.dispose = function () {
      d.status.changed.off(y);
    };
  }
  var t = e("vendor/knockout"), n = e("swx-utils-common").async, r = e("swx-constants").COMMON, i = e("swx-cafe-application-instance"), s = e("swx-enums"), o = e("ui/telemetry/actions/actionNames"), u = e("ui/telemetry/actions/actionSources"), a = e("swx-service-locator-instance").default, f = e("utils/common/eventMixin"), l = e("browser/document"), c = e("swx-focus-handler"), h = e("lodash-compat"), p = e("utils/common/outsideClickHandler");
  return d.build = function (e, t) {
    return new d(e, t);
  }, h.assign(d.prototype, f), d;
});
