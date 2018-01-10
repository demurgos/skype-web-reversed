define("ui/viewModels/calling/plugin/pluginInstallViewModel", [
  "require",
  "exports",
  "module",
  "ui/viewModels/calling/plugin/downloadStepViewModel",
  "ui/viewModels/calling/plugin/startStepViewModel",
  "ui/viewModels/calling/plugin/closeStepViewModel",
  "ui/viewModels/calling/plugin/firefoxUnableToCallStepViewModel",
  "ui/viewModels/calling/plugin/extensionInstallStepViewModel",
  "ui/viewModels/calling/plugin/extensionInstallFailedStepViewModel",
  "ui/viewModels/calling/plugin/extensionInstalledStepViewModel",
  "ui/viewModels/calling/plugin/unblockStepViewModel",
  "ui/viewModels/calling/plugin/callbackStepViewModel",
  "ui/telemetry/telemetryClient",
  "browser/document",
  "swx-utils-common",
  "vendor/knockout",
  "swx-constants",
  "experience/settings",
  "swx-utils-common",
  "swx-browser-detect",
  "ui/modalDialog/modalDialog",
  "swx-cafe-application-instance",
  "browser/window"
], function (e, t) {
  var n = e("ui/viewModels/calling/plugin/downloadStepViewModel"), r = e("ui/viewModels/calling/plugin/startStepViewModel"), i = e("ui/viewModels/calling/plugin/closeStepViewModel"), s = e("ui/viewModels/calling/plugin/firefoxUnableToCallStepViewModel"), o = e("ui/viewModels/calling/plugin/extensionInstallStepViewModel"), u = e("ui/viewModels/calling/plugin/extensionInstallFailedStepViewModel"), a = e("ui/viewModels/calling/plugin/extensionInstalledStepViewModel"), f = e("ui/viewModels/calling/plugin/unblockStepViewModel"), l = e("ui/viewModels/calling/plugin/callbackStepViewModel"), c = e("ui/telemetry/telemetryClient"), h = e("browser/document"), p = e("swx-utils-common").guid, d = e("vendor/knockout"), v = e("swx-constants"), m = e("experience/settings"), g = e("swx-utils-common").stopwatch, y = e("swx-browser-detect").default, b = e("ui/modalDialog/modalDialog"), w = e("swx-cafe-application-instance"), E = e("browser/window"), S = 4000, x = v.CALLING, T = v.OUT_OF_BROWSER, N = function (t, v) {
      function q() {
        var e = s.build({
          close: Q,
          conversation: H
        });
        N.activeStep(e);
        b.show("closeCallingSetup", e.label, "");
        e.show();
      }
      function R() {
        var e = k.isBrowserDefaultToBlockPlugin, t = k.isInBrowserPluginSupported, n = k.browserName === y.BROWSERS.CHROME, r = Boolean(h.querySelector(T.shellAppMetaSelector)), i = v.onlyUnblock;
        B && H && !i && z();
        n && !t && !r && !i && (W(), X(), V());
        i || $({ isUnblockStepIncluded: e });
        e && J();
        H && K();
        U();
      }
      function U() {
        var e = {
          onPluginInstallEnded: rt,
          next: G,
          close: Q
        };
        D = i.build(e);
      }
      function z() {
        var e = {
          onPluginInstallEnded: rt,
          next: Z,
          close: Y,
          conversation: H
        };
        O.push(r.build(e));
      }
      function W() {
        var e = {
          isFirefox: L,
          onPluginInstallEnded: rt,
          next: et,
          nextOnFailed: Z,
          close: Y,
          conversation: H
        };
        O.push(o.build(e));
      }
      function X() {
        var e = {
          isFirefox: L,
          onPluginInstallEnded: rt,
          next: Z,
          close: Y,
          conversation: H
        };
        O.push(u.build(e));
      }
      function V() {
        var e = {
          isFirefox: L,
          onPluginInstallEnded: rt,
          next: Z,
          close: Y,
          conversation: H
        };
        O.push(a.build(e));
      }
      function $(e) {
        var t;
        e = e || {};
        t = {
          onPluginInstallEnded: rt,
          next: H || e.isUnblockStepIncluded ? Z : Q,
          close: Y,
          conversation: H,
          suppressEndedEvent: e.isUnblockStepIncluded
        };
        O.push(n.build(t));
      }
      function J() {
        var e = {
          isFirefox: L,
          onPluginInstallEnded: rt,
          next: H ? Z : Q,
          close: Y,
          conversation: H
        };
        O.push(f.build(e));
      }
      function K() {
        var e = {
          onPluginInstallEnded: rt,
          next: Q,
          close: Q,
          conversation: H,
          isVideo: v.isVideo,
          isOutgoing: B
        };
        O.push(l.build(e));
      }
      function Q() {
        ut();
        b.hide();
      }
      function G() {
        M = _;
        tt("next");
      }
      function Y() {
        _ = M;
        M = O.length - 1;
        nt(D, "next");
      }
      function Z() {
        _ = M;
        M++;
        tt("next");
      }
      function et() {
        _ = M;
        M += 2;
        tt("next");
      }
      function tt(e) {
        if (M >= O.length) {
          Q();
          return;
        }
        var t = O[M];
        nt(t, e);
      }
      function nt(e, t) {
        N.activeStep(e);
        b.show(e.id, e.label, t);
        e.show && e.show();
      }
      function rt(e, t, n) {
        st(e, t, n);
        v.done && v.done(e, t);
      }
      function it() {
        var e = {
          name: x.TELEMETRY_EVENTS.PLUGIN_INSTALL_STARTED,
          plugin_install_context_id: A,
          source: t,
          installationReason: P,
          success: x.NA,
          exitMethod: x.NA,
          durationInMs: x.NA,
          closeScreen: x.NA
        };
        c.get().sendEvent(m.telemetry.uiTenantToken, "PluginInstall", e);
      }
      function st(e, t, n) {
        var r = {
          name: x.TELEMETRY_EVENTS.PLUGIN_INSTALL_ENDED,
          plugin_install_context_id: A,
          source: x.NA,
          installationReason: P,
          success: t.toString(),
          exitMethod: e,
          durationInMs: j.duration().toString(10),
          closeScreen: n || O[_].id
        };
        c.get().sendEvent(m.telemetry.uiTenantToken, "PluginInstall", r);
      }
      function ot() {
        var e = C.devicesManager.mediaCapabilities;
        e.isPluginInstalled ? F = E.setInterval(function () {
          e.isPluginInstalled.get();
        }, S) : F = E.setInterval(function () {
          C.devicesManager.checkMediaCapabilities();
        }, S);
      }
      function ut() {
        E.clearInterval(F);
      }
      if (typeof t != "string")
        throw new Error("source param is mandatory");
      v = v || {};
      var N = this, C = w.get(), k = y.getBrowserInfo(), L = k.browserName === y.BROWSERS.FIREFOX, A = p.create(), O = [], M = 0, _ = 0, D, P = x.NA, H = v.conversation, B = v.isOutgoing, j, F, I = 51;
      this.firefoxUnableToCall = d.observable(L && k.browserMajorVersion > I);
      this.activeStep = d.observable();
      this.start = function () {
        if (N.firefoxUnableToCall()) {
          q();
          return;
        }
        j = g.build();
        R();
        M = 0;
        tt("");
        ot();
        it();
      };
    };
  t.build = function (e, t) {
    return new N(e, t);
  };
});
