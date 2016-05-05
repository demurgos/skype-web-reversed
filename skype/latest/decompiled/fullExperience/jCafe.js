define("jCafe", [
  "require",
  "lodash-compat",
  "jSkype/root",
  "services/telemetry/common/telemetryContext",
  "services/telemetry/eventBus",
  "telemetry/chat/messagesCollector"
], function (e) {
  var t = e("lodash-compat"), n = e("jSkype/root"), r = e("services/telemetry/common/telemetryContext"), i = e("services/telemetry/eventBus"), s = e("telemetry/chat/messagesCollector"), o = t.clone(n);
  return o.Application = function (e) {
    e = e || {};
    var o = t.clone(e);
    return o.telemetry = {
      context: r.get(),
      messagesCollector: s.get(),
      eventBus: i.get()
    }, new n.Application(o);
  }, o.Application.create = o.Application, o;
})
