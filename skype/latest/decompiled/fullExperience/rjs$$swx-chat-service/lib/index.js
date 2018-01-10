(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-chat-service/lib/index", [
      "require",
      "exports",
      "./utils/conversationMetadataStore",
      "./utils/lockAndKey",
      "./constants",
      "./utils/exponentialTimeout",
      "./utils/sanitizer",
      "msr-crypto",
      "./builders/requestOptionsBuilder",
      "./builders/headerSelector",
      "./calls/service",
      "./boundary/facade",
      "./boundary/dispatcher",
      "./builders/requestURIBuilder",
      "./actions/handlers"
    ], e);
}(function (e, t) {
  function v(e, t, n, i, s, o, v, m, g, y, b, w, E, S, x) {
    function A(e) {
      return new h["default"](e, s);
    }
    var T = new u.sha256Auth(), N = new r["default"](T), C = new f["default"](n._skypeToken, i), k = new a["default"](C, t), L = new l["default"](p, k, e, i, S);
    return C.setLockAndKey(N.generate()), new c["default"](A, d, L, o, v, C, m, g, s, y, b, w, E, x, n);
  }
  var n = e("./utils/conversationMetadataStore"), r = e("./utils/lockAndKey"), i = e("./constants"), s = e("./utils/exponentialTimeout"), o = e("./utils/sanitizer"), u = e("msr-crypto"), a = e("./builders/requestOptionsBuilder"), f = e("./builders/headerSelector"), l = e("./calls/service"), c = e("./boundary/facade"), h = e("./boundary/dispatcher"), p = e("./builders/requestURIBuilder"), d = e("./actions/handlers");
  t.__esModule = !0;
  t["default"] = v;
  t.utils = {
    conversationMetadataStore: new n["default"](),
    exponentialTimeout: s,
    sanitizer: o,
    LockAndKey: r["default"]
  };
  t.constants = i;
}));
