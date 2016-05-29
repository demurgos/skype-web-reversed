define("ui/telemetry/actions/registry/singleton", [
  "require",
  "exports",
  "module",
  "ui/telemetry/actions/registry/api"
], function (e, t) {
  var n = e("ui/telemetry/actions/registry/api"), r;
  t.getInstance = function () {
    return r || (r = new n()), r;
  };
});
