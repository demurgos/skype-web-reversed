(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/search/match", [
      "require",
      "exports",
      "swx-utils-common",
      "./match/multiWord",
      "./match/singleWord",
      "../propertyValidator"
    ], e);
}(function (e, t) {
  function u(e, r) {
    var i = null;
    return s.isPhoneNumber(r) ? e.phoneNumbers().some(function (s) {
      t.phoneNumberRule.property = s;
      var o = f(t.phoneNumberRule, n.stringUtils.normalize(s.displayString()), n.stringUtils.normalize(r), e);
      return o ? (i = o, !0) : !1;
    }) : o.some(function (t) {
      var s = e[t.property](), o = f(t, n.stringUtils.normalize(s), n.stringUtils.normalize(r), e);
      return o ? (i = o, !0) : !1;
    }), i;
  }
  function a(e, t) {
    return e.rank ? t.rank + e.rank : t.rank;
  }
  function f(e, t, r, i) {
    var s = e.method.func(n.stringUtils.normalize(t), n.stringUtils.normalize(r));
    return s ? {
      rank: a(s, e),
      property: e.property,
      sortString: i.displayName(),
      person: i
    } : null;
  }
  var n = e("swx-utils-common"), r = e("./match/multiWord"), i = e("./match/singleWord"), s = e("../propertyValidator");
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
  t.get = u;
  t.getMatch = f;
}));
