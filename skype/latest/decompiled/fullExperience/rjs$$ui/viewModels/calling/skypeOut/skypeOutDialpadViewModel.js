define("ui/viewModels/calling/skypeOut/skypeOutDialpadViewModel", [
  "require",
  "lodash-compat",
  "constants/common",
  "utils/common/eventMixin",
  "utils/common/eventHelper",
  "constants/keys"
], function (e) {
  function o() {
    function u(i, s) {
      var u, a;
      return r ? (a = s && o ? s - o > t : !1, a && (u = r.attributes.getNamedItem("data-secondary")), u || (u = r.attributes.getNamedItem("data-key")), u && e.dispatchEvent(n.events.skypeOut.DIAL_BUTTON_CLICKED, {
        text: u.value,
        inputType: i
      }), r = null, o = null, !1) : !1;
    }
    var e = this, t = 600, r, o;
    e.onMouseDown = function (e, t) {
      return r = t.currentTarget, o = t.timeStamp, !0;
    };
    e.onTouchStart = function (e, t) {
      return r = t.currentTarget, o = t.timeStamp, !1;
    };
    e.onKeyDown = function (e, t) {
      var n = i.getKeyCode(t);
      return n !== s.SPACE ? !0 : r ? !1 : (r = t.currentTarget, o = t.timeStamp, !1);
    };
    e.onKeyUp = function (e, t) {
      return u(n.events.skypeOut.INPUT_TYPE_KEYBOARD, t.timeStamp), !0;
    };
    e.onTouchEnd = function (e, t) {
      u(n.events.skypeOut.INPUT_TYPE_TOUCH, t.timeStamp);
    };
    e.onMouseUp = function (e, t) {
      u(n.events.skypeOut.INPUT_TYPE_MOUSE, t.timeStamp);
    };
  }
  var t = e("lodash-compat"), n = e("constants/common"), r = e("utils/common/eventMixin"), i = e("utils/common/eventHelper"), s = e("constants/keys");
  return t.assign(o.prototype, r), o;
});
