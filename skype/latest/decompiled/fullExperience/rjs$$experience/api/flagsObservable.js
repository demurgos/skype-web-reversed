define("experience/api/flagsObservable", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-constants",
  "vendor/knockout",
  "swx-service-locator-instance",
  "experience/settings"
], function (e, t) {
  var n = e("lodash-compat"), r = e("swx-constants").COMMON, i = e("vendor/knockout"), s = e("swx-service-locator-instance").default, o = e("experience/settings");
  t.expose = function () {
    function a(e) {
      e === "" ? o.flags = "[]" : o.flags = e;
    }
    var e = i.observable(""), t = s.resolve(r.serviceLocator.PUBSUB), u = {
        read: e,
        write: a
      };
    return t.subscribe(r.events.flags.SET_FLAG, function (t) {
      if (!n.isString(t))
        throw new TypeError("invalid arguments; expected a flag name (String)");
      e(t);
    }), { flags: i.computed(u) };
  };
});
