(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/file", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jcafe-property-model",
      "swx-constants",
      "swx-enums",
      "jskype-settings-instance",
      "../../lib/utils/chat/generator",
      "../../lib/services/asyncMedia/main",
      "swx-telemetry-buckets",
      "swx-i18n"
    ], e);
}(function (e, t) {
  function h(e, t) {
    return new c(e, t);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jcafe-property-model"), i = e("swx-constants"), s = e("swx-enums"), o = e("jskype-settings-instance"), u = e("../../lib/utils/chat/generator"), a = e("../../lib/services/asyncMedia/main"), f = e("swx-telemetry-buckets"), l = e("swx-i18n"), c = function () {
      function e(e, t) {
        var c = this;
        this.name = r.property({ readOnly: !0 });
        this.size = r.property({
          readOnly: !0,
          value: 0
        });
        this.icon = r.property({ readOnly: !0 });
        this.progress = r.property({
          readOnly: !0,
          value: 0
        });
        this.state = r.property({ readOnly: !0 });
        this.cancel = r.disabledCommand();
        this.pause = r.disabledCommand();
        this.resume = r.disabledCommand();
        this._send = function (e) {
          e.isImage = function () {
            var t = [
              "image/png",
              "image/x-png",
              "image/jpeg"
            ];
            return t.some(function (t) {
              return e.type && e.type === t;
            });
          };
          var t = r.task(), h, p = e.isImage(), d = function () {
              h.status._set(s.activityStatus.Succeeded);
              c.state._set(s.fileUploadState.Sent);
              t.resolve();
              w(!0);
            }, v = function (e) {
              h.status._set(s.activityStatus.Failed);
              c.state._set(s.fileUploadState.Failed);
              t.reject(e);
              w(!1, e);
            }, m = function (e, t) {
              h.shouldAbort() && t.abort();
              e.lengthComputable && (h.progress(e.loaded / e.total * 100), c.progress._set(h.progress()));
            }, g = function (t) {
              c.icon._set(t);
              if (e.isImage()) {
                var n = t.match(/(.+)(\/.+\/.+)$/i)[1];
                h._uri = n;
                h.thumbnailUrl.get();
              }
            }, y = function () {
              var e = function (e) {
                  h = u.outgoingPictureActivityItem(c.conversation);
                  c.conversation.historyService._addOutgoingMessage(h);
                  if (e.size > i.COMMON.fileTransfer.MAX_PHOTO_SIZE) {
                    v("Upload file size is too big");
                    return;
                  }
                  a.get().sendFile(c.conversation.conversationId, e, m, g).then(t, v);
                }, t = function (e) {
                  h.documentId._set(e);
                  c.apiHandler.sendPhotoSharingMessage(c.conversation, h, e, c.name(), d, v);
                };
              return { send: e };
            }, b = function () {
              var e = function (e) {
                  var n = o.isFeatureOn(i.COMMON.featureFlags.FILE_TRANSFER_ENABLED);
                  if (!n) {
                    var r = l.localization.fetch({ key: "file_transfer_upload_not_supported" });
                    h = u.outgoingTextMessageActivityItem({ content: r }, c.conversation);
                    c.conversation.historyService._addOutgoingMessage(h);
                    v("Feature is disabled");
                    return;
                  }
                  h = u.outgoingFileActivityItem(e, c.conversation);
                  c.conversation.historyService._addOutgoingMessage(h);
                  if (e.size > i.COMMON.fileTransfer.MAX_FILE_SIZE) {
                    v("Upload file size is too big");
                    return;
                  }
                  a.get().sendFile(c.conversation.conversationId, e, m, g).then(t, v);
                }, t = function (e) {
                  h.documentId._set(e);
                  c.apiHandler.sendFileTransferMessage(c.conversation, h, e, c.name(), c.size(), d, v);
                };
              return { send: e };
            }, w = function (e, t) {
              var r = n.get()._telemetryManager, s = i.COMMON.telemetry.chat.FILE_TRANSFER, u = c.name().match(/[0-9a-z]+$/i)[0].toLowerCase(), a = {
                  success: e,
                  type: u,
                  fileTypeGroup: f.getFileTypeGroup(u),
                  size: c.size()
                };
              t && (a.reason = t);
              r.sendEvent(o.settings.telemetry.jSkypeTenantToken, s, a);
            };
          c.initFileProperties(e);
          var E = p ? y() : b();
          return E.send(e), t.promise;
        };
        this.apiHandler = t;
        this.conversation = e;
      }
      return e.prototype.initFileProperties = function (e) {
        this.name._set(e.name);
        this.size._set(e.size);
        this.state._set(s.fileUploadState.Uploading);
      }, e;
    }();
  t.File = c;
  t.build = h;
}));
