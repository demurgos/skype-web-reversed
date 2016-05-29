define("ui/viewModels/experience/welcomeDialog", [
  "require",
  "exports",
  "module",
  "experience/settings"
], function (e, t) {
  function i(e) {
    this.cookiesPrivacyUrl = n.cookiesPrivacyUrl;
    this.close = function () {
      e();
    };
  }
  var n = e("experience/settings"), r = "swx-overlayWelcome";
  t.ELEMENT_ID = r;
  t.build = function (e) {
    return new i(e);
  };
});
