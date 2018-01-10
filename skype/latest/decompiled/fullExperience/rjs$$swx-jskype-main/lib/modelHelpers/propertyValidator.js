(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/propertyValidator", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function r(e) {
    return n.isString(e) && /^19:/.test(e);
  }
  function i(e) {
    return n.isString(e) && (/^\+?\d+$/.test(e) || /^4:/.test(e));
  }
  function s(e) {
    return n.isString(e) && /^(1|8|(28)):/.test(e);
  }
  var n = e("lodash-compat");
  t.isGroupConversation = r;
  t.isPhoneNumber = i;
  t.is1to1Conversation = s;
}));
