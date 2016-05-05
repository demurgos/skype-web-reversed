define("ui/viewModels/chat/fileTransferActivityActions", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-enums",
  "constants/common",
  "swx-i18n",
  "vendor/knockout",
  "experience/settings",
  "browser/dom",
  "cafe/applicationInstance",
  "swx-flags-service-api",
  "browser/detect",
  "ui/modalDialog/downloadFileConfirmationDialog"
], function (e, t) {
  function p(e) {
    if (!e.message)
      throw new Error("Message is not provided");
    if (!e.onabort)
      throw new Error("Abort handler is not provided");
    var t = this, p = e.message, d = e.onabort;
    t.fileUri = p.fileUri, t.fileName = p.fileName, t.isPending = o.computed(function () {
      return p.status() === r.activityStatus.Pending;
    }), t.errorMessage = o.observable(), t.isFailed = o.computed(function () {
      var e = p.status() === r.activityStatus.Failed, n = p.shouldAbort();
      return t.errorMessage(s.fetch({ key: "file_transfer_upload_failed" })), p.model.fileSize > i.fileTransfer.MAX_FILE_SIZE && t.errorMessage(s.fetch({ key: "file_transfer_upload_too_large_warning" })), e && !n;
    }), t.downloadButtonTitle = s.fetch({
      key: "file_transfer_download_button_title",
      params: { filename: p.model.fileName }
    }), t.abort = function () {
      d();
    }, t.downloadFile = function () {
      function s(e) {
        if (e && r) {
          v();
          return;
        }
        h.start(p.fileName, p.author.displayName(), d, r);
      }
      function o(e) {
        return e = e.trim().toLowerCase(), e === p.fileType || e === "." + p.fileType;
      }
      function d() {
        v();
      }
      function v() {
        var e = a.createElement("a");
        e.download = t.fileName, e.href = t.fileUri();
        if (c.getBrowserInfo().isIeEngine) {
          e.click();
          return;
        }
        var n = new MouseEvent("click", {
          view: window,
          bubbles: !0,
          cancelable: !0
        });
        return e.dispatchEvent(n);
      }
      var e = u.cloudFileSharing.unsafeFileTypes.split(","), r = !n.any(e, o);
      return f.get().signInManager._skypeToken().then(function (e) {
        l.build(u.flagsApiUrl).read(i.fileTransfer.FILE_DOWNLOAD_WARNING_FLAG_API_ID, e).then(s);
      });
    }, t.progressIndicatorBG = o.computed(function () {
      var e = p.progress(), t = 90, n = "#FFF", r = "#333", i = e <= 50 ? r : n, s = Math.floor(e * 3.6) + t, o = e <= 50 ? -t : t, u = e === 0 ? 0 : 50, a = "linear-gradient(" + o + "deg, transparent " + u + "%, " + i + " 50%)," + "linear-gradient(" + s + "deg, " + n + " 50%, transparent 50%)";
      return a;
    }), t.dispose = function () {
      t.progressIndicatorBG.dispose(), t.isPending.dispose(), t.isFailed.dispose();
    };
  }
  var n = e("lodash-compat"), r = e("swx-enums"), i = e("constants/common"), s = e("swx-i18n").localization, o = e("vendor/knockout"), u = e("experience/settings"), a = e("browser/dom"), f = e("cafe/applicationInstance"), l = e("swx-flags-service-api"), c = e("browser/detect"), h = e("ui/modalDialog/downloadFileConfirmationDialog");
  t.build = function (e) {
    return new p(e);
  };
})
