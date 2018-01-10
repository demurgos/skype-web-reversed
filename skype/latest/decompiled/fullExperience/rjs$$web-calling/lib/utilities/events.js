(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("web-calling/lib/utilities/events", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  var n = e("lodash-compat"), r = function () {
      function e() {
        this.subscriptions = [];
      }
      return e.prototype.subscribe = function (e) {
        return new i(this.subscriptions, e);
      }, e.prototype.dispose = function () {
        this.subscriptions = [];
      }, e.prototype.raiseEvents = function (e) {
        var t = this.subscriptions.slice();
        t.forEach(function (t) {
          return e(t.eventHandler);
        });
      }, e;
    }();
  t.EventSourceImpl = r;
  var i = function () {
    function e(e, t) {
      this.subscriptions = e;
      this.eventHandler = t;
      this.subscriptions.push(this);
    }
    return e.prototype.dispose = function () {
      var e = this;
      n.remove(this.subscriptions, function (t) {
        return t === e;
      });
    }, e;
  }();
}));
