(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/group", [
      "require",
      "exports",
      "jcafe-property-model",
      "swx-enums"
    ], e);
}(function (e, t) {
  function s(e, t) {
    var n, i = Boolean(r.groupType[e]);
    if (!e || i)
      n = t;
    else {
      if (!!i || !o(t))
        throw new Error("Invalid type/name combination");
      n = e;
    }
    return n;
  }
  function o(e) {
    return e === r.groupType.Custom;
  }
  var n = e("jcafe-property-model"), r = e("swx-enums"), i = function () {
      function e(e, t) {
        this.uri = n.property({ readOnly: !0 });
        this.avatarUrl = n.property();
        this.relationshipLevel = n.property({
          readOnly: !0,
          value: r.groupPrivacyRelationshipLevel.None
        });
        this.persons = n.collection();
        this.groups = n.collection();
        e = e || r.groupType.Root;
        this.type = n.property({
          readOnly: !0,
          value: e
        });
        this.name = n.property({ value: s(t, e) });
      }
      return e;
    }();
  t.__esModule = !0;
  t["default"] = i;
}));
