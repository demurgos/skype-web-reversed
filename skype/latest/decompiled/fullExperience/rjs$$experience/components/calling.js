define("experience/components/calling", [
  "require",
  "exports",
  "module",
  "services/telemetry/common/telemetry",
  "services/telemetry/common/instrumentation",
  "services/telemetry/calling.instrumentation.eventTypes",
  "constants/common",
  "constants/calling",
  "services/serviceLocator",
  "ui/controls/calling/endCallControl",
  "ui/controls/calling/micControl",
  "ui/components/calling/index",
  "ui/components/registrar"
], function (e, t) {
  function h() {
    var e = r.create(i);
    n.instrumentAllEvents(e);
  }
  var n = e("services/telemetry/common/telemetry"), r = e("services/telemetry/common/instrumentation"), i = e("services/telemetry/calling.instrumentation.eventTypes"), s = e("constants/common"), o = e("constants/calling"), u = e("services/serviceLocator"), a = e("ui/controls/calling/endCallControl"), f = e("ui/controls/calling/micControl"), l = e("ui/components/calling/index"), c = e("ui/components/registrar");
  t.init = function (e) {
    var t = u.resolve(s.serviceLocator.FEATURE_FLAGS), n = u.resolve(s.serviceLocator.CONTROLS_BUILDER);
    n.register(a);
    n.register(f);
    c.register(l);
    t.isFeatureOn(o.FEATURE_FLAGS.CALLING) && h();
    e();
  };
});
