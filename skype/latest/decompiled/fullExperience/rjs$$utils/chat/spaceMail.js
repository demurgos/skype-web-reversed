define("utils/chat/spaceMail", [
  "require",
  "exports",
  "module",
  "swx-i18n"
], function (e, t) {
  function r() {
    return encodeURI(n.fetch({ key: "spaces_email_subject" }));
  }
  function i(e, t) {
    var r = n.fetch({ key: "spaces_email_greeting" }), i = n.fetch({
        key: "spaces_email_joinMe",
        params: { spaceName: e }
      }), s = n.fetch({ key: "spaces_email_link" });
    return encodeURI(r + "\r\n\r\n" + i + "\r\n" + s + " " + t);
  }
  var n = e("swx-i18n").localization;
  t.createMailtoLink = function (e, t) {
    return "mailto:?subject=" + r() + "&body=" + i(e, t);
  };
})
