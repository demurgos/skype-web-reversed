define("utils/common/prefetcher", [
  "require",
  "ui/controls/calling/sounds"
], function (e) {
  function i() {
    var e = document.createDocumentFragment();
    s(e);
    document.head.appendChild(e);
  }
  function s(e) {
    r.forEach(function (r) {
      n.forEach(function (n) {
        var i = t.buildSoundAssetUrl(r, n);
        o(e, i);
      });
    });
  }
  function o(e, t) {
    var n = u(t);
    e.appendChild(n);
  }
  function u(e) {
    var t = document.createElement("link");
    return t.rel = "prefetch", t.href = e, t;
  }
  function a(e) {
    var t = [], n = e.length;
    for (var r = 0; r < n; r++) {
      var i = new Image();
      i.src = e[r];
      t[r] = i;
    }
  }
  var t = e("ui/controls/calling/sounds"), n = [
      "m4a",
      "ogg"
    ], r = [
      t.KEYS.CALL_ANSWER,
      t.KEYS.CALL_DIALING,
      t.KEYS.CALL_OUTGOING_P1,
      t.KEYS.CALL_OUTGOING_P2,
      t.KEYS.CALL_INCOMING,
      t.KEYS.MESSAGE_RECEIVED_1
    ];
  return {
    prefetchAssets: i,
    prefetchImages: a
  };
});
