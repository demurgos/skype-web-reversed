define("jSkype/modelHelpers/contacts/dataProcessors/authorization", [
  "require",
  "jSkype/constants/people",
  "jSkype/modelHelpers/contacts/authorizationChange",
  "jSkype/modelHelpers/personsRegistry/instance"
], function (e) {
  function i(e) {
    this.process = function (r) {
      r.forEach(function (r) {
        r._authorization() === t.UNKNOWN && (n.setAuthorization(r, t.UNAUTHORIZED), e.add(r));
      });
    };
  }
  var t = e("jSkype/constants/people").authorizationStates, n = e("jSkype/modelHelpers/contacts/authorizationChange"), r = e("jSkype/modelHelpers/personsRegistry/instance");
  return {
    build: function () {
      var e = r.build();
      return new i(e);
    }
  };
});
