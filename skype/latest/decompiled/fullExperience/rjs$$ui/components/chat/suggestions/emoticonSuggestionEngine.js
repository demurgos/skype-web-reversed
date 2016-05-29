define("ui/components/chat/suggestions/emoticonSuggestionEngine", [
  "require",
  "lodash-compat",
  "constants/common",
  "ui/components/chat/suggestions/emoticonSuggestion",
  "services/pes/constants",
  "services/serviceLocator",
  "swx-utils-common"
], function (e) {
  function a() {
    var e = s.resolve(n.serviceLocator.FEATURE_FLAGS);
    this.isEnabled = e.isFeatureOn(n.featureFlags.EMOTICON_SUGGESTION_ENABLED);
    this.isImplicitEnabled = !e.isFeatureOn(n.featureFlags.EMOTICON_IMPLICIT_SUGGESTION_DISABLED);
    this.suggestHidden = e.isFeatureOn(n.featureFlags.SUGGEST_HIDDEN_EMOTICONS);
  }
  function f(e, n) {
    return t.any(n.shortcuts, function (t) {
      return t === e;
    });
  }
  var t = e("lodash-compat"), n = e("constants/common"), r = e("ui/components/chat/suggestions/emoticonSuggestion"), i = e("services/pes/constants"), s = e("services/serviceLocator"), o = e("swx-utils-common").stringUtils, u = 4;
  return a.prototype.priority = 2, a.prototype.filterEmoticons = function (r) {
    var u = s.resolve(n.serviceLocator.PES_CONFIG_SERVICE), a = u.getConfiguration().items, f = this.suggestHidden;
    return a.reduce(function (e, n) {
      if (n.type !== i.itemTypes.emoticon.id || !n.visible && !f)
        return e;
      var s = t.any(n.keywords.concat(n.description), function (e) {
        return o.anyWordStartsWith(e, r);
      });
      if (s)
        return e.push({
          emoticon: n,
          shortcut: n.shortcuts[0]
        }), e;
      var u = t.find(n.shortcuts, function (e) {
        return o.anyWordStartsWith(e, r);
      });
      return u && e.push({
        emoticon: n,
        shortcut: u
      }), e;
    }, []);
  }, a.prototype.getSuggestions = function (t, n) {
    if (!this.isEnabled)
      return {
        isExplicit: !1,
        suggestions: []
      };
    var i = t.getSelectionStart(), s = o.wordAt(t.messageBody(), i), a = s.indexOf("(") === 0;
    a && (s = s.substring(1));
    if (!a && (s.length < u || !this.isImplicitEnabled))
      return {
        isExplicit: a,
        suggestions: []
      };
    var l = this.filterEmoticons(s);
    return l.length === 1 && a && f("(" + s, l[0].emoticon) && (l = []), {
      isExplicit: a,
      suggestions: l.map(function (e) {
        return r.build(t, n, i, e.emoticon, e.shortcut);
      })
    };
  }, a;
});
