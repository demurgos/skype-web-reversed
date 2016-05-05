define("ui/viewModels/calling/plugin/pluginInstallViewModel", [
  "require",
  "exports",
  "module",
  "ui/viewModels/calling/plugin/downloadStepViewModel",
  "ui/viewModels/calling/plugin/startStepViewModel",
  "ui/viewModels/calling/plugin/closeStepViewModel",
  "ui/viewModels/calling/plugin/extensionInstallStepViewModel",
  "ui/viewModels/calling/plugin/extensionInstallFailedStepViewModel",
  "ui/viewModels/calling/plugin/extensionInstalledStepViewModel",
  "ui/viewModels/calling/plugin/unblockStepViewModel",
  "ui/viewModels/calling/plugin/callbackStepViewModel",
  "ui/telemetry/telemetryClient",
  "browser/document",
  "swx-utils-common",
  "swx-enums",
  "vendor/knockout",
  "constants/extension",
  "constants/calling",
  "experience/settings",
  "swx-utils-common",
  "browser/detect",
  "ui/modalDialog/modalDialog",
  "cafe/applicationInstance",
  "browser/window"
], function (e, t) {
  var n = e("ui/viewModels/calling/plugin/downloadStepViewModel"), r = e("ui/viewModels/calling/plugin/startStepViewModel"), i = e("ui/viewModels/calling/plugin/closeStepViewModel"), s = e("ui/viewModels/calling/plugin/extensionInstallStepViewModel"), o = e("ui/viewModels/calling/plugin/extensionInstallFailedStepViewModel"), u = e("ui/viewModels/calling/plugin/extensionInstalledStepViewModel"), a = e("ui/viewModels/calling/plugin/unblockStepViewModel"), f = e("ui/viewModels/calling/plugin/callbackStepViewModel"), l = e("ui/telemetry/telemetryClient"), c = e("browser/document"), h = e("swx-utils-common").guid, p = e("swx-enums"), d = e("vendor/knockout"), v = e("constants/extension"), m = e("constants/calling"), g = e("experience/settings"), y = e("swx-utils-common").stopwatch, b = e("browser/detect"), w = e("ui/modalDialog/modalDialog"), E = e("cafe/applicationInstance"), S = e("browser/window"), x = 4000, T = function (t, T) {
      function F(e) {
        return e && e.selfParticipant.audio.state.reason === p.callDisconnectionReason.OutOfBrowserCall ? p.callDisconnectionReason.OutOfBrowserCall : m.NA;
      }
      function I() {
        var e = C.isBrowserDefaultToBlockPlugin, t = C.isInBrowserPluginSupported, n = C.browserName === b.BROWSERS.EDGE, r = C.browserName === b.BROWSERS.CHROME, i = Boolean(c.querySelector(v.META_SELECTOR));
        H && P && (t || n) && R(), r && !t && !i && (U(), z(), W()), X({ isUnblockStepIncluded: e }), e && V(), P && $(), q();
      }
      function q() {
        var e = {
          onPluginInstallEnded: tt,
          next: K,
          close: J
        };
        _ = i.build(e);
      }
      function R() {
        var e = {
          onPluginInstallEnded: tt,
          next: G,
          close: Q,
          conversation: P
        };
        A.push(r.build(e));
      }
      function U() {
        var e = {
          isFirefox: k,
          onPluginInstallEnded: tt,
          next: Y,
          nextOnFailed: G,
          close: Q,
          conversation: P
        };
        A.push(s.build(e));
      }
      function z() {
        var e = {
          isFirefox: k,
          onPluginInstallEnded: tt,
          next: G,
          close: Q,
          conversation: P
        };
        A.push(o.build(e));
      }
      function W() {
        var e = {
          isFirefox: k,
          onPluginInstallEnded: tt,
          next: G,
          close: Q,
          conversation: P
        };
        A.push(u.build(e));
      }
      function X(e) {
        var t;
        e = e || {}, t = {
          onPluginInstallEnded: tt,
          next: P || e.isUnblockStepIncluded ? G : J,
          close: Q,
          conversation: P,
          suppressEndedEvent: e.isUnblockStepIncluded
        }, A.push(n.build(t));
      }
      function V() {
        var e = {
          isFirefox: k,
          onPluginInstallEnded: tt,
          next: P ? G : J,
          close: Q,
          conversation: P
        };
        A.push(a.build(e));
      }
      function $() {
        var e = {
          onPluginInstallEnded: tt,
          next: J,
          close: J,
          conversation: P,
          isVideo: T.isVideo
        };
        A.push(f.build(e));
      }
      function J() {
        st(), w.hide();
      }
      function K() {
        O = M, Z("next");
      }
      function Q() {
        M = O, O = A.length - 1, et(_, "next");
      }
      function G() {
        M = O, O++, Z("next");
      }
      function Y() {
        M = O, O += 2, Z("next");
      }
      function Z(e) {
        if (O >= A.length) {
          J();
          return;
        }
        var t = A[O];
        et(t, e);
      }
      function et(e, t) {
        N.activeStep(e), w.show(e.id, e.label, t), e.show && e.show();
      }
      function tt(e, t, n) {
        rt(e, t, n), T.done && T.done(e, t);
      }
      function nt() {
        var e = {
          name: m.TELEMETRY_EVENTS.PLUGIN_INSTALL_STARTED,
          plugin_install_context_id: L,
          source: t,
          installationReason: D,
          success: m.NA,
          exitMethod: m.NA,
          durationInMs: m.NA,
          closeScreen: m.NA
        };
        l.get().sendEvent(g.telemetry.uiTenantToken, "PluginInstall", e);
      }
      function rt(e, t, n) {
        var r = {
          name: m.TELEMETRY_EVENTS.PLUGIN_INSTALL_ENDED,
          plugin_install_context_id: L,
          source: m.NA,
          installationReason: D,
          success: t.toString(),
          exitMethod: e,
          durationInMs: B.duration().toString(10),
          closeScreen: n || A[M].id
        };
        l.get().sendEvent(g.telemetry.uiTenantToken, "PluginInstall", r);
      }
      function it() {
        T.conversation ? j = S.setInterval(function () {
          T.conversation.videoService.start.enabled.get(), T.conversation.audioService.start.enabled.get();
        }, x) : j = S.setInterval(function () {
          E.get().devicesManager.checkMediaCapabilities();
        }, x);
      }
      function st() {
        S.clearInterval(j);
      }
      if (typeof t != "string")
        throw new Error("source param is mandatory");
      T = T || {};
      var N = this, C = b.getBrowserInfo(), k = C.browserName === b.BROWSERS.FIREFOX, L = h.create(), A = [], O = 0, M = 0, _, D, P = T.conversation, H = T.isOutgoing, B, j;
      D = F(P), this.activeStep = d.observable(), this.start = function () {
        B = y.build(), I(), O = 0, Z(""), it(), nt();
      };
    };
  t.build = function (e, t) {
    return new T(e, t);
  };
})
