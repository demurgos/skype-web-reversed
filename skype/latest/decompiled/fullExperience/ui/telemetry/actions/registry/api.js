define("ui/telemetry/actions/registry/api", [
  "require",
  "ui/telemetry/actions/registry/traceableAction"
], function (e) {
  function n() {
    function n(t) {
      delete e[t];
    }
    var e = {};
    this.createAction = function (r) {
      return e[r.actionName] = t.build(r, n.bind(undefined, r.actionName)), e[r.actionName];
    }, this.getAction = function (t) {
      return e[t];
    };
  }
  var t = e("ui/telemetry/actions/registry/traceableAction");
  return n;
})
