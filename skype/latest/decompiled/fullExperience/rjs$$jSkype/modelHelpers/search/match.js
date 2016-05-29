define("jSkype/modelHelpers/search/match", [
  "require",
  "exports",
  "module",
  "swx-utils-common",
  "jSkype/modelHelpers/search/match/multiWord",
  "jSkype/modelHelpers/search/match/singleWord",
  "jSkype/modelHelpers/propertyValidator"
], function (e, t) {
  function u(e, t) {
    return e.rank ? t.rank + e.rank : t.rank;
  }
  var n = e("swx-utils-common").stringUtils, r = e("jSkype/modelHelpers/search/match/multiWord"), i = e("jSkype/modelHelpers/search/match/singleWord"), s = e("jSkype/modelHelpers/propertyValidator");
  t.displayNameRule = {
    property: "displayName",
    rank: 1,
    method: r
  };
  t.idRule = {
    property: "id",
    rank: 2,
    method: i
  };
  t.phoneNumberRule = {
    property: "phoneNumber",
    rank: 0,
    method: i
  };
  var o = [
    t.displayNameRule,
    t.idRule
  ];
  t.get = function (e, r) {
    var i = null;
    return s.isPhoneNumber(r) ? e.phoneNumbers().some(function (s) {
      t.phoneNumberRule.property = s;
      var o = t.getMatch(t.phoneNumberRule, n.normalize(s.displayString()), n.normalize(r), e);
      if (o)
        return i = o, !0;
    }) : o.some(function (s) {
      var o = e[s.property](), u = t.getMatch(s, n.normalize(o), n.normalize(r), e);
      if (u)
        return i = u, !0;
    }), i;
  };
  t.getMatch = function (e, t, r, i) {
    var s = null, o = e.method.func(n.normalize(t), n.normalize(r));
    return o && (s = {}, s.rank = u(o, e), s.property = e.property, s.sortString = i.displayName(), s.person = i), s;
  };
});
