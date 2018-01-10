define("utils/common/clipboard", [], function () {
  function n(n) {
    e = document.createElement("input");
    e.readOnly = !0;
    e.style.display = "none";
    var i = document.getElementById("swxContent1");
    return i ? i.appendChild(e) : document.body.appendChild(e), t.copyText = r, t.copyText(n);
  }
  function r(t) {
    e.style.display = "";
    e.value = t;
    e.focus();
    e.setSelectionRange(0, t.length);
    var n = !1;
    try {
      n = document.execCommand("copy");
    } catch (r) {
    }
    return e.style.display = "none", n;
  }
  function i() {
    var e = !1;
    try {
      e = document.queryCommandSupported("copy");
    } catch (t) {
    }
    return e;
  }
  var e, t = {
      copyText: n,
      isCopySupportedByBrowser: i,
      _reset: function () {
        t.copyText = n;
      }
    };
  return t;
});
