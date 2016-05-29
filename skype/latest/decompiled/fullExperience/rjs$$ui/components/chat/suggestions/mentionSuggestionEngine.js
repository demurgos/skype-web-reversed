define("ui/components/chat/suggestions/mentionSuggestionEngine", [
  "require",
  "lodash-compat",
  "constants/common",
  "ui/components/chat/suggestions/mentionSuggestion",
  "ui/modelHelpers/personHelper",
  "services/serviceLocator",
  "swx-utils-common"
], function (e) {
  function a() {
    var e = s.resolve(n.serviceLocator.FEATURE_FLAGS);
    this.isEnabled = e.isFeatureOn(n.featureFlags.MENTIONS_ENABLED);
    this.matchImplicitByContains = e.isFeatureOn(n.featureFlags.AGGRESSIVE_IMPLICT_MENTIONS_MATCHING);
  }
  function f(e, n) {
    if (!e)
      return !1;
    var r = new RegExp(t.escapeRegExp(n), "i");
    return o.normalize(e).search(r) !== -1;
  }
  var t = e("lodash-compat"), n = e("constants/common"), r = e("ui/components/chat/suggestions/mentionSuggestion"), i = e("ui/modelHelpers/personHelper"), s = e("services/serviceLocator"), o = e("swx-utils-common").stringUtils, u = 4;
  return a.prototype.priority = 1, a.prototype.filterParticipants = function (t, n, r) {
    function u(e) {
      return !i.isPstn(e.person) && (o.anyWordStartsWith(e.person.displayName(), r) || o.anyWordStartsWith(e.person.id(), r));
    }
    function a(e) {
      return !i.isPstn(e.person) && (f(e.person.displayName(), r) || f(e.person.id(), r));
    }
    var s = n || this.matchImplicitByContains ? a : u;
    return t.filter(s);
  }, a.prototype.getSuggestions = function (t, n) {
    if (!t.conversationModel.isGroupConversation() || !this.isEnabled)
      return {
        isExplicit: !1,
        suggestions: []
      };
    var i = t.getSelectionStart(), s = t.conversationModel.participants(), a = o.wordAt(t.messageBody(), i), f = a[0] === "@";
    f && (a = a.substring(1));
    if (!f && a.length < u)
      return {
        isExplicit: f,
        suggestions: []
      };
    var l = this.filterParticipants(s, f, a);
    return l.length === 1 && f && a === l[0].person.id() && (l = []), {
      isExplicit: f,
      suggestions: l.map(function (e) {
        return r.build(t, n, i, e);
      })
    };
  }, a;
});
