define("jSkype/models/group", [
  "require",
  "jcafe-property-model",
  "swx-enums"
], function (e) {
  function r(e, r) {
    e = e || n.groupType.Root;
    this.type = t.property({
      readOnly: !0,
      value: e
    });
    this.name = t.property({ value: i(r, e) });
    this.uri = t.property({ readOnly: !0 });
    this.avatarUrl = t.property();
    this.relationshipLevel = t.property({
      readOnly: !0,
      value: n.groupPrivacyRelationshipLevel.None
    });
    this.persons = t.collection();
    this.groups = t.collection();
  }
  function i(e, t) {
    var r, i = Boolean(n.groupType[e]);
    if (!e || i)
      r = t;
    else {
      if (!!i || !s(t))
        throw new Error("Invalid type/name combination");
      r = e;
    }
    return r;
  }
  function s(e) {
    return e === n.groupType.Custom;
  }
  var t = e("jcafe-property-model"), n = e("swx-enums");
  return r;
});
