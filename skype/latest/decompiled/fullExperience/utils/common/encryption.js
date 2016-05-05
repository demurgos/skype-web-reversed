define("utils/common/encryption", [
  "require",
  "exports",
  "module",
  "utils/common/msCryptoAdapter",
  "browser/window"
], function (e, t) {
  function u(e) {
    var t = 60000, n = [], r = [];
    if (e.length <= t)
      return Array.apply(null, e);
    for (var i = 0, s = e.length; i < s; i += t)
      n.push(e.subarray(i, i + t));
    return n.forEach(function (e) {
      r = r.concat(Array.apply(null, e));
    }), r;
  }
  function a(e) {
    var t = new Uint8Array(e.length);
    for (var n = 0; n < e.length; n++)
      t[n] = e.charCodeAt(n);
    return t;
  }
  function f(e) {
    var t = 60000, n = [], r = new Uint8Array(e), i = "";
    if (r.length <= t)
      return String.fromCharCode.apply(null, r);
    for (var s = 0, o = r.length; s < o; s += t)
      n.push(r.subarray(s, s + t));
    return n.forEach(function (e) {
      i = i.concat(String.fromCharCode.apply(null, e));
    }), i;
  }
  function l(e, t) {
    return {
      data: f(t),
      iv: u(e)
    };
  }
  var n = e("utils/common/msCryptoAdapter"), r = e("browser/window"), i = "Aes-cbc", s = [
      "encrypt",
      "decrypt"
    ], o;
  r.crypto ? r.crypto.webkitSubtle ? o = {
    crypto: {
      getRandomValues: r.crypto.getRandomValues.bind(r.crypto),
      subtle: r.crypto.webkitSubtle
    },
    importedKeyProcessor: a,
    exportedKeyProcessor: f
  } : o = {
    crypto: r.crypto,
    importedKeyProcessor: JSON.parse,
    exportedKeyProcessor: JSON.stringify
  } : o = {
    crypto: n,
    importedKeyProcessor: a,
    exportedKeyProcessor: f
  }, t.generateEncryptionKey = function () {
    return o.crypto.subtle.generateKey({
      name: i,
      length: 256
    }, !0, s);
  }, t.exportEncryptionKey = function (e) {
    return o.crypto.subtle.exportKey("jwk", e).then(o.exportedKeyProcessor);
  }, t.importEncryptionKey = function (e) {
    return o.crypto.subtle.importKey("jwk", o.importedKeyProcessor(e), { name: i }, !0, s);
  }, t.encrypt = function (e, t) {
    var n, r = { name: i };
    return new Promise(function (i, s) {
      function u(e) {
        i(l(r.iv, e));
      }
      try {
        n = a(encodeURI(JSON.stringify(t)));
      } catch (f) {
        s(f);
        return;
      }
      r.iv = o.crypto.getRandomValues(new Uint8Array(16)), o.crypto.subtle.encrypt(r, e, n).then(u, s);
    });
  }, t.decrypt = function (e, t) {
    var n, r;
    return !t || !t.data ? Promise.reject("Invalid encrypted data") : (n = {
      name: i,
      iv: new Uint8Array(t.iv)
    }, r = a(t.data), new Promise(function (t, i) {
      function s(e) {
        try {
          t(JSON.parse(decodeURI(f(e))));
        } catch (n) {
          i(n);
          return;
        }
      }
      o.crypto.subtle.decrypt(n, e, r).then(s, i);
    }));
  };
})
