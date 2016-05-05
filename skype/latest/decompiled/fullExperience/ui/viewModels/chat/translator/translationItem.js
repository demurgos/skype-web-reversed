define("ui/viewModels/chat/translator/translationItem", [
  "require",
  "exports",
  "module",
  "services/serviceLocator",
  "constants/common",
  "swx-i18n",
  "vendor/knockout",
  "utils/chat/messageSanitizer",
  "telemetry/translator/translatorTelemetry",
  "ui/modelHelpers/personHelper",
  "utils/chat/translatorHelper"
], function (e, t) {
  function c(e, t) {
    function x() {
      return y && y.isEnabled;
    }
    function T() {
      return !g && x();
    }
    function N(e, n) {
      var r = l.extractLanguageKey(n);
      x() || c.translationText(e), l.isMatchingMyLanguage(r, t._translatorSettings) && (c.translationText(e), c.visible(!0)), S.send(E, {
        action: u.action.SHOW,
        success: !0
      });
    }
    function C(e, t) {
      var n = o.getMessageSanitizedContent(e);
      f.isMePersonId(t) && (c.translationText(n), c.visible(!0), S.send(E, {
        action: u.action.SHOW,
        success: !0
      }));
    }
    function k() {
      if (!m().length) {
        c.isRemoved(!0), c.visible(!1);
        return;
      }
      m.each(function (e) {
        var t = e.key, n = e.users && e.users[0], r = n && n.value, i = n && n.mri, s = r === c.translationText();
        if (!t || !r || s)
          return;
        if (o.isMessageWithEmoticonsOnly(r) || o.isMessageWithMentionOnly(r)) {
          c.visible(!1), c.translationText("");
          return;
        }
        c.isRemoved(!1), g ? C(r, i) : N(r, t);
      });
    }
    function L() {
      return T() ? c.visible() ? u.action.CLICK_SEE_ORIGINAL : u.action.CLICK_SEE_TRANSLATION : c.visible() ? u.action.CLICK_SEE_TRANSLATION : u.action.CLICK_SEE_ORIGINAL;
    }
    function A() {
      m && (w = m.observe(k)), e.model.isDeleted && (b = e.model.isDeleted.changed(function (e) {
        c.isRemoved(e), c.visible(!1);
      }));
    }
    var c = this, h = n.resolve(r.serviceLocator.FEATURE_FLAGS), p = h.isFeatureOn(r.featureFlags.TRANSLATOR_SENDING_ENABLED), d = i.fetch({ key: "button_translations_see_original_message" }), v = i.fetch({ key: "button_translations_see_translated_message" }), m = e.model.translations, g = e.model.direction && e.model.direction() === r.chat.messageType.OUTGOING, y = t._translatorSettings, b, w, E = g ? u.eventType.OUTGOING : u.eventType.INCOMING, S = a.build();
    c.init = function () {
      c.isRemoved = s.observable(!1), c.visible = s.observable(!1), c.translationText = s.observable(""), c.isEnabled = s.pureComputed(function () {
        return p && !c.isRemoved() && !!c.translationText();
      }), c.toggle = function () {
        var e = L();
        c.visible(!c.visible()), S.send(E, { action: e });
      }, c.toggleText = s.pureComputed(function () {
        return T() ? c.visible() ? d : v : c.visible() ? v : d;
      }), p && A();
    }, c.dispose = function () {
      b && b.dispose(), w && w.dispose();
    };
  }
  var n = e("services/serviceLocator"), r = e("constants/common"), i = e("swx-i18n").localization, s = e("vendor/knockout"), o = e("utils/chat/messageSanitizer"), u = r.telemetry.translator, a = e("telemetry/translator/translatorTelemetry"), f = e("ui/modelHelpers/personHelper"), l = e("utils/chat/translatorHelper");
  t.build = function (e, t) {
    return new c(e, t);
  };
})
