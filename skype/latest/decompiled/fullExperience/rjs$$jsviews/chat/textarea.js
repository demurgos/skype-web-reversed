define("jsviews/chat/textarea", [
  "require",
  "browser/dom"
], function (e) {
  function s(e, s) {
    function a() {
      try {
        var e = u.placeholder, t = window.getComputedStyle(u), n = document.createElement("canvas").getContext("2d");
        return n.font = t.fontSize + " " + t.fontFamily, n.measureText(e).width > parseInt(t.width) ? 2 * parseInt(t.lineHeight) : parseInt(t.lineHeight);
      } catch (r) {
        return 0;
      }
    }
    var o = this, u = t.getElement("textarea", e);
    s = t.getElement(s);
    o.updateSizing = function () {
      var e;
      u.style.height = "30px";
      e = u.value === "" ? a() : u.scrollHeight;
      e = Math.max(r, Math.min(e, i));
      u.style.height = e + "px";
    };
    o.setCaretToEnd = function () {
      u.focus();
      if (typeof u.selectionStart == "number") {
        u.selectionStart = u.selectionEnd = u.value.length;
        return;
      }
      if (typeof u.createTextRange != "undefined") {
        var e = u.createTextRange();
        e.collapse(!1);
        e.select();
      }
    };
    o.getSelectionStart = function () {
      return u.selectionStart;
    };
    o.getSelectionEnd = function () {
      return u.selectionEnd;
    };
    o.setCursorAt = function (e) {
      u.selectionStart = e;
      u.selectionEnd = e;
    };
    o.editing = function (e) {
      e ? s.addClass(n) : s.removeClass(n);
    };
  }
  var t = e("browser/dom"), n = "EDITING", r = 30, i = 180;
  return s;
});
