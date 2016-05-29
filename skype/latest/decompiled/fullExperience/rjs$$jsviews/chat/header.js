define("jsviews/chat/header", [
  "require",
  "browser/dom",
  "constants/keys",
  "constants/common"
], function (e) {
  function o(e) {
    function u(e) {
      e.keyCode === n.ESCAPE && (e.stopPropagation(), o.abandonEditMode());
    }
    function a() {
      e.removeEventListener("keydown", u);
      document.removeEventListener(r.events.browser.CLICK, f, !0);
    }
    function f(e) {
      var n = !t.getParentWithClass(e.target, i) && t.getParentWithClass(e.target, s);
      n && o.abandonEditMode();
    }
    var o;
    this.init = function (e) {
      o = e;
    };
    this.dispose = function () {
      a();
    };
    this.onEditModeToggled = function (t) {
      t ? (e.addEventListener("keydown", u), document.addEventListener(r.events.browser.CLICK, f, !0)) : a();
    };
    this.onTopicEdit = function () {
      t.getElement(".editTopic input.edit", e).select();
    };
  }
  var t = e("browser/dom"), n = e("constants/keys"), r = e("constants/common"), i = "conversationHeader", s = "swx-container";
  return o;
});
