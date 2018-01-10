define("ui/viewModels/userSettings/preferenceViewModel", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-enums",
  "swx-constants",
  "swx-i18n",
  "swx-g11n",
  "vendor/knockout",
  "swx-log-tracer",
  "browser/dom",
  "ui/viewModels/userSettings/utils",
  "ui/shortCircuit/shortCircuit",
  "swx-service-locator-instance",
  "ui/telemetry/actions/actionNames",
  "ui/viewModels/userSettings/preferenceMapping",
  "swx-focus-handler",
  "notifications/ringingDeferrer/ringingDeferrerUtil"
], function (e, t) {
  function g(e, t, d) {
    function b(e) {
      h.resolve(i.serviceLocator.ACTION_TELEMETRY).recordAction(e);
    }
    function w(t) {
      t = t || n.noop;
      g.toggleValue = function () {
        e.value.set(!e.value());
        t();
      };
      g.activate = function () {
        g.toggleValue();
      };
    }
    function E() {
      var t = ".pref-select-element > select", n = [
          "settings_privacy_opt_1_title",
          "settings_privacy_opt_2_title",
          "settings_privacy_opt_3_title"
        ];
      g.uiValue = function (t) {
        return t = u.unwrap(t), t >= 0 && t < n.length ? s.fetch({ key: n[t] }) : null;
      };
      g.activate = function (e) {
        var n = f.getElement(t, e.target);
        n && v.get().addFocusRequestToQueue(n);
      };
      g.optionChanged = function (n) {
        e.value.set(n.value());
      };
      g.preventPropagation = function (e, t) {
        return t.stopPropagation(), !0;
      };
    }
    function S() {
      function e() {
        function e(e, t) {
          e.push({
            id: t,
            text: u.observable(s.fetch({
              key: "settings_ringing_deferrer_defer_for",
              count: t
            }))
          });
        }
        var t = [];
        return e(t, r.ringingDeferrerOptions.Defer4Hours), e(t, r.ringingDeferrerOptions.Defer8Hours), e(t, r.ringingDeferrerOptions.Defer24Hours), t;
      }
      function t() {
        var e = g.uiSelectOptions(), t = m.getCurrentSetting();
        if (!t)
          return null;
        for (var n = 0; n < e.length; n++)
          if (e[n].id === t.option)
            return e[n].id;
        return null;
      }
      g.uiToggled = u.observable(!1);
      g.uiToggleClicked = function () {
        var e;
        m.areRingingSoundsDeferred() ? e = r.ringingDeferrerOptions.Unset : e = r.ringingDeferrerOptions.Defer4Hours;
        m.applyOption(e);
      };
      g.uiSelectOptions = u.observableArray(e());
      g.uiSelectedOption = u.observable(t());
      g.uiSelectedOptionChanged = function (e) {
        var t = e.uiSelectedOption(), n = m.getCurrentSetting();
        if (t === n.option)
          return;
        m.applyOption(t);
      };
      g.uiUpdateSelectOptionsTexts = function () {
        function t(t) {
          var n = s.fetch({
            key: "settings_ringing_deferrer_defer_for",
            count: t
          });
          return t === e.option && (n += " (" + o.formatDate(new Date(e.untilTimestamp), i.globalizationFormatKeys.time.SHORT) + ")"), n;
        }
        var e = m.getCurrentSetting();
        if (!e)
          return;
        for (var n = 0; n < g.uiSelectOptions().length; n++) {
          var r = g.uiSelectOptions()[n];
          r.text(t(r.id));
        }
      };
      g.activate = function (e) {
        var t = ".pref-select-element > select", n = f.getElement(t, e.target);
        n && v.get().addFocusRequestToQueue(n);
      };
      g.preventPropagation = function (e, t) {
        return t.stopPropagation(), !0;
      };
    }
    function x() {
      var t = h.resolve(i.serviceLocator.ACTION_TELEMETRY);
      g.id === i.userSettings.preferences.NOTIFICATIONS ? t.recordAction(p.notificationsSettings.toggleNotifications, { enabled: !e.value() }) : g.id === i.userSettings.preferences.NOTIFICATIONS_SOUND && t.recordAction(p.notificationsSettings.toggleSound, { enabled: !e.value() });
    }
    function T(t) {
      return function () {
        var n = h.resolve(i.serviceLocator.ACTION_TELEMETRY);
        switch (t) {
        case i.shortCircuit.scenarios.MANAGE_ADDRESSBOOKS:
          n.recordAction(p.shortCircuit.manageAddressBooks);
          break;
        case i.shortCircuit.scenarios.ADD_VERIFIED_PHONE:
          n.recordAction(p.shortCircuit.addNewNumber);
        }
        c.build().open(t).then(function () {
          e.value.get();
        });
      };
    }
    function N(e) {
      return e.toString().replace(/\B(?=(\d{1})+(?!\d))/g, ",");
    }
    var g = this, y = e.description.type;
    g.id = e.description.id;
    g.uiState = r.preferenceValueState.Unknown;
    g.value = null;
    g.ariaId = "userSettings-" + g.id;
    g.disabled = u.observable(!1);
    g.template = l.getPrefTemplate(e.description, t);
    g.title = l.getPrefTitle(g.id, t);
    g.secondaryText = l.getPrefSecondaryText(g.id, t);
    switch (y) {
    case r.preferenceType.Boolean:
      w();
      break;
    case r.preferenceType.CallPolicy:
      g.uiOptions = [
        r.privacyPolicyValues.Anyone,
        r.privacyPolicyValues.ContactsOnly
      ], E();
      break;
    case r.preferenceType.VideoPolicy:
      g.uiOptions = [
        r.privacyPolicyValues.Anyone,
        r.privacyPolicyValues.ContactsOnly,
        r.privacyPolicyValues.NoOne
      ], E();
      break;
    case r.preferenceType.AutoBuddy:
      g.launchShortCircuit = T(i.shortCircuit.scenarios.MANAGE_ADDRESSBOOKS), w(b.bind(g, p.shortCircuit.toggleAutoBuddy));
      break;
    case r.preferenceType.AutoBuddyDiscovery:
      g.launchPNV = T(i.shortCircuit.scenarios.ADD_VERIFIED_PHONE);
      break;
    case r.preferenceType.AutoBuddyDiscoveryEmail:
      g.showToggle = !1, g.showRemoveLink = !1;
      break;
    case r.preferenceType.AutoBuddyDiscoveryPhone:
      g.showToggle = !0, g.showRemoveLink = !0, g.ariaLabel = N(g.title), g.removeAriaLabel = s.fetch({
        key: "settings_short_circuit_remove_accessible_text",
        params: { proof: g.ariaLabel }
      }), g.remove = function () {
        h.resolve(i.serviceLocator.ACTION_TELEMETRY).recordAction(p.shortCircuit.deleteNumber);
        e.value.set(null).then(function () {
          d.value.get();
        });
      }, w(b.bind(g, p.shortCircuit.togglePhoneProof));
      break;
    case r.preferenceType.Notifications:
      w(x.bind(g));
      break;
    case r.preferenceType.RingingDeferrer:
      S();
      break;
    default:
      a.log("UNKNOWN PREFERENCE TYPE!", g.id);
    }
  }
  var n = e("lodash-compat"), r = e("swx-enums"), i = e("swx-constants").COMMON, s = e("swx-i18n").localization, o = e("swx-g11n").globalization, u = e("vendor/knockout"), a = e("swx-log-tracer").getLogger(), f = e("browser/dom"), l = e("ui/viewModels/userSettings/utils"), c = e("ui/shortCircuit/shortCircuit"), h = e("swx-service-locator-instance").default, p = e("ui/telemetry/actions/actionNames"), d = e("ui/viewModels/userSettings/preferenceMapping").mapping, v = e("swx-focus-handler"), m = e("notifications/ringingDeferrer/ringingDeferrerUtil");
  t.Preference = g;
  t.build = function (e, t) {
    return new g(e, d, t);
  };
});
