define("ui/viewModels/userSettings/preferenceViewModel", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-enums",
  "constants/common",
  "swx-i18n",
  "vendor/knockout",
  "browser/dom",
  "ui/viewModels/userSettings/utils",
  "ui/shortCircuit/shortCircuit",
  "services/serviceLocator",
  "ui/telemetry/actions/actionNames",
  "ui/viewModels/userSettings/preferenceMapping"
], function (e, t) {
  function p(e, t, h) {
    function v(e) {
      l.resolve(i.serviceLocator.ACTION_TELEMETRY).recordAction(e);
    }
    function m(t) {
      t = t || n.noop;
      p.toggleValue = function () {
        e.value.set(!e.value());
        t();
      };
      p.activate = function () {
        p.toggleValue();
      };
    }
    function g() {
      var t = ".pref-select-element > select", n = [
          "settings_privacy_opt_1_title",
          "settings_privacy_opt_2_title",
          "settings_privacy_opt_3_title"
        ];
      p.uiValue = function (t) {
        return t = o.unwrap(t), t >= 0 && t < n.length ? s.fetch({ key: n[t] }) : null;
      };
      p.activate = function (e) {
        var n = u.getElement(t, e.target);
        n && n.focus();
      };
      p.optionChanged = function (n) {
        e.value.set(n.value());
      };
      p.preventPropagation = function (e, t) {
        return t.stopPropagation(), !0;
      };
    }
    function y(t) {
      return function () {
        var n = l.resolve(i.serviceLocator.ACTION_TELEMETRY);
        switch (t) {
        case i.shortCircuit.scenarios.MANAGE_ADDRESSBOOKS:
          n.recordAction(c.shortCircuit.manageAddressBooks);
          break;
        case i.shortCircuit.scenarios.ADD_VERIFIED_PHONE:
          n.recordAction(c.shortCircuit.addNewNumber);
        }
        f.build().open(t).then(function () {
          e.value.get();
        });
      };
    }
    var p = this, d = e.description.type;
    p.id = e.description.id;
    p.uiState = r.preferenceValueState.Unknown;
    p.value = null;
    p.ariaId = "userSettings-" + p.id;
    p.template = a.getPrefTemplate(e.description, t);
    p.title = a.getPrefTitle(p.id, t);
    p.secondaryText = a.getPrefSecondaryText(p.id, t);
    switch (d) {
    case r.preferenceType.Boolean:
      m();
      break;
    case r.preferenceType.CallPolicy:
      p.uiOptions = [
        r.privacyPolicyValues.Anyone,
        r.privacyPolicyValues.ContactsOnly
      ], g();
      break;
    case r.preferenceType.VideoPolicy:
      p.uiOptions = [
        r.privacyPolicyValues.Anyone,
        r.privacyPolicyValues.ContactsOnly,
        r.privacyPolicyValues.NoOne
      ], g();
      break;
    case r.preferenceType.AutoBuddy:
      p.launchShortCircuit = y(i.shortCircuit.scenarios.MANAGE_ADDRESSBOOKS), m(v.bind(p, c.shortCircuit.toggleAutoBuddy));
      break;
    case r.preferenceType.AutoBuddyDiscovery:
      p.launchPNV = y(i.shortCircuit.scenarios.ADD_VERIFIED_PHONE);
      break;
    case r.preferenceType.AutoBuddyDiscoveryEmail:
      p.showToggle = !1, p.showRemoveLink = !1;
      break;
    case r.preferenceType.AutoBuddyDiscoveryPhone:
      p.showToggle = !0, p.showRemoveLink = !0, p.remove = function () {
        l.resolve(i.serviceLocator.ACTION_TELEMETRY).recordAction(c.shortCircuit.deleteNumber);
        e.value.set(null).then(function () {
          h.value.get();
        });
      }, m(v.bind(p, c.shortCircuit.togglePhoneProof));
      break;
    default:
    }
  }
  var n = e("lodash-compat"), r = e("swx-enums"), i = e("constants/common"), s = e("swx-i18n").localization, o = e("vendor/knockout"), u = e("browser/dom"), a = e("ui/viewModels/userSettings/utils"), f = e("ui/shortCircuit/shortCircuit"), l = e("services/serviceLocator"), c = e("ui/telemetry/actions/actionNames"), h = e("ui/viewModels/userSettings/preferenceMapping").mapping;
  t.Preference = p;
  t.build = function (e, t) {
    return new p(e, h, t);
  };
});
