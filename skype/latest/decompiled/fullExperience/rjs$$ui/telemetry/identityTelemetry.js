define("ui/telemetry/identityTelemetry", [
  "require",
  "exports",
  "module",
  "browser/window",
  "swx-enums",
  "swx-cafe-application-instance"
], function (e, t) {
  function o(e) {
    e.setCommonProperty("user_id", u, s.Identity);
    e.setCommonProperty("signed_in", a);
  }
  function u() {
    var e = "ANONYMOUS";
    if (i.get().signInManager.state() === r.loginState.SignedIn)
      try {
        e = i.get().personsAndGroupsManager.mePerson.id();
      } catch (t) {
      }
    return e;
  }
  function a() {
    var e = 0;
    try {
      e = i.get().signInManager.state() === r.loginState.SignedIn ? 1 : 0;
    } catch (t) {
    }
    return e;
  }
  var n = e("browser/window"), r = e("swx-enums"), i = e("swx-cafe-application-instance"), s;
  t.addIdentityToAllEvents = function (e) {
    s = s || n.skypeTelemetryManager.PIIType;
    o(e);
  };
});
