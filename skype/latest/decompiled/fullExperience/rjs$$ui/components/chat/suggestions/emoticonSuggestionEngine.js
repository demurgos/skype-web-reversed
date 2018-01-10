define("ui/components/chat/suggestions/emoticonSuggestionEngine", [
  "require",
  "lodash-compat",
  "swx-constants",
  "ui/components/chat/suggestions/emoticonSuggestion",
  "services/pes/constants",
  "swx-service-locator-instance",
  "swx-cafe-application-instance",
  "swx-utils-common"
], function (e) {
  function f() {
    var e = s.resolve(n.serviceLocator.FEATURE_FLAGS);
    this.isEnabled = e.isFeatureOn(n.featureFlags.EMOTICON_SUGGESTION_ENABLED);
    this.isImplicitEnabled = !e.isFeatureOn(n.featureFlags.EMOTICON_IMPLICIT_SUGGESTION_DISABLED);
    this.suggestHidden = e.isFeatureOn(n.featureFlags.SUGGEST_HIDDEN_EMOTICONS);
    this.canBeDisabledInSettings = e.isFeatureOn(n.featureFlags.SHOW_EMOTICON_SUGGESTIONS_SETTINGS);
  }
  function l(e, n) {
    return t.any(n.shortcuts, function (t) {
      return t === e;
    });
  }
  var t = e("lodash-compat"), n = e("swx-constants").COMMON, r = e("ui/components/chat/suggestions/emoticonSuggestion"), i = e("services/pes/constants"), s = e("swx-service-locator-instance").default, o = e("swx-cafe-application-instance"), u = e("swx-utils-common").stringUtils, a = 4;
  return f.prototype.priority = 2, f.prototype.filterEmoticons = function (r) {
    var o = s.resolve(n.serviceLocator.PES_CONFIG_SERVICE), a = o.getConfiguration().items, f = this.suggestHidden;
    return a.reduce(function (e, n) {
      if (n.type !== i.itemTypes.emoticon.id || !n.visible && !f)
        return e;
      var s = t.any(n.keywords.concat(n.description), function (e) {
        return u.anyWordStartsWith(e, r);
      });
      if (s)
        return e.push({
          emoticon: n,
          shortcut: n.shortcuts[0]
        }), e;
      var o = t.find(n.shortcuts, function (e) {
        return u.anyWordStartsWith(e, r);
      });
      return o && e.push({
        emoticon: n,
        shortcut: o
      }), e;
    }, []);
  }, f.prototype.getSuggestions = function (t, i) {
    if (!this.isEnabled)
      return {
        isExplicit: !1,
        suggestions: []
      };
    if (this.canBeDisabledInSettings) {
      var s = o.get().personsAndGroupsManager.mePerson, f = s.preferences(n.userSettings.preferences.EMOTICON_SUGGESTIONS).value();
      if (!f)
        return {
          isExplicit: !1,
          suggestions: []
        };
    }
    var c = t.getSelectionStart(), h = u.wordAt(t.messageBody(), c), p = h.indexOf("(") === 0;
    p && (h = h.substring(1));
    if (!p && (h.length < a || !this.isImplicitEnabled))
      return {
        isExplicit: p,
        suggestions: []
      };
    var d = this.filterEmoticons(h);
    return d.length === 1 && p && l("(" + h, d[0].emoticon) && (d = []), {
      isExplicit: p,
      suggestions: d.map(function (e) {
        return r.build(t, i, c, e.emoticon, e.shortcut);
      })
    };
  }, f;
});
