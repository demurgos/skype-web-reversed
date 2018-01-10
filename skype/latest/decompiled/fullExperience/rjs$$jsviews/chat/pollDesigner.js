define("jsviews/chat/pollDesigner", [
  "require",
  "browser/dom",
  "swx-focus-handler"
], function (e) {
  function s(e) {
    var s = t.getElement(".poll-designer-content", e), o = t.getElement("textarea", e);
    this.scrollToBottom = function () {
      s.scrollTop = s.scrollHeight - s.clientHeight;
    };
    this.focusPollQuestion = function () {
      n.get().addFocusRequestToQueue(o);
    };
    this.initPollQuestion = function () {
      o.style.height = i + "px";
    };
    this.updatePollQuestion = function () {
      var e;
      o.style.height = "auto";
      e = Math.max(i, Math.min(o.scrollHeight, r));
      o.style.height = e + "px";
    };
  }
  var t = e("browser/dom"), n = e("swx-focus-handler"), r = 150, i = 19;
  return s;
});
