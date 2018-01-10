define("experience/welcomeExperience", [
  "require",
  "exports",
  "module",
  "experience/settings",
  "browser/window",
  "swx-cafe-application-instance",
  "swx-i18n"
], function (e, t) {
  function o() {
    function e(e, t) {
      return Math.floor(Math.random() * (t - e + 1)) + e;
    }
    i.get().personsAndGroupsManager.mePerson.id.get().then(function (t) {
      var o = n.welcomeExperience.whitelist.some(function (e) {
        var n = new RegExp(e);
        return n.test(t);
      });
      o && r.setTimeout(function () {
        i.get().replayMessage(s.fetch({ key: "welcome_im_display_name" }), s.fetch({ key: "welcome_im_first_message" }), s.fetch({ key: "welcome_im_reply_message" }), s.fetch({ key: "welcome_im_toast_message" }));
      }, e(n.welcomeExperience.minDelayBeforeFirstMessage, n.welcomeExperience.maxDelayBeforeFirstMessage));
    });
  }
  var n = e("experience/settings"), r = e("browser/window"), i = e("swx-cafe-application-instance"), s = e("swx-i18n").localization;
  t.init = function () {
    n.welcomeExperience.enabled && i.get().replayMessage.enabled.once(!0, o);
  };
});
