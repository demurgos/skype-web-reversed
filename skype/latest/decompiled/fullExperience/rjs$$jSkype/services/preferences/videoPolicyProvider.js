define("jSkype/services/preferences/videoPolicyProvider", [
  "require",
  "lodash-compat",
  "jSkype/services/preferences/flagsServiceProvider",
  "swx-enums",
  "utils/common/builderMixin"
], function (e) {
  function s() {
    this.allowVideoCallsFromContactsOnly = n.build(r.skypeFlagsApiMappings.ALLOW_VIDEO_CALLS_FROM_CONTACTS_ONLY);
    this.dontAllowVideoCalls = n.build(r.skypeFlagsApiMappings.DONT_ALLOW_VIDEO_CALLS);
    this.cachedValue = null;
  }
  var t = e("lodash-compat"), n = e("jSkype/services/preferences/flagsServiceProvider"), r = e("swx-enums"), i = e("utils/common/builderMixin");
  return s.prototype.read = function () {
    var t = this;
    return Promise.all([
      this.allowVideoCallsFromContactsOnly.read(),
      this.dontAllowVideoCalls.read()
    ]).then(function (e) {
      var n = e[0], i = e[1];
      return i ? (n && t.allowVideoCallsFromContactsOnly.update(!1), t.cachedValue = r.privacyPolicyValues.NoOne) : n ? t.cachedValue = r.privacyPolicyValues.ContactsOnly : t.cachedValue = r.privacyPolicyValues.Anyone;
    });
  }, s.prototype.update = function (t) {
    var n = this, i = t === r.privacyPolicyValues.NoOne, s = t === r.privacyPolicyValues.ContactsOnly, o = [];
    return (s || this.cachedValue === r.privacyPolicyValues.ContactsOnly || this.cachedValue === null) && o.push(this.allowVideoCallsFromContactsOnly.update(s)), (i || this.cachedValue === r.privacyPolicyValues.NoOne || this.cachedValue === null) && o.push(this.dontAllowVideoCalls.update(i)), Promise.all([o]).then(function () {
      n.cachedValue = t;
    });
  }, t.assign(s, i), s;
});
