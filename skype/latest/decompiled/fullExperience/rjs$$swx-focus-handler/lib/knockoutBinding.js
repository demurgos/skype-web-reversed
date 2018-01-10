(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-focus-handler/lib/knockoutBinding", [
      "require",
      "exports",
      "./focusHandler"
    ], e);
}(function (e, t) {
  function r(e) {
    var t = n.get();
    e.bindingHandlers.focusHandler = {
      init: function (e, n) {
        var r = n();
        t.addFocusRequestToQueue(e, r.priority).then(function (e) {
          r.callback && r.callback(function () {
            t.addFocusRequestToQueue(e, r.priority);
          });
        });
      }
    };
  }
  var n = e("./focusHandler");
  t.register = r;
}));
