(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/extensions/extensionsManager", [
      "require",
      "exports",
      "./extensionFactory",
      "../common/utils"
    ], e);
}(function (e, t) {
  var n = e("./extensionFactory"), r = e("../common/utils"), i = function () {
      function e() {
        this.extensions = [];
        this.listeners = {};
      }
      return e.prototype.dispose = function () {
        this.extensions.map(function (e) {
          return e.dispose();
        });
        this.extensions = [];
        this.listeners = {};
      }, e.prototype.addExtension = function (e, t) {
        t.manager || (t.manager = this);
        var r = n["default"].getExtension(e);
        r.initialize(t);
        this.extensions.push(r);
      }, e.prototype.getExtension = function (e) {
        return r["default"].find(this.extensions, function (t) {
          return t.getType() === e;
        });
      }, e.prototype.configureExtension = function (e, t) {
        var n = this.getExtension(e);
        n && n.configure(t);
      }, e.prototype.processNotification = function (e, t) {
        var n = this.listeners[e];
        n && n.forEach(function (n) {
          n.onNotification(e, t);
        });
      }, e.prototype.addNotificationListener = function (e, t) {
        this.listeners[t] || (this.listeners[t] = []);
        this.listeners[t].push(e);
      }, e.prototype.removeNotificationListener = function (e, t) {
        var n = this.listeners[t];
        if (!n)
          return;
        var r = n.indexOf(e);
        r >= 0 && n.splice(r, 1);
        n.length || delete this.listeners[t];
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = i;
}));
