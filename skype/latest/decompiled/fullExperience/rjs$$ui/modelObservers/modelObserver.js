define("ui/modelObservers/modelObserver", [
  "require",
  "exports",
  "module",
  "notifications/notificationObserversFactory",
  "ui/modelObservers/calling/callStateObserver"
], function (e, t) {
  function i() {
    function t() {
      var t = [];
      return n.getObservers().forEach(function (e) {
        t.push(e);
      }), t.push(e.conversationsCallStateObserver), t;
    }
    var e = this;
    e.conversationsCallStateObserver = r.build(), e.observe = function (e) {
      t().forEach(function (t) {
        t.observe(e);
      });
    };
  }
  var n = e("notifications/notificationObserversFactory"), r = e("ui/modelObservers/calling/callStateObserver");
  t.build = function () {
    return new i();
  };
})
