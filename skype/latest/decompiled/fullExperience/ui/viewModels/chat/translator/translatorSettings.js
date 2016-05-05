define("ui/viewModels/chat/translator/translatorSettings", [
  "require",
  "exports",
  "module",
  "cafe/applicationInstance",
  "browser/dom",
  "browser/document",
  "swx-i18n",
  "vendor/knockout",
  "utils/common/eventHelper",
  "utils/common/cafeObservable",
  "experience/settings",
  "constants/common",
  "telemetry/translator/translatorTelemetry",
  "utils/common/outsideClickHandler"
], function (e, t) {
  function d(e) {
    function N() {
      t.dialogOpened(!0), p.add(w, C), i.body.addEventListener("focus", k, !0), i.body.addEventListener("keydown", L, !0);
    }
    function C() {
      t.dialogOpened(!1), p.remove(w), i.body.removeEventListener("focus", k, !0), i.body.removeEventListener("keydown", L, !0);
    }
    function k(e) {
      var t = !!r.getParentWithClass(e.target, w) || !!r.getParentWithClass(e.relatedTarget, w) || !!r.getParentWithClass(e.explicitOriginalTarget, w);
      t || C();
    }
    function L(e) {
      u.isDeactivation(e) && (C(), T.send(c.eventType.SETTINGS_HIDE, { initiator: c.initiator.ESCAPE_KEY }));
    }
    function A() {
      return l._translatorSettings && l._translatorSettings.meLanguage || y || b;
    }
    function O() {
      return l._translatorSettings && l._translatorSettings.participantLanguage || b;
    }
    function M(e) {
      t.translatorEnabled(!0), l._translatorSettings.meLanguage = e, T.send(c.eventType.ME_LANGUAGE_CHANGED, {
        language: e.code,
        settingsInitParamsLocale: f.initParams.locale
      });
    }
    function _(e) {
      t.translatorEnabled(!0), l._translatorSettings.participantLanguage = e, T.send(c.eventType.PARTICIPANT_LANGUAGE_CHANGED, { selectedLanguage: e.code });
    }
    function D() {
      l._translatorSettings.meLanguage = null, l._translatorSettings.participantLanguage = null;
    }
    function P() {
      l._translatorSettings.meLanguage = t.meLanguage(), l._translatorSettings.participantLanguage = t.participantLanguage();
    }
    function H(e) {
      l._translatorSettings && (l._translatorSettings.isEnabled = e, e ? P() : D());
    }
    function B() {
      return f.initParams.locale.replace(/-\w+/, "").toLowerCase();
    }
    function j() {
      n.get().translatorService.supportedLanguages().forEach(function (e) {
        var n = {
          name: e.name(),
          code: e.code()
        };
        n.code === g && (y = n), n.code === "en" && (b = n), t.availableLanguages.push(n);
      });
    }
    var t = this, l = e.conversationModel, d = n.get().personsAndGroupsManager.mePerson, v = s.fetch({ key: "label_translator_translatorOn" }), m = s.fetch({ key: "label_translator_translatorOff" }), g, y, b = {
        name: "English",
        code: "en"
      }, w = "TranslatorSettings", E, S, x, T = h.build();
    t.init = function () {
      t.availableLanguages = o.observableArray(), g = B(), j(), t.translatorEnabled = o.observable(!1), t.participantAvatar = a.newObservableProperty(l.participants()[0].person.avatarUrl), t.participantDisplayName = a.newObservableProperty(l.participants()[0].person.displayName), t.participantLanguage = o.observable(O()), t.meAvatar = a.newObservableProperty(d.avatarUrl), t.meDisplayName = a.newObservableProperty(d.displayName), t.meLanguage = o.observable(A()), t.dialogOpened = o.observable(!1), t.settingsButtonLabel = s.fetch({ key: "button_translator_translatorSettings" }), t.settingsButtonAriaLabel = o.computed(function () {
        return t.translatorEnabled() ? t.settingsButtonLabel + ". " + s.fetch({ key: "button_translator_translatorSettingsOn" }) : t.settingsButtonLabel + ". " + s.fetch({ key: "button_translator_translatorSettingsOff" });
      }), t.settingsDialogLabel = s.fetch({ key: "label_translator_translatorSettings" }), t.meLanguagePickerLabel = o.computed(function () {
        return s.fetch({
          key: "label_translator_selected_myLanguage",
          params: { language: t.meLanguage().name }
        });
      }), t.theirLanguagePickerLabel = o.computed(function () {
        return s.fetch({
          key: "label_translator_selected_theirLanguage",
          params: {
            name: t.participantDisplayName(),
            language: t.participantLanguage().name
          }
        });
      }), E = t.translatorEnabled.subscribe(H), S = t.participantLanguage.subscribe(_), x = t.meLanguage.subscribe(M), t.translatorToggleText = o.computed(function () {
        return t.translatorEnabled() ? v : m;
      }), t.translatorEnabledHandler = function () {
        var e = t.translatorEnabled();
        t.translatorEnabled(!t.translatorEnabled()), e || T.send(c.eventType.SETTINGS_BUTTON_ENABLED, {
          meLanguage: t.meLanguage().code,
          participantLanguage: t.participantLanguage().code
        });
      }, t.onTranslatorEnabledKeyDown = function (e, n) {
        var r = u.isActivation(n);
        return r && t.translatorEnabledHandler(), !r;
      }, t.settingsButtonHandler = function () {
        t.dialogOpened() ? (C(), T.send(c.eventType.SETTINGS_HIDE, { initiator: c.initiator.CLICK_GLOBE_BUTTON })) : (N(), T.send(c.eventType.SETTINGS_SHOW));
      }, l._translatorSettings ? t.translatorEnabled(l._translatorSettings.isEnabled) : l._translatorSettings = {
        meLanguage: t.meLanguage(),
        participantLanguage: t.participantLanguage(),
        isEnabled: t.translatorEnabled()
      };
    }, t.dispose = function () {
      t.dialogOpened() && C(), t.participantAvatar.dispose(), t.participantDisplayName.dispose(), t.meAvatar.dispose(), t.meDisplayName.dispose(), t.translatorToggleText.dispose(), t.meLanguagePickerLabel.dispose(), t.theirLanguagePickerLabel.dispose(), t.settingsButtonAriaLabel.dispose(), S.dispose(), x.dispose(), E.dispose();
    };
  }
  var n = e("cafe/applicationInstance"), r = e("browser/dom"), i = e("browser/document"), s = e("swx-i18n").localization, o = e("vendor/knockout"), u = e("utils/common/eventHelper"), a = e("utils/common/cafeObservable"), f = e("experience/settings"), l = e("constants/common"), c = l.telemetry.translator, h = e("telemetry/translator/translatorTelemetry"), p = e("utils/common/outsideClickHandler");
  t.build = function (e) {
    return new d(e);
  };
})
