define("utils/common/logTracer/bufferingWriter", [
  "require",
  "exports",
  "module",
  "utils/common/logTracer/helpers"
], function (e, t) {
  function r(e, t, r) {
    function i(i, s, o) {
      var u = new Date().toUTCString(), a = o[0], f = n.getFormattedMessage(o), l = "[" + u + "][" + s + "][" + a + "]" + " " + f;
      if (e)
        try {
          e[i]("[" + u + "]", a + " -> " + f);
        } catch (c) {
        }
      t.addMessage(l);
      "error" === s && r.addMessage(l);
    }
    this.log = function () {
      return i("log", "log", arguments);
    };
    this.info = function () {
      return i("info", "info", arguments);
    };
    this.warn = function () {
      return i("warn", "warn", arguments);
    };
    this.error = function () {
      return i("error", "error", arguments);
    };
    this.debug = function () {
      return i("log", "debug", arguments);
    };
  }
  var n = e("utils/common/logTracer/helpers");
  t.build = function (e, t, n) {
    return new r(e, t, n);
  };
});
