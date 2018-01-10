define("jsviews/chat/textarea", [
  "require",
  "browser/dom",
  "swx-focus-handler"
], function (e) {
  function u(e, u) {
    function h() {
      try {
        var e = l.placeholder, t = window.getComputedStyle(l), n = document.createElement("canvas").getContext("2d");
        return n.font = t.fontSize + " " + t.fontFamily, n.measureText(e).width > parseInt(t.width) ? 2 * parseInt(t.lineHeight) : parseInt(t.lineHeight);
      } catch (r) {
        return 0;
      }
    }
    var a = this, f = e, l = t.getElement("textarea", e), c = t.getElementById("chatInputContainer", e);
    u = t.getElement(u);
    a.updateSizing = function () {
      var e, n, r = t.getElementById("quoteContainer", f), u = c && c.scrollTop;
      l.style.height = i + "px";
      e = l.value === "" ? h() : l.scrollHeight;
      e = Math.max(i, e);
      l.style.height = e + "px";
      if (!c)
        return;
      n = e + o + (r ? r.scrollHeight : 0);
      n < s ? c.style.height = n + "px" : (c.style.height = s + "px", c.scrollTop = u);
    };
    a.setCaretToEnd = function () {
      n.get().addFocusRequestToQueue(l);
      if (typeof l.selectionStart == "number") {
        l.selectionStart = l.selectionEnd = l.value.length;
        return;
      }
      if (typeof l.createTextRange != "undefined") {
        var e = l.createTextRange();
        e.collapse(!1);
        e.select();
      }
    };
    a.getSelectionStart = function () {
      return l.selectionStart;
    };
    a.getSelectionEnd = function () {
      return l.selectionEnd;
    };
    a.setCursorAt = function (e) {
      l.selectionStart = e;
      l.selectionEnd = e;
    };
    a.editing = function (e) {
      e ? u.addClass(r) : u.removeClass(r);
    };
  }
  var t = e("browser/dom"), n = e("swx-focus-handler"), r = "EDITING", i = 30, s = 180, o = 9;
  return u;
});
