define("jSkype/models/file", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "jcafe-property-model",
  "constants/common",
  "swx-enums",
  "jSkype/settings",
  "jSkype/utils/chat/generator",
  "jSkype/services/asyncMedia/main",
  "telemetry/chat/telemetryEnumerator",
  "swx-i18n"
], function (e, t) {
  function c(e, t) {
    function h(e) {
      c.name._set(e.name), c.size._set(e.size), c.state._set(s.fileUploadState.Uploading);
    }
    var c = this;
    c._send = function (p) {
      function y() {
        v.status._set(s.activityStatus.Succeeded), c.state._set(s.fileUploadState.Sent), d.resolve(), T(!0);
      }
      function b(e) {
        v.status._set(s.activityStatus.Failed), c.state._set(s.fileUploadState.Failed), d.reject(e), T(!1, e);
      }
      function w(e, t) {
        v.shouldAbort() && t.abort(), e.lengthComputable && (v.progress(e.loaded / e.total * 100), c.progress._set(v.progress()));
      }
      function E(e) {
        c.icon._set(e);
        if (p.isImage()) {
          var t = e.match(/(.+)(\/.+\/.+)$/i)[1];
          v._uri = t, v.thumbnailUrl.get();
        }
      }
      function S() {
        function n(t) {
          v = u.outgoingPictureActivityItem(e), e.historyService._addOutgoingMessage(v);
          if (t.size > i.fileTransfer.MAX_PHOTO_SIZE) {
            b("Upload file size is too big");
            return;
          }
          a.sendFile(e.conversationId, t, r, b, w, E);
        }
        function r(n) {
          v.documentId._set(n), t.sendPhotoSharingMessage(e, v, n, c.name(), y, b);
        }
        return { send: n };
      }
      function x() {
        function n(t) {
          var n = o.isFeatureOn(i.featureFlags.FILE_TRANSFER_ENABLED);
          if (!n) {
            var s = l.fetch({ key: "file_transfer_upload_not_supported" });
            v = u.outgoingTextMessageActivityItem({ content: s }, e), e.historyService._addOutgoingMessage(v), b("Feature is disabled");
            return;
          }
          v = u.outgoingFileActivityItem(t, e), e.historyService._addOutgoingMessage(v);
          if (t.size > i.fileTransfer.MAX_FILE_SIZE) {
            b("Upload file size is too big");
            return;
          }
          a.sendFile(e.conversationId, t, r, b, w, E);
        }
        function r(n) {
          v.documentId._set(n), t.sendFileTransferMessage(e, v, n, c.name(), c.size(), y, b);
        }
        return { send: n };
      }
      function T(e, t) {
        var r = n.get()._telemetryManager, s = i.telemetry.chat.FILE_TRANSFER, u = c.name().match(/[0-9a-z]+$/i)[0].toLowerCase(), a = {
            success: e,
            type: u,
            fileTypeGroup: f.getFileTypeGroup(u),
            size: c.size()
          };
        t && (a.reason = t), r.sendEvent(o.settings.telemetry.jSkypeTenantToken, s, a);
      }
      p.isImage = function () {
        var e = [
          "image/png",
          "image/x-png",
          "image/jpeg"
        ];
        return e.some(function (e) {
          return p.type && p.type === e;
        });
      };
      var d = r.task(), v, m = p.isImage(), g = m ? S() : x();
      return h(p), g.send(p), d.promise;
    }, c.name = r.property({ readOnly: !0 }), c.size = r.property({
      readOnly: !0,
      value: 0
    }), c.icon = r.property({ readOnly: !0 }), c.progress = r.property({
      readOnly: !0,
      value: 0
    }), c.state = r.property({ readOnly: !0 }), c.cancel = r.disabledCommand(), c.pause = r.disabledCommand(), c.resume = r.disabledCommand();
  }
  var n = e("jSkype/client"), r = e("jcafe-property-model"), i = e("constants/common"), s = e("swx-enums"), o = e("jSkype/settings"), u = e("jSkype/utils/chat/generator"), a = e("jSkype/services/asyncMedia/main"), f = e("telemetry/chat/telemetryEnumerator"), l = e("swx-i18n").localization;
  t.build = function (e, t) {
    return new c(e, t);
  };
})
