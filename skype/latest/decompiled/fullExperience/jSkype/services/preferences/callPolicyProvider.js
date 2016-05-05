define("jSkype/services/preferences/callPolicyProvider", [
  "require",
  "lodash-compat",
  "jSkype/services/preferences/optionsServiceProvider",
  "swx-enums",
  "utils/common/builderMixin"
], function (e) {
  function s() {
    n.call(this, "OPT_SKYPE_CALL_POLICY");
  }
  var t = e("lodash-compat"), n = e("jSkype/services/preferences/optionsServiceProvider"), r = e("swx-enums"), i = e("utils/common/builderMixin");
  return s.prototype.read = function () {
    return n.prototype.read.call(this).then(function (e) {
      return e === 2 ? r.privacyPolicyValues.ContactsOnly : r.privacyPolicyValues.Anyone;
    });
  }, s.prototype.update = function (e) {
    return n.prototype.update.call(this, e === r.privacyPolicyValues.ContactsOnly ? 2 : 0);
  }, t.assign(s, i), s;
})
