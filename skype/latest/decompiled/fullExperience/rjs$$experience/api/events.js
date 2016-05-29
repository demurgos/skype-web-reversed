define("experience/api/events", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "services/serviceLocator",
  "constants/common"
], function (e, t) {
  var n = e("lodash-compat"), r = e("services/serviceLocator"), i = e("constants/common");
  t.subscribeUI = function (e, t) {
    var s = r.resolve(i.serviceLocator.PUBSUB);
    if (!n.isString(e) || !n.isFunction(t))
      throw new TypeError("invalid arguments; expected an event name (String) and callback (Function)");
    s.subscribe(e, t);
  };
});
