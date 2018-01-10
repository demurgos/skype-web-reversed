define("experience/api/events", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-service-locator-instance",
  "swx-constants"
], function (e, t) {
  var n = e("lodash-compat"), r = e("swx-service-locator-instance").default, i = e("swx-constants").COMMON;
  t.subscribeUI = function (e, t) {
    var s = r.resolve(i.serviceLocator.PUBSUB);
    if (!n.isString(e) || !n.isFunction(t))
      throw new TypeError("invalid arguments; expected an event name (String) and callback (Function)");
    s.subscribe(e, t);
  };
});
