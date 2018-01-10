(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-async-media-service/lib/asyncMediaService", [
      "require",
      "exports",
      "reqwest",
      "swx-utils-common",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  var n = e("reqwest"), r = e("swx-utils-common"), i = e("swx-browser-globals"), s = 0, o = 500, u = 3, a = "imgt1", f = "imgpsh_fullsize", l = "imgpsh", c = "avatar", h = "avatar_fullsize", p = "original", d = "thumbnail", v = "video", m = "audio", g = function () {
      function e(e, t) {
        this._getSkypeToken = e;
        this._settings = t;
      }
      return e.prototype.authenticate = function (e) {
        var t = {
          method: "post",
          dataType: "json",
          url: this._settings.amdServiceHost + "/v1/skypetokenauth",
          data: "skypetoken=" + e,
          contentType: "application/x-www-form-urlencoded",
          crossOrigin: !0,
          withCredentials: !0
        };
        return n.compat(t);
      }, e.prototype.getThumbnailStatus = function (e) {
        return this._getViewStatus(e, a);
      }, e.prototype.getPictureStatus = function (e) {
        return this._getViewStatus(e, f);
      }, e.prototype.getVideoStatus = function (e) {
        return this._getViewStatus(e, v);
      }, e.prototype.getAudioStatus = function (e) {
        return this._getViewStatus(e, m);
      }, e.prototype.sendFile = function (e, t, n, r, i) {
        var s = this;
        return new Promise(function (o, u) {
          s._getSkypeToken().then(function (a) {
            s._getDocumentId(e, a, t, i).then(function (e) {
              s._uploadDocument(e.id, t, a, n, r, i).then(o, u);
            }, function () {
              u("Can't retrieve documentId");
            });
          }, function () {
            u("Can't retrieve Skype token");
          });
        });
      }, e.prototype.deleteFile = function (e) {
        var t = this;
        return new Promise(function (n, r) {
          t._getSkypeToken().then(function (i) {
            t._deleteDocument(e, i).then(function (e) {
              n(e.status_location);
            }, function () {
              r("File deletion failed");
            });
          }, function () {
            r("Can't retrieve Skype token");
          });
        });
      }, e.prototype._deleteDocument = function (e, t) {
        var r = this._settings.amdServiceHost + "/v1/objects/" + e, i = {
            url: r,
            method: "DELETE",
            crossOrigin: !0,
            dataType: "json",
            headers: { Authorization: "skype_token " + t }
          };
        return n.compat(i);
      }, e.prototype._getThumbnailStatusForFile = function (e, t, n) {
        return this._getViewStatus(t, this._getDocumentCloudStoreData(e, n).thumbnail);
      }, e.prototype._uploadDocument = function (e, t, n, r, i, s) {
        function l(e) {
          r(e, a);
        }
        var o = this, u = this._settings.amdServiceHost + "/v1/objects/" + e, a = new XMLHttpRequest(), f = this._getDocumentCloudStoreData(t, s);
        return new Promise(function (r, c) {
          a.upload.addEventListener("progress", l);
          a.open("PUT", u + "/content/" + f.content, !0);
          a.setRequestHeader("Authorization", "skype_token " + n);
          a.setRequestHeader("Content-Type", "multipart/form-data");
          a.send(t);
          a.onreadystatechange = function () {
            a.readyState === 4 && (a.status === 201 ? (a.upload.removeEventListener("progress", l), o._getThumbnailStatusForFile(t, u, s).then(function () {
              i(u + "/views/" + f.thumbnail);
              r(e);
            }, function () {
              c("Unsupported Media Type");
            })) : (a.upload.removeEventListener("progress", l), c("Can't upload file")));
          };
        });
      }, e.prototype._getImageCloudData = function () {
        return {
          type: "pish/image",
          thumbnail: a,
          content: l,
          original: f
        };
      }, e.prototype._getGroupAvatarCloudData = function () {
        return {
          type: "avatar/group",
          thumbnail: h,
          content: c
        };
      }, e.prototype._getFileCloudData = function () {
        return {
          type: "sharing/file",
          thumbnail: d,
          content: p,
          original: p
        };
      }, e.prototype._getDocumentCloudStoreData = function (e, t) {
        return t ? this._getGroupAvatarCloudData() : r.file.isImage(e) ? this._getImageCloudData() : this._getFileCloudData();
      }, e.prototype._getDocumentId = function (e, t, i, s) {
        var o = this._getDocumentCloudStoreData(i, s), u = {};
        u[e] = ["read"];
        var a = {
          type: o.type,
          permissions: u
        };
        return r.file.isImage(i) || (a.filename = i.name), n.compat({
          method: "post",
          dataType: "json",
          url: this._settings.amdServiceHost + "/v1/objects",
          data: JSON.stringify(a),
          headers: { Authorization: "skype_token " + t },
          contentType: "application/json",
          crossOrigin: !0,
          withCredentials: !0
        });
      }, e.prototype._getViewStatus = function (e, t, r, a) {
        var f = this;
        r === void 0 && (r = s);
        a === void 0 && (a = u);
        var l = e + "/views/" + t, c = l + "/status", h = {
            url: c,
            dataType: "json",
            crossOrigin: !0,
            withCredentials: !0
          };
        if (a === 0)
          return Promise.reject({});
        var p = function (n) {
            var i = n.scan && n.scan.status !== "in progress" && n.scan.status !== "ready", s = n.view_state === "ready" && !n.scan, u = n.view_state === "ready" && n.scan && n.scan.status === "passed";
            return n.status_location && !n.view_state ? (e = n.status_location.replace("/views/" + t + "/status", ""), f._getViewStatus(e, t, r, a)) : s || u ? Promise.resolve(l) : n.view_state === "failed" || i ? Promise.reject({}) : n.content_state !== "expired" ? f._getViewStatus(e, t, o, a) : Promise.reject({});
          }, d = function (n) {
            return n.status === 401 || n.status === 403 ? (a--, f._getSkypeToken().then(function (n) {
              return f.authenticate(n).then(function () {
                return f._getViewStatus(e, t, r, a);
              });
            })) : Promise.reject({});
          };
        return new Promise(function (e) {
          i.getWindow().setTimeout(e, r);
        }).then(function () {
          return n.compat(h).then(p, d);
        });
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = g;
  t.build = function (e, t) {
    return new g(e, t);
  };
}));
