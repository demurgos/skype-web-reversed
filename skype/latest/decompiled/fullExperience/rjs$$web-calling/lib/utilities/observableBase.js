(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("web-calling/lib/utilities/observableBase", [
      "require",
      "exports",
      "./events"
    ], e);
}(function (e, t) {
  var n = e("./events"), r = function (e) {
      function t() {
        return e !== null && e.apply(this, arguments) || this;
      }
      return __extends(t, e), t.prototype.changed = function (e) {
        return this.subscribe({
          changed: e,
          on: null
        });
      }, t.prototype.on = function (e, t) {
        return this.subscribe({
          changed: null,
          on: {
            name: e,
            handler: t
          }
        });
      }, t.prototype.once = function (e, t) {
        var n, r = function (e) {
            n.dispose();
            t(e);
          };
        return n = this.on(e, r), n;
      }, t.prototype.raiseChanged = function (e) {
        this.raiseEvents(function (t) {
          return t.changed && t.changed(e);
        });
      }, t.prototype.raiseEvent = function (e, t) {
        this.raiseEvents(function (n) {
          return n.on && n.on.name === e && n.on.handler(t);
        });
      }, t;
    }(n.EventSourceImpl);
  t.__esModule = !0;
  t["default"] = r;
}));
