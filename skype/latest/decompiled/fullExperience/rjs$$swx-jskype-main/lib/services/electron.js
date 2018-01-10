(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/electron", [
      "require",
      "exports",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  function r() {
    return n.getWindow().Skype.getSkypeModule();
  }
  function i(e, t) {
    return n.getWindow().Skype.registerPresence(e, t);
  }
  function s() {
    return n.getWindow().Skype && n.getWindow().Skype.refreshAuthentication;
  }
  function o() {
    return s() ? n.getWindow().Skype.refreshAuthentication().then(function (e) {
      return Promise.resolve({ token: e });
    }) : Promise.reject("");
  }
  var n = e("swx-browser-globals");
  t.getSkypeModule = r;
  t.registerPresence = i;
  t.isRefreshAuthenticationAvailable = s;
  t.refreshAuthentication = o;
}));
