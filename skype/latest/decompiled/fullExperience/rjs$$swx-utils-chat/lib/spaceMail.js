(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-chat/lib/spaceMail", [
      "require",
      "exports",
      "swx-i18n"
    ], e);
}(function (e, t) {
  function r() {
    return encodeURI(n.localization.fetch({ key: "spaces_email_subject" }));
  }
  function i(e, t) {
    var r = n.localization.fetch({ key: "spaces_email_greeting" }), i = n.localization.fetch({
        key: "spaces_email_joinMe",
        params: { spaceName: e }
      }), s = n.localization.fetch({ key: "spaces_email_link" });
    return encodeURI(r + "\r\n\r\n" + i + "\r\n" + s + " " + t);
  }
  function s(e, t) {
    return "mailto:?subject=" + r() + "&body=" + i(e, t);
  }
  var n = e("swx-i18n");
  t.createMailtoLink = s;
}));
