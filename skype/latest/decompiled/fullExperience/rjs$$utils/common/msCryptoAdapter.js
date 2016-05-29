define("utils/common/msCryptoAdapter", [
  "require",
  "exports",
  "module",
  "msr-crypto"
], function (e, t) {
  function r(e) {
    return new Promise(function (t, n) {
      e.oncomplete = function (e) {
        t(e.target.result);
      };
      e.onerror = n;
    });
  }
  var n = e("msr-crypto").aes;
  n.subtle.forceSync = !0;
  t.getRandomValues = n.getRandomValues;
  t.subtle = {
    generateKey: function (t, i, s) {
      return r(n.subtle.generateKey(t, i, s));
    },
    exportKey: function (t, i) {
      return r(n.subtle.exportKey(t, i));
    },
    importKey: function (t, i, s, o, u) {
      return r(n.subtle.importKey(t, i, s, o, u));
    },
    encrypt: function (t, i, s) {
      return r(n.subtle.encrypt(t, i, s));
    },
    decrypt: function (t, i, s) {
      return r(n.subtle.decrypt(t, i, s));
    }
  };
});
