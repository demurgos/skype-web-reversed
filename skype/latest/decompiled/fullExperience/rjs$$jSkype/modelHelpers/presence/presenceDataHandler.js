define("jSkype/modelHelpers/presence/presenceDataHandler", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/client",
  "constants/common",
  "jSkype/services/webapi/constants",
  "jSkype/constants/people",
  "swx-enums",
  "jSkype/settings",
  "jSkype/services/serviceFactory",
  "jSkype/modelHelpers/presence/presenceDataStorage",
  "jSkype/modelHelpers/presence/presenceMapper",
  "jSkype/modelHelpers/contacts/dataMappers/dataMaps",
  "jSkype/modelHelpers/personHelper",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/models/person"
], function (e, t) {
  function m() {
    var e = !0, t = {
        serviceStarted: !1,
        sendContacts: null
      };
    this.onInitialContacts = function (e) {
      t.serviceStarted ? y(e) : t.sendContacts = g(y, e);
    };
    this.onMePresenceSet = function (e) {
      if (e.selfLink && e.status) {
        var t = r.get()._telemetryManager, n = {
            name: i.telemetry.presence.name.SET_ME_PRESENCE,
            presence: e.status
          };
        t.sendEvent(a.settings.telemetry.jSkypeTenantToken, i.telemetry.presence.TYPE, n);
      }
    };
    this.onSelfProperties = function (e) {
      var t = r.get().personsAndGroupsManager, n = t.mePerson, i = e.primaryMemberName, s = e.skypeName;
      if (!s || !i)
        return;
      s !== i && n._msaId._set(p.getKey(i, h.contactTypes.msn));
    };
    this.onPresence = function (e) {
      if (e.selfLink && e.status) {
        var t = E(e.selfLink), n = p.getId(t), r = N(e), i = C(r);
        k(t) ? S(e.status) : x(n, e.status, e.lastSeenAt, i);
      }
    };
    this.onBatchPresenceUpdated = function (t) {
      if (t && e) {
        var n = r.get()._telemetryManager, s = {
            name: i.telemetry.presence.name.GET_CONTACTS_PRESENCE,
            batchCount: t
          };
        n.sendEvent(a.settings.telemetry.jSkypeTenantToken, i.telemetry.presence.TYPE, s);
        e = !1;
      }
    };
    this.onServiceError = function (e) {
      e.actionName === s.SERVICE_CALLS.SET_USER_PRESENCE && S(u.onlineStatus.Hidden);
    };
    this.onServiceStarted = function () {
      t.serviceStarted = !0;
      t.sendContacts && t.sendContacts();
    };
    this.onOnlineStateChanged = function (e) {
      var t = r.get().personsAndGroupsManager, n = t.all.persons(), s = t.mePerson;
      e === i.onlineStates.OFFLINE ? (s.status._set(u.onlineStatus.Hidden), n.forEach(function (e) {
        !p.isPstn(e) && e.status() !== u.onlineStatus.Unknown && e.status._set(u.onlineStatus.Hidden);
      })) : e === i.onlineStates.ONLINE && l.getCache().restore(t);
    };
  }
  function g(e, t) {
    return function () {
      e(t);
    };
  }
  function y(e) {
    if (!a.isFeatureOn(i.featureFlags.DO_NOT_SEND_CONTACTS_TO_CHAT_SERVICE)) {
      var t = n.filter(e, b);
      if (t.length > 0) {
        var r = f.getPresenceService();
        r.sendContactsList(t);
      }
    }
  }
  function b(e) {
    return w(e) || (e = d.getPersonById(e.id())), !!e && p.canAddToChatServiceContactList(e);
  }
  function w(e) {
    return e instanceof v;
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
    var i = d.getPersonById(e);
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
    return e && !t.isAgent() && !p.isPstn(t) && !p.isEchoContact(t);
  }
  function N(e) {
    var t = e.capabilities;
    return t ? t.split("|").map(function (e) {
      return e.toLowerCase().trim();
    }) : [];
  }
  function C(e) {
    var t = o.endpoints.MOBILE.toLowerCase();
    return e.indexOf(t) !== -1 ? u.endpointType.Mobile : u.endpointType.Desktop;
  }
  function k(e) {
    var t = r.get().personsAndGroupsManager.mePerson, n = p.getKey(t.id());
    return e === n || e === t._msaId();
  }
  var n = e("lodash-compat"), r = e("jSkype/client"), i = e("constants/common"), s = e("jSkype/services/webapi/constants"), o = e("jSkype/constants/people"), u = e("swx-enums"), a = e("jSkype/settings"), f = e("jSkype/services/serviceFactory"), l = e("jSkype/modelHelpers/presence/presenceDataStorage"), c = e("jSkype/modelHelpers/presence/presenceMapper"), h = e("jSkype/modelHelpers/contacts/dataMappers/dataMaps"), p = e("jSkype/modelHelpers/personHelper"), d = e("jSkype/modelHelpers/personsAndGroupsHelper"), v = e("jSkype/models/person");
  t.build = function () {
    return new m();
  };
});
