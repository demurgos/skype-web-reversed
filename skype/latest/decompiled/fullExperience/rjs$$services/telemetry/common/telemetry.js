define("services/telemetry/common/telemetry", [
  "require",
  "exports",
  "module",
  "services/telemetry/eventBus",
  "services/telemetry/skypeData"
], function (e, t) {
  function i(e) {
    return function (t) {
      var n = e ? e(t) : t;
      r.push(n);
    };
  }
  var n = e("services/telemetry/eventBus"), r = e("services/telemetry/skypeData");
  t.instrumentEvent = function (e, t) {
    n.get().subscribe(e, i(t));
  };
  t.instrumentAllEvents = function (e) {
    Object.keys(e).forEach(function (n) {
      t.instrumentEvent(n, e[n]);
    });
  };
});
