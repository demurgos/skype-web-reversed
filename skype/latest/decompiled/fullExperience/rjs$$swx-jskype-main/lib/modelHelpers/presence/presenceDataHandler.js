(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/presence/presenceDataHandler", [
      "require",
      "exports",
      "lodash-compat",
      "swx-jskype-internal-application-instance",
      "swx-constants",
      "swx-chat-service/lib/constants",
      "jskype-constants",
      "swx-enums",
      "jskype-settings-instance",
      "../../services/serviceFactory",
      "./presenceDataStorage",
      "../../modelHelpers/presence/presenceMapper",
      "../../modelHelpers/personHelper",
      "../personsAndGroupsHelper",
      "swx-mri/lib/mriMaps",
      "swx-mri"
    ], e);
}(function (e, t) {
  function m() {
    return new g();
  }
  function y(e, t) {
    return function () {
      e(t);
    };
  }
  function b(e) {
    if (!a.isFeatureOn(i.COMMON.featureFlags.DO_NOT_SEND_CONTACTS_TO_CHAT_SERVICE)) {
      var t = n.filter(e, w);
      if (t.length > 0) {
        var r = f.getPresenceService(), s = n.map(t, function (e) {
            return v.getKey(e.id(), e._type());
          });
        r.sendContactsList(s);
      }
    }
  }
  function w(e) {
    return !!e && h.canAddToChatServiceContactList(e);
  }
  function E(e) {
    var t = /\/users\/(.+)\/presenceDocs/, n = e.match(t);
    return n && n[1];
  }
  function S(e) {
    var t = r.get().personsAndGroupsManager.mePerson, n;
    c.canMapToOnline(e) ? t.status(u.onlineStatus.Online) : (n = c.mapToSelf(e), t.status._set(n), l.getCache().set(t.id(), { status: n }));
  }
  function x(e, t, n, r) {
    var i = p.getPersonById(e);
    if (i) {
      var s = c.map(t);
      T(s, i) && i.status._set(s);
      i.endpointType._set(r);
      i.lastSeenAt(n);
      l.getCache().set(e, {
        status: s,
        lastSeenAt: n,
        endpointType: r
      });
    }
  }
  function T(e, t) {
    return e && !t.isAgent() && !h.isPstn(t) && !h.isEchoContact(t);
  }
  function N(e) {
    var t = e.capabilities;
    return t ? t.split("|").map(function (e) {
      return e.toLowerCase().trim();
    }) : [];
  }
  function C(e) {
    var t = o.PEOPLE.endpoints.MOBILE.toLowerCase();
    return e.indexOf(t) !== -1 ? u.endpointType.Mobile : u.endpointType.Desktop;
  }
  function k(e) {
    var t = r.get().personsAndGroupsManager.mePerson, n = v.getKey(t.id());
    return e === n || e === t._msaId();
  }
  var n = e("lodash-compat"), r = e("swx-jskype-internal-application-instance"), i = e("swx-constants"), s = e("swx-chat-service/lib/constants"), o = e("jskype-constants"), u = e("swx-enums"), a = e("jskype-settings-instance"), f = e("../../services/serviceFactory"), l = e("./presenceDataStorage"), c = e("../../modelHelpers/presence/presenceMapper"), h = e("../../modelHelpers/personHelper"), p = e("../personsAndGroupsHelper"), d = e("swx-mri/lib/mriMaps"), v = e("swx-mri");
  t.build = m;
  var g = function () {
    function e() {
      this.onMePresenceSet = function (e) {
        if (e.selfLink && e.status) {
          var t = r.get()._telemetryManager, n = {
              name: i.COMMON.telemetry.presence.name.SET_ME_PRESENCE,
              presence: e.status
            };
          t.sendEvent(a.settings.telemetry.jSkypeTenantToken, i.COMMON.telemetry.presence.TYPE, n);
        }
      };
      this.onSelfProperties = function (e) {
        var t = r.get().personsAndGroupsManager, n = t.mePerson, i = e.primaryMemberName, s = e.skypeName;
        if (!s || !i)
          return;
        s !== i && n._msaId._set(v.getKey(i, d.contactMriTypes.msn));
      };
      this.onPresence = function (e) {
        if (e.selfLink && e.status) {
          var t = E(e.selfLink), n = v.getId(t), r = N(e), i = C(r);
          k(t) ? S(e.status) : x(n, e.status, e.lastSeenAt, i);
        }
      };
      this.onServiceError = function (e) {
        e.actionName === s.SERVICE_CALLS.SET_USER_PRESENCE && S(u.onlineStatus.Hidden);
      };
      this.onOnlineStateChanged = function (e) {
        var t = r.get().personsAndGroupsManager, n = t.all.persons(), s = t.mePerson;
        e === i.COMMON.onlineStates.OFFLINE ? (s.status._set(u.onlineStatus.Hidden), n.forEach(function (e) {
          !h.isPstn(e) && e.status() !== u.onlineStatus.Unknown && e.status._set(u.onlineStatus.Hidden);
        })) : e === i.COMMON.onlineStates.ONLINE && l.getCache().restore();
      };
      var e = !0, t = {
          serviceStarted: !1,
          sendContacts: null
        };
      this.onInitialContacts = function (e) {
        t.serviceStarted ? b(e) : t.sendContacts = y(b, e);
      };
      this.onBatchPresenceUpdated = function (t) {
        if (t && e) {
          var n = r.get()._telemetryManager, s = {
              name: i.COMMON.telemetry.presence.name.GET_CONTACTS_PRESENCE,
              batchCount: t
            };
          n.sendEvent(a.settings.telemetry.jSkypeTenantToken, i.COMMON.telemetry.presence.TYPE, s);
          e = !1;
        }
      };
      this.onServiceStarted = function () {
        t.serviceStarted = !0;
        t.sendContacts && t.sendContacts();
      };
    }
    return e;
  }();
}));
