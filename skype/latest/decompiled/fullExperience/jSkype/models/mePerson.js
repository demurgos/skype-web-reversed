define("jSkype/models/mePerson", [
  "require",
  "jcafe-property-model",
  "jSkype/services/calling/environmentInspector",
  "jSkype/settings",
  "utils/calling/callingStack",
  "jSkype/telemetry/logging/callingLogTracer",
  "jSkype/models/person",
  "jSkype/models/account",
  "jSkype/utils/preferences",
  "swx-enums",
  "constants/common",
  "jSkype/modelHelpers/presence/presenceMapper",
  "jSkype/services/serviceFactory",
  "jSkype/modelHelpers/presence/presenceDataStorage",
  "jSkype/client",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/modelHelpers/meData",
  "jSkype/modelHelpers/contacts/dataHandlers/factory",
  "jSkype/modelHelpers/mePersonSettings"
], function (e) {
  function b(e) {
    function N() {
      var e;
      return function () {
        return e || (e = C()), e;
      };
    }
    function C() {
      var e = g.getUserInfoHandlers();
      return h.getStratusService().getUserInfo().then(e.onSuccess, e.onError);
    }
    function k() {
      r.isFeatureOn(l.featureFlags.CALLING) ? (n.isCallingSupported.changed(function (e, t) {
        s.log("[MePerson] calling support changed", e, t), L(e, t), A(e, t);
      }), O()) : (p.capabilities.audio._set(!1, f.callingNotSupportedReasons.FeatureDisabled), p.capabilities.video._set(!1, f.callingNotSupportedReasons.FeatureDisabled));
    }
    function L(e, t) {
      s.log("[MePerson] set audio capability", e, t), p.capabilities.audio._set(e, t);
    }
    function A(e, t) {
      var n = e, r = t;
      if (i.get().isPluginlessCallingSupported()) {
        var o = Boolean(d.get().devicesManager.selectedCamera());
        e && !o && (r = f.callingNotSupportedReasons.CameraUnavailable), n = e && o;
      }
      s.log("[MePerson] set video capability", n, r), p.capabilities.video._set(n, r);
    }
    function O() {
      i.get().isPluginlessCallingSupported() && d.get().devicesManager.selectedCamera.changed(function () {
        A(n.isCallingSupported(), n.isCallingSupported.reason);
      });
    }
    function M() {
      return i.get().isPluginlessCallingSupported() ? d.get().devicesManager.selectedCamera() : !0;
    }
    function _() {
      return n.isCallingSupported.get().then(function (e) {
        return L(e, n.isCallingSupported.reason), e;
      });
    }
    function D() {
      return n.isCallingSupported.get().then(function (e) {
        return A(e, n.isCallingSupported.reason), Boolean(e && M());
      });
    }
    var p = this, b, S, x, T = N();
    o.call(p, e), p.capabilities.audio = t.property({
      readOnly: !0,
      get: _
    }), p.capabilities.video = t.property({
      readOnly: !0,
      get: D
    }), p._msaId = t.property({ readOnly: !0 }), p.account = new u(), p.id = t.property({
      readOnly: !0,
      value: e,
      get: function () {
        function r() {
          d.get().signInManager._skypeToken().then(function (e) {
            if (e === x) {
              n.resolve(S);
              return;
            }
            x = e;
            try {
              var t = v.extractSkypeIdFromToken(e);
              S = t, p.id._set(t), p.displayName._set(t), n.resolve(t);
            } catch (r) {
              n.reject(r);
            }
          });
        }
        var n = t.task();
        return d.get().signInManager.state.once(f.loginState.SignedIn, r), n.promise;
      }
    }), p.displayName = t.property({
      readOnly: !0,
      value: e,
      get: function () {
        return b || (b = t.task(), p.id.get().then(function () {
          function e() {
            b.resolve(p.displayName());
          }
          m.initialize().then(e, b.reject.bind(b));
        })), b.promise;
      }
    }), p.preferences = t.collection({ readOnly: !0 }), a.build(p.preferences), p.status = t.property({
      value: f.onlineStatus.Offline,
      set: function (r) {
        var i = t.task("setting ME status", r), s = c.toCafeStatus(r);
        return w(s) ? (E(e, s), i.resolve(s)) : i.reject(new Error("new status value was invalid")), i.promise;
      }
    }), p.status.reset = function () {
    }, p._registeredAt = t.property({
      readOnly: !0,
      get: function () {
        var n = t.task();
        return T().then(function () {
          n.resolve(p._registeredAt());
        }, function (e) {
          n.reject(e);
        }), n.promise;
      }
    }), p._settings = y.build(), p.updateAvatar = function (t, n) {
      var r = h.getStratusService();
      return r.updateAvatar(p.id(), t, n);
    }, p.updateAvatarUrl = function (t) {
      p.avatarUrl._set(t);
    }, p.active = t.boolProperty(!0), p._reset = function () {
      p.id._set(e), p.displayName._set(e), b = null, p.status._set(f.onlineStatus.Offline), k();
    }, p._initAVCapabilities = k;
  }
  function w(e) {
    return e && e !== f.onlineStatus.Unknown;
  }
  function E(e, t) {
    var n = h.getPresenceService();
    n.setUserPresence(t), p.getCache().set(e, { status: t });
  }
  var t = e("jcafe-property-model"), n = e("jSkype/services/calling/environmentInspector"), r = e("jSkype/settings"), i = e("utils/calling/callingStack"), s = e("jSkype/telemetry/logging/callingLogTracer").get(), o = e("jSkype/models/person"), u = e("jSkype/models/account"), a = e("jSkype/utils/preferences"), f = e("swx-enums"), l = e("constants/common"), c = e("jSkype/modelHelpers/presence/presenceMapper"), h = e("jSkype/services/serviceFactory"), p = e("jSkype/modelHelpers/presence/presenceDataStorage"), d = e("jSkype/client"), v = e("jSkype/modelHelpers/personsAndGroupsHelper"), m = e("jSkype/modelHelpers/meData"), g = e("jSkype/modelHelpers/contacts/dataHandlers/factory"), y = e("jSkype/modelHelpers/mePersonSettings");
  return b.prototype = new o(), b.prototype.constructor = b, b;
})
