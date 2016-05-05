define("utils/common/eventHelper", [
  "require",
  "exports",
  "module",
  "constants/keys"
], function (e, t) {
  function i() {
  }
  function s(e) {
    e.preventDefault();
  }
  function o(e) {
    return e.which || e.keyCode;
  }
  function u(e) {
    return l(e) ? r[o(e)] : !1;
  }
  function a(e) {
    var t = o(e);
    return t === n.ENTER || t === n.SPACE;
  }
  function f(e) {
    var t = o(e);
    return t >= n.NUMBER_0 && t <= n.NUMBER_9 || t >= n.A && t <= n.Z;
  }
  function l(e) {
    var t = o(e);
    return t >= n.NUMPAD_0 && t <= n.NUMPAD_9;
  }
  function c(e) {
    var t = o(e);
    return t === n.ESCAPE;
  }
  var n = e("constants/keys"), r = {
      96: "0",
      97: "1",
      98: "2",
      99: "3",
      100: "4",
      101: "5",
      102: "6",
      103: "7",
      104: "8",
      105: "9"
    };
  i.prototype.emit = function () {
  }, i.prototype.done = function () {
  }, t.swallow = s, t.getKeyCode = o, t.getNumpadKey = u, t.isActivation = a, t.isAlphaNumericKey = f, t.isNumPadKey = l, t.emptyEmitter = new i(), t.isDeactivation = c;
})
