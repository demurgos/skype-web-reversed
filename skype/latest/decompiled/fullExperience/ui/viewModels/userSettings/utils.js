define("ui/viewModels/userSettings/utils", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-enums",
  "constants/common",
  "swx-i18n",
  "browser/detect",
  "ui/viewModels/userSettings/preferenceMapping"
], function (e, t) {
  var n = e("lodash-compat"), r = e("swx-enums"), i = e("constants/common"), s = e("swx-i18n").localization, o = e("browser/detect"), u = e("ui/viewModels/userSettings/preferenceMapping").templates, a = i.userSettings.preferences;
  t.getPrefCategory = function (e, t, r) {
    var i = r;
    return e in t ? (i = t[e].category, i) : (n.keys(t).some(function (n) {
      if (!!e.match(n))
        return i = t[n].category, !0;
    }), i);
  }, t.getPrefTemplate = function (e, t) {
    var n = t[e.id];
    if (n && n.template)
      return n.template;
    switch (e.type) {
    case r.preferenceType.Boolean:
      return u.TOGGLE;
    case r.preferenceType.CallPolicy:
    case r.preferenceType.VideoPolicy:
      return u.SELECT;
    default:
      return null;
    }
  }, t.getPrefTitle = function (e, t) {
    var n = t[e];
    return n && n.titleKey ? s.fetch({ key: n.titleKey }) : e.match(a.DYNAMIC_DISCOVERY) ? e.replace(a.DYNAMIC_DISCOVERY + "-", "") : s.fetch({
      key: "settings_unknownOption_title",
      params: { id: e }
    });
  }, t.getPrefSecondaryText = function (e, t) {
    var n = t[e];
    return n && typeof n.altTextKey != "undefined" ? n.altTextKey === "" ? null : s.fetch({ key: n.altTextKey }) : s.fetch({
      key: "settings_unknownOption_alt_text",
      params: { id: e }
    });
  }, t.isPrefSupported = function (e, t) {
    function r() {
      return !!t[e];
    }
    function i() {
      return t[e].hasOwnProperty("supportedBrowsers");
    }
    function s() {
      return n.indexOf(t[e].supportedBrowsers, o.getBrowserInfo().browserName) !== -1;
    }
    return r() && (!i() || s());
  }, t.isUnlistedCategory = function (e, t, n, r) {
    function i() {
      return n.indexOf(t) !== -1;
    }
    function s() {
      return r.indexOf(e) !== -1;
    }
    return i() || s();
  };
})
