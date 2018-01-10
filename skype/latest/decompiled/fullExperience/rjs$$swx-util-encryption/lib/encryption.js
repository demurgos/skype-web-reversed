(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-util-encryption/lib/encryption", [
      "require",
      "exports",
      "./msCryptoAdapter",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  function a(e) {
    var t = 60000, n = [], r = [];
    if (e.length <= t)
      return Array.apply(null, e);
    for (var i = 0, s = e.length; i < s; i += t)
      n.push(e.subarray(i, i + t));
    return n.forEach(function (e) {
      r = r.concat(Array.apply(null, e));
    }), r;
  }
  function f(e) {
    var t = new Uint8Array(e.length);
    for (var n = 0; n < e.length; n++)
      t[n] = e.charCodeAt(n);
    return t;
  }
  function l(e) {
    var t = 60000, n = [], r = new Uint8Array(e), i = "";
    if (r.length <= t)
      return String.fromCharCode.apply(null, r);
    for (var s = 0, o = r.length; s < o; s += t)
      n.push(r.subarray(s, s + t));
    return n.forEach(function (e) {
      i = i.concat(String.fromCharCode.apply(null, e));
    }), i;
  }
  function c(e, t) {
    return {
      data: l(t),
      iv: a(e)
    };
  }
  function h() {
    return u.crypto.subtle.generateKey({
      name: s,
      length: 256
    }, !0, o);
  }
  function p(e) {
    return u.crypto.subtle.exportKey("jwk", e).then(u.exportedKeyProcessor);
  }
  function d(e) {
    return u.crypto.subtle.importKey("jwk", u.importedKeyProcessor(e), { name: s }, !0, o);
  }
  function v(e, t) {
    var n = { name: s };
    try {
      var r = f(encodeURI(JSON.stringify(t)));
      return n.iv = u.crypto.getRandomValues(new Uint8Array(16)), u.crypto.subtle.encrypt(n, e, r).then(function (e) {
        return c(n.iv, e);
      })["catch"](function () {
      });
    } catch (i) {
      return Promise.reject(i);
    }
  }
  function m(e, t) {
    if (!t || !t.data || !t.iv)
      return Promise.reject("Invalid encrypted data");
    try {
      var n = {
        name: s,
        iv: new Uint8Array(t.iv)
      };
      return u.crypto.subtle.decrypt(n, e, f(t.data)).then(function (e) {
        var t = l(e);
        return t ? JSON.parse(decodeURI(t)) : {};
      })["catch"](function () {
      });
    } catch (r) {
      return Promise.reject(r);
    }
  }
  var n = e("./msCryptoAdapter"), r = e("swx-browser-globals"), i = r.getWindow(), s = "Aes-cbc", o = [
      "encrypt",
      "decrypt"
    ], u;
  i && i.crypto ? i.crypto.webkitSubtle ? u = {
    crypto: {
      getRandomValues: i.crypto.getRandomValues.bind(i.crypto),
      subtle: i.crypto.webkitSubtle
    },
    importedKeyProcessor: f,
    exportedKeyProcessor: l
  } : u = {
    crypto: i.crypto,
    importedKeyProcessor: JSON.parse,
    exportedKeyProcessor: JSON.stringify
  } : u = {
    crypto: n,
    importedKeyProcessor: f,
    exportedKeyProcessor: l
  };
  t.generateEncryptionKey = h;
  t.exportEncryptionKey = p;
  t.importEncryptionKey = d;
  t.encrypt = v;
  t.decrypt = m;
}));
