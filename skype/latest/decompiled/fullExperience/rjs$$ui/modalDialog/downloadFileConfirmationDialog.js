define("ui/modalDialog/downloadFileConfirmationDialog", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "constants/common",
  "experience/settings",
  "swx-i18n",
  "ui/modalDialog/confirmationDialog",
  "text!views/chat/downloadFileConfirmationDialog.html",
  "swx-flags-service-api",
  "cafe/applicationInstance"
], function (e, t) {
  function l(e, t, r) {
    var i = r ? "file_transfer_download_safe_file_dialog_text" : "file_transfer_download_unsafe_file_dialog_text";
    this.isSafetype = r;
    this.text = s.fetch({
      key: i,
      params: {
        filename: e,
        author: t
      }
    });
    this.stopShowingAgain = n.observable(!1);
  }
  var n = e("vendor/knockout"), r = e("constants/common"), i = e("experience/settings"), s = e("swx-i18n").localization, o = e("ui/modalDialog/confirmationDialog"), u = e("text!views/chat/downloadFileConfirmationDialog.html"), a = e("swx-flags-service-api"), f = e("cafe/applicationInstance");
  t.start = function (e, t, n, c) {
    function v() {
      n && n();
      if (p.stopShowingAgain())
        return f.get().signInManager._skypeToken().then(m);
    }
    function m(e) {
      a.build(i.flagsApiUrl).update(r.fileTransfer.FILE_DOWNLOAD_WARNING_FLAG_API_ID, !0, e);
    }
    var h, p = new l(e, t, c), d = c ? "file_transfer_download_safe_file_dialog_title" : "file_transfer_download_unsafe_file_dialog_title";
    h = o.build({
      title: s.fetch({ key: d }),
      content: u,
      contentViewModel: p,
      onConfirm: v,
      confirmButtonTitle: s.fetch({ key: "file_transfer_download_dialog_confirm_button_title" })
    });
    h.show();
  };
});
