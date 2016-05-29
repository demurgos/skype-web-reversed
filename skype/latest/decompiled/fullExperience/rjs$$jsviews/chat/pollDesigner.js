define("jsviews/chat/pollDesigner", [
  "require",
  "browser/dom"
], function (e) {
  function i(e) {
    var i = t.getElement(".poll-designer-content", e), s = t.getElement("textarea", e);
    this.scrollToBottom = function () {
      i.scrollTop = i.scrollHeight - i.clientHeight;
    };
    this.focusPollQuestion = function () {
      s.focus();
    };
    this.initPollQuestion = function () {
      s.style.height = r + "px";
    };
    this.updatePollQuestion = function () {
      var e;
      s.style.height = "auto";
      e = Math.max(r, Math.min(s.scrollHeight, n));
      s.style.height = e + "px";
    };
  }
  var t = e("browser/dom"), n = 150, r = 19;
  return i;
});
