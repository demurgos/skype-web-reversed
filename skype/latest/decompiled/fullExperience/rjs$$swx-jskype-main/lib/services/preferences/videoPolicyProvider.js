(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/preferences/videoPolicyProvider", [
      "require",
      "exports",
      "../../../lib/services/preferences/flagsServiceProvider",
      "swx-enums"
    ], e);
}(function (e, t) {
  function s() {
    return new i();
  }
  var n = e("../../../lib/services/preferences/flagsServiceProvider"), r = e("swx-enums"), i = function () {
      function e() {
        this.allowVideoCallsFromContactsOnly = n.build(r.skypeFlagsApiMappings.ALLOW_VIDEO_CALLS_FROM_CONTACTS_ONLY);
        this.dontAllowVideoCalls = n.build(r.skypeFlagsApiMappings.DONT_ALLOW_VIDEO_CALLS);
        this.cachedValue = null;
      }
      return e.prototype.read = function () {
        var e = this;
        return Promise.all([
          this.allowVideoCallsFromContactsOnly.read(),
          this.dontAllowVideoCalls.read()
        ]).then(function (t) {
          var n = t[0], i = t[1];
          return i ? (n && e.allowVideoCallsFromContactsOnly.update(!1), e.cachedValue = r.privacyPolicyValues.NoOne) : n ? e.cachedValue = r.privacyPolicyValues.ContactsOnly : e.cachedValue = r.privacyPolicyValues.Anyone;
        });
      }, e.prototype.update = function (e) {
        var t = this, n = e === r.privacyPolicyValues.NoOne, i = e === r.privacyPolicyValues.ContactsOnly, s = [];
        return (i || this.cachedValue === r.privacyPolicyValues.ContactsOnly || this.cachedValue === null) && s.push(this.allowVideoCallsFromContactsOnly.update(i)), (n || this.cachedValue === r.privacyPolicyValues.NoOne || this.cachedValue === null) && s.push(this.dontAllowVideoCalls.update(n)), Promise.all([s]).then(function () {
          return t.cachedValue = e, undefined;
        });
      }, e;
    }();
  t.VideoPolicyProvider = i;
  t.build = s;
}));
