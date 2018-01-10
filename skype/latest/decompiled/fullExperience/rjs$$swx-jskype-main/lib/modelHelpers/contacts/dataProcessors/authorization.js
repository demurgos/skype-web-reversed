(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataProcessors/authorization", [
      "require",
      "exports",
      "../../../modelHelpers/contacts/authorizationChange",
      "../../../modelHelpers/personsRegistry/instance",
      "jskype-constants"
    ], e);
}(function (e, t) {
  function u() {
    return new o();
  }
  var n = e("../../../modelHelpers/contacts/authorizationChange"), r = e("../../../modelHelpers/personsRegistry/instance"), i = e("jskype-constants"), s = i.PEOPLE.authorizationStates, o = function () {
      function e() {
        var e = this;
        this.registry = r.build();
        this.process = function (t) {
          t.forEach(function (t) {
            t._authorization() === s.UNKNOWN && (n.setAuthorization(t, s.UNAUTHORIZED), e.registry.add(t));
          });
        };
      }
      return e;
    }();
  t.AuthorizationProcessor = o;
  t.build = u;
}));
