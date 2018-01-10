(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-util-encryption/lib/msCryptoAdapter", [
      "require",
      "exports",
      "global-portable",
      "msr-crypto"
    ], e);
}(function (e, t) {
  function i(e) {
    return new Promise(function (t, n) {
      e.oncomplete = function (e) {
        t(e.target.result);
      };
      e.onerror = n;
    });
  }
  var n = e("global-portable");
  typeof n["default"].window == "undefined" && (n["default"].window = {
    addEventListener: function () {
    }
  });
  typeof n["default"].XMLHttpRequest == "undefined" && (n["default"].XMLHttpRequest = function () {
    function e() {
    }
    return e;
  }());
  var r = e("msr-crypto");
  r.aes.subtle.forceSync = !0;
  t.getRandomValues = r.aes.getRandomValues;
  var s;
  (function (e) {
    function t(e, t, n) {
      return i(r.aes.subtle.generateKey(e, t, n));
    }
    function n(e, t) {
      return i(r.aes.subtle.exportKey(e, t));
    }
    function s(e, t, n, s, o) {
      return i(r.aes.subtle.importKey(e, t, n, s, o));
    }
    function o(e, t, n) {
      return i(r.aes.subtle.encrypt(e, t, n));
    }
    function u(e, t, n) {
      return i(r.aes.subtle.decrypt(e, t, n));
    }
    e.generateKey = t;
    e.exportKey = n;
    e.importKey = s;
    e.encrypt = o;
    e.decrypt = u;
  }(s = t.subtle || (t.subtle = {})));
}));
