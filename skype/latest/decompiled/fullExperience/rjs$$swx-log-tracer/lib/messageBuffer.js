(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-log-tracer/lib/messageBuffer", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n() {
    var e, t, n = {
        clear: function () {
          e = [];
          t = 0;
        },
        addMessage: function (n) {
          t += n.length;
          e.push(n);
        },
        toString: function () {
          return e.join("\n");
        }
      };
    return n.clear(), n;
  }
  t.build = n;
}));
