define("experience/api/flagsObservable", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "constants/common",
  "vendor/knockout",
  "services/serviceLocator",
  "experience/settings"
], function (e, t) {
  var n = e("lodash-compat"), r = e("constants/common"), i = e("vendor/knockout"), s = e("services/serviceLocator"), o = e("experience/settings");
  t.expose = function () {
    var e = i.observable(""), t = s.resolve(r.serviceLocator.PUBSUB);
    return t.subscribe(r.events.flags.SET_FLAG, function (t) {
      if (!n.isString(t))
        throw new TypeError("invalid arguments; expected a flag name (String)");
      e(o.version + "/" + t);
    }), { setFlag: e };
  };
})
