define("ui/viewModels/calling/skypeOut/skypeOutHeaderViewModel", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionSources",
  "cafe/applicationInstance",
  "ui/viewModels/calling/helpers/callingFacade",
  "constants/common",
  "constants/people",
  "swx-enums",
  "utils/common/eventHelper",
  "utils/common/eventMixin",
  "utils/common/localStorage",
  "constants/keys",
  "vendor/knockout",
  "telemetry/calling/pstn/pstn",
  "services/serviceLocator",
  "swx-utils-common",
  "ui/controls/calling/sounds",
  "constants/common"
], function (e, t) {
  function S() {
    function C() {
      e.hasFocus(!0);
    }
    function k() {
      e.hasFocus(!1);
    }
    function L(e) {
      T = e;
    }
    function A(e) {
      t.selectionStart = e;
      t.selectionEnd = e;
    }
    function O(e) {
      e && (T = null);
    }
    function M(t) {
      if (t === N)
        return;
      E.test(t) ? (N = t, _(t) || e.dispatchEvent(u.events.skypeOut.INPUT_CHANGED, e.skypeOutInput(), e.DIRECTION.CHILD)) : (e.skypeOutInput(N), O(!0));
    }
    function _(t) {
      var n, r;
      return n = t.substr(0, 2), n === "00" ? (r = "+" + t.substr(2), e.skypeOutInput(r), e.hasFocus() ? A(1) : L(1), !0) : !1;
    }
    function D() {
      return T !== null;
    }
    function P() {
      D() || C();
    }
    var e = this, t, n = m.resolve(u.serviceLocator.PUBSUB), a = m.resolve(u.serviceLocator.MODEL_UI_OBSERVER).conversationsCallStateObserver, c, S, x, T = null, N = "";
    e.hasFocus = d.observable(!0);
    e.skypeOutInput = d.observable("");
    e.isCallButtonDisabled = d.computed(function () {
      return a.activeCalls().length > 0 || e.skypeOutInput().length < 3;
    });
    e.selectedCountry = d.observable();
    e.init = function (r) {
      t = r;
      e.registerEvent(u.events.skypeOut.DIAL_BUTTON_CLICKED, e.insertAtCursor);
      n.subscribe(u.events.navigation.FRAGMENT_LOADED, C);
      c = e.skypeOutInput.subscribe(M);
      S = e.selectedCountry.subscribe(P);
      x = e.hasFocus.subscribe(O);
    };
    e.insertAtCursor = function (n) {
      var r, i, s, o, u;
      i = D() ? T : t.selectionStart;
      s = D() ? T : t.selectionEnd;
      r = i;
      o = e.skypeOutInput();
      u = g.inject(o, n.text, i, s);
      L(r + n.text.length);
      e.skypeOutInput(u);
    };
    e.onKeyDown = function (t, n) {
      var r = l.getKeyCode(n);
      if (r === p.ESCAPE) {
        e.skypeOutInput() ? (e.resetSkypeOutInput(), C()) : k();
        n.stopPropagation();
        return;
      }
      if (r === p.ENTER) {
        e.skypeOutInput() && !e.isCallButtonDisabled() && e.callPSTN();
        n.stopPropagation();
        return;
      }
      return !0;
    };
    e.callPSTN = function () {
      function l() {
        return y.playOnce(y.KEYS.CALL_DIALING), o.placeCall(n, !1, u.telemetry.historyLoadOrigin.SKYPEOUT_PAGE, !0);
      }
      function c(e) {
        var t = n.participants(0), r = t.person.phoneNumbers(0) ? t.person.phoneNumbers(0).telUri() : e;
        t.audio.endpoint && t.audio.endpoint(r);
      }
      function p() {
        var e = m.resolve(u.serviceLocator.ACTION_TELEMETRY), t = {
            source: i.skypeOutPage.skypeOutHeader,
            phoneNumberType: f.phoneType.Other
          };
        e.recordAction(r.audioVideo.pstnCall, t);
      }
      function d() {
        p();
        v.initiatingPSTNCall(b.entryPoint.SKYPE_OUT_PAGE);
      }
      var t, n, a = e.skypeOutInput().replace(/\s+/g, "");
      return a.charAt(0) !== "+" ? (e.dispatchEvent(u.events.selectBox.TOGGLE, e.DIRECTION.CHILD), Promise.reject()) : (a = "+" + a.replace(/\D+/g, ""), d(), t = s.get().conversationsManager, n = t.getConversationByUri(w + a), !n.audioService.start.enabled() && n.audioService.start.enabled.reason !== f.callingNotSupportedReasons.PluginNotInstalled ? Promise.reject(Error("Audio service disabled: " + n.audioService.start.enabled.reason)) : (c(a), h.set(u.storageKeys.RECENT_COUNTRY, JSON.stringify(e.selectedCountry())), l()));
    };
    e.resetSkypeOutInput = function () {
      e.skypeOutInput("");
    };
    e.dispose = function () {
      n.unsubscribe(u.events.navigation.FRAGMENT_LOADED, C);
      e.isCallButtonDisabled.dispose();
      c.dispose();
      S.dispose();
      x.dispose();
    };
    e.resetSkypeOutInputViaKey = function (t, n) {
      var r = l.getKeyCode(n);
      return r === p.ENTER && (e.resetSkypeOutInput(), e.hasFocus(!0), n.stopPropagation()), !0;
    };
  }
  var n = e("lodash-compat"), r = e("ui/telemetry/actions/actionNames"), i = e("ui/telemetry/actions/actionSources"), s = e("cafe/applicationInstance"), o = e("ui/viewModels/calling/helpers/callingFacade"), u = e("constants/common"), a = e("constants/people"), f = e("swx-enums"), l = e("utils/common/eventHelper"), c = e("utils/common/eventMixin"), h = e("utils/common/localStorage"), p = e("constants/keys"), d = e("vendor/knockout"), v = e("telemetry/calling/pstn/pstn"), m = e("services/serviceLocator"), g = e("swx-utils-common").stringUtils, y = e("ui/controls/calling/sounds"), b = e("constants/common").telemetry.pstn, w = a.contactTypes.PSTN + ":", E = /^(\+?[\s\d\-]*$)/;
  n.assign(S.prototype, c);
  t.build = function () {
    return new S();
  };
});
