(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-constants/lib/keys", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  t.__esModule = !0;
  t["default"] = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    ESCAPE: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    NUMBER_0: 48,
    NUMBER_9: 57,
    NUMPAD_0: 96,
    NUMPAD_9: 105,
    A: 65,
    G: 71,
    H: 72,
    J: 74,
    K: 75,
    L: 76,
    Z: 90,
    F6: 117,
    F10: 121
  };
}));
