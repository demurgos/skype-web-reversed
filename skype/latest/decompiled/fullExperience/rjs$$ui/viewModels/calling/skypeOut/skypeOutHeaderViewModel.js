define("ui/viewModels/calling/skypeOut/skypeOutHeaderViewModel", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionSources",
  "swx-cafe-application-instance",
  "ui/viewModels/calling/helpers/callingFacade",
  "swx-constants",
  "swx-constants",
  "swx-enums",
  "utils/common/eventHelper",
  "utils/common/eventMixin",
  "utils/common/localStorage",
  "swx-constants",
  "vendor/knockout",
  "telemetry/calling/pstn/pstn",
  "swx-service-locator-instance",
  "swx-utils-common",
  "swx-constants"
], function (e, t) {
  function E() {
    function N() {
      var t = e.skypeOutInput();
      return t = t.replace(/\D/g, ""), t.length >= 10 && t.length <= 15;
    }
    function C() {
      e.hasFocus(!0);
    }
    function k() {
      e.hasFocus(!1);
    }
    function L(e) {
      x = e;
    }
    function A(e) {
      t.selectionStart = e;
      t.selectionEnd = e;
    }
    function O(e) {
      e && (x = null);
    }
    function M(t) {
      if (t === T)
        return;
      w.test(t) ? (T = t, _(t) || e.dispatchEvent(u.events.skypeOut.INPUT_CHANGED, e.skypeOutInput(), e.DIRECTION.CHILD)) : (e.skypeOutInput(T), O(!0));
    }
    function _(t) {
      var n, r;
      return n = t.substr(0, 2), n === "00" ? (r = "+" + t.substr(2), e.skypeOutInput(r), e.hasFocus() ? A(1) : L(1), !0) : !1;
    }
    function D() {
      return x !== null;
    }
    function P() {
      D() || C();
    }
    var e = this, t, n = m.resolve(u.serviceLocator.PUBSUB), a = m.resolve(u.serviceLocator.MODEL_UI_OBSERVER).conversationsCallStateObserver, c, E, S, x = null, T = "";
    e.hasFocus = d.observable(!0);
    e.skypeOutInput = d.observable("");
    e.isCallButtonDisabled = d.computed(function () {
      return a.activeCalls().length > 0 || !N();
    });
    e.selectedCountry = d.observable();
    e.init = function (r) {
      t = r;
      e.registerEvent(u.events.skypeOut.DIAL_BUTTON_CLICKED, e.insertAtCursor);
      n.subscribe(u.events.navigation.FRAGMENT_LOADED, C);
      c = e.skypeOutInput.subscribe(M);
      E = e.selectedCountry.subscribe(P);
      S = e.hasFocus.subscribe(O);
    };
    e.insertAtCursor = function (n) {
      var r = D() ? x : t.selectionStart, i = D() ? x : t.selectionEnd, s = e.skypeOutInput(), o = g.inject(s, n.text, r, i);
      L(r + n.text.length);
      e.skypeOutInput(o);
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
      function c() {
        return o.placeCall(n, !1, u.telemetry.historyLoadOrigin.SKYPEOUT_PAGE, !0);
      }
      function p(e) {
        var t = n.participants(0), r = t.person.phoneNumbers(0) ? t.person.phoneNumbers(0).telUri() : e;
        t.audio.endpoint && t.audio.endpoint(r);
      }
      function d() {
        var e = m.resolve(u.serviceLocator.ACTION_TELEMETRY), t = {
            source: i.skypeOutPage.skypeOutHeader,
            phoneNumberType: f.phoneType.Other
          };
        e.recordAction(r.audioVideo.pstnCall, t);
      }
      function g() {
        d();
        v.initiatingPSTNCall(y.entryPoint.SKYPE_OUT_PAGE);
      }
      function w() {
        return !n.audioService.start.enabled() && n.audioService.start.enabled.reason !== f.callingNotSupportedReasons.PluginNotInstalled ? Promise.reject(Error("Audio service disabled: " + n.audioService.start.enabled.reason)) : (p(l), h.set(u.storageKeys.RECENT_COUNTRY, JSON.stringify(e.selectedCountry())), c());
      }
      function E() {
        function r() {
          var r = e.results().length, i = r ? e.results(0).result : undefined;
          if (!i)
            return;
          return n = t.getConversation(i), w();
        }
        var e = s.get().personsAndGroupsManager.createPersonSearchQuery();
        return e.sources(f.searchScope.All), e.text(l), e.getMore().then(r);
      }
      var t, n, a, l = e.skypeOutInput().replace(/\s+/g, "");
      return l.charAt(0) !== "+" ? (e.dispatchEvent(u.events.selectBox.TOGGLE, e.DIRECTION.CHILD), Promise.reject()) : (l = "+" + l.replace(/\D+/g, ""), g(), t = s.get().conversationsManager, a = m.resolve(u.serviceLocator.FEATURE_FLAGS).isFeatureOn(u.featureFlags.USE_BUSINESS_WORDING), a ? E() : (n = t.getConversationByUri(b + l), w()));
    };
    e.resetSkypeOutInput = function () {
      e.skypeOutInput("");
    };
    e.dispose = function () {
      n.unsubscribe(u.events.navigation.FRAGMENT_LOADED, C);
      e.isCallButtonDisabled.dispose();
      c.dispose();
      E.dispose();
      S.dispose();
    };
    e.resetSkypeOutInputViaKey = function (t, n) {
      var r = l.getKeyCode(n);
      return r === p.ENTER && (e.resetSkypeOutInput(), e.hasFocus(!0), n.stopPropagation()), !0;
    };
  }
  var n = e("lodash-compat"), r = e("ui/telemetry/actions/actionNames"), i = e("ui/telemetry/actions/actionSources"), s = e("swx-cafe-application-instance"), o = e("ui/viewModels/calling/helpers/callingFacade"), u = e("swx-constants").COMMON, a = e("swx-constants").PEOPLE, f = e("swx-enums"), l = e("utils/common/eventHelper"), c = e("utils/common/eventMixin"), h = e("utils/common/localStorage"), p = e("swx-constants").KEYS, d = e("vendor/knockout"), v = e("telemetry/calling/pstn/pstn"), m = e("swx-service-locator-instance").default, g = e("swx-utils-common").stringUtils, y = e("swx-constants").COMMON.telemetry.pstn, b = a.contactTypes.PSTN + ":", w = /^(\+?[\s\d\-\(\)\.)]*$)/;
  n.assign(E.prototype, c);
  t.build = function () {
    return new E();
  };
});
