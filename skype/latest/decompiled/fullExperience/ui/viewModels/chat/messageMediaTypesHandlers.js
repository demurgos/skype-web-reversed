define("ui/viewModels/chat/messageMediaTypesHandlers", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "utils/common/cafeObservable",
  "swx-i18n",
  "vendor/knockout",
  "services/pubSub/pubSub",
  "services/pes/configSync",
  "constants/common",
  "browser/dom",
  "telemetry/chat/videoMessagePlayback"
], function (e, t) {
  function h() {
  }
  function p(e, t) {
    var o;
    t ? o = i.fetch({
      key: "media_picturesharing_group",
      params: { senderName: e.model.sender.displayName() }
    }) : o = i.fetch({ key: "media_picturesharing_one" }), e.hasFailed = s.pureComputed(function () {
      return e.status() === n.activityStatus.Failed;
    }), e.isPending = s.pureComputed(function () {
      return e.status() === n.activityStatus.Pending;
    }), e.status = r.newObservableProperty(e.model.status), e.progress = r.newObservableProperty(e.model.progress), e.thumbnailUrl = r.newObservableProperty(e.model.thumbnailUrl), e.pictureUrl = r.newObservableProperty(e.model.pictureUrl), e.content = s.observable(o), e.isPicture = s.observable(!0), e.open = function () {
      return !e.isPending() && !e.hasFailed();
    }, e.progressIndicatorBG = s.pureComputed(function () {
      var t = e.progress(), n = 90, r = "#C4DAE3", i = "#E7F1F5", s = t <= 50 ? i : r, o = Math.floor(t * 3.6) + n, u = t <= 50 ? -n : n, a = t === 0 ? 0 : 50;
      return "linear-gradient(" + u + "deg, transparent " + a + "%, " + s + " 50%)," + "linear-gradient(" + o + "deg, " + r + " 50%, transparent 50%)";
    });
  }
  function d(e) {
    function t(e) {
      if (!e || e === 0)
        return "0 Bytes";
      var t = 1000, n = [
          "Bytes",
          "KB",
          "MB",
          "GB"
        ], r = Math.floor(Math.log(e) / Math.log(t));
      return r >= n.length && (r = n.length - 1), Math.round(e / Math.pow(t, r) * 10) / 10 + " " + n[r];
    }
    function o() {
      var r = e.progress(), s = e.status() === n.activityStatus.Pending, o = Math.round(r * e.model.fileSize / 100);
      if (s) {
        var u = i.fetch({
          key: "file_transfer_upload_state",
          params: {
            size: t(e.model.fileSize),
            uploaded: t(o)
          }
        });
        return u;
      }
      return t(e.model.fileSize);
    }
    e.typeClasses = {}, e.typeClasses[e.model.fileType] = !0, e.fileName = e.model.fileName, e.fileType = e.model.fileType, e.fileThumbnailUri = r.newObservableProperty(e.model.fileThumbnailUri), e.fileSize = s.pureComputed(o), e.fileUri = r.newObservableProperty(e.model.fileUri), e.status = r.newObservableProperty(e.model.status), e.progress = r.newObservableProperty(e.model.progress), e.shouldAbort = r.newObservableProperty(e.model.shouldAbort), e.iconClasses = {}, e.iconClasses[e.fileType] = !0, e.content = s.observable(i.fetch({ key: "file_transfer_file_shared" })), e.isAborted = s.pureComputed(function () {
      var t = e.shouldAbort(), r = e.status() === n.activityStatus.Failed;
      return t && r;
    }), e.abortUploading = function () {
      e.model.shouldAbort(!0);
    };
  }
  function v(e, t) {
    function r() {
      var t = f.createElement("img");
      e.onBeforeExpanded(), t.addEventListener("load", function (t) {
        e.isLoaded(!0), t.target.width > t.target.height ? e.orientationClass("landscape") : e.orientationClass("portrait"), e.onAfterExpanded();
      }), t.addEventListener("error", function () {
        e.hasFailed(!0), e.onAfterExpanded();
      }), t.src = e.thumbnailUrl;
    }
    var n;
    t ? n = i.fetch({
      key: "media_videosharing_group",
      params: { senderName: e.model.sender.displayName() }
    }) : n = i.fetch({ key: "media_videosharing_one" }), e.thumbnailUrl = e.model.thumbnailPath(), e.mediaUrl = e.model.mediaUrl(), e.isLoaded = s.observable(!1), e.isPlaying = s.observable(!1), e.hasExpired = s.observable(!1), e.hasFailed = s.observable(!1), e.orientationClass = s.observable(), e.content = s.observable(n), e.play = function () {
      e.isPlaying(!0), l.sendFirstPlayAction();
    }, e.model.isExpired.get().then(function (t) {
      t ? e.hasExpired(!0) : e.isRendered ? r() : e.registerEvent(a.events.message.RENDERED, r);
    });
  }
  function m(e, t) {
    function f(e) {
      var t, n;
      e.mojiUrl().indexOf("?") !== -1 ? t = e.mojiUrl().replace(/\?.*$/, "?" + u.latestToken) : t = e.mojiUrl() + "?" + u.latestToken, e.mojiThumbnailUrl().indexOf("?") !== -1 ? n = e.mojiThumbnailUrl().replace(/\?.*$/, "?" + u.latestToken) : n = e.mojiThumbnailUrl() + "?" + u.latestToken, e.model.mojiUrl(t), e.model.thumbnailUrl(n);
    }
    function l(t) {
      t.fallbackUsed && (f(e), o.subscribe(a.events.personalExpression.CDN_TOKEN_UPDATED, function () {
        f(e);
      })), e.mojiTitle(t.description), e.mojiLinkName(t.auxiliaryText), e.mojiLinkUrl(t.auxiliaryUrl), e.mojiCopyright(t.copyright), e.typeClasses("moji keyframe");
    }
    var n;
    t ? n = i.fetch({
      key: "media_mojisharing_group",
      params: { senderName: e.model.sender.displayName() }
    }) : n = i.fetch({ key: "media_mojisharing_one" }), e.typeClasses = s.observable("mojiloading"), e.mojiThumbnailUrl = r.newObservableProperty(e.model.thumbnailUrl), e.mojiUrl = r.newObservableProperty(e.model.mojiUrl), e.isSticker = s.observable(!0), e.isMoji = s.observable(!0), e.mojiTitle = s.observable(""), e.mojiLinkName = s.observable(""), e.mojiLinkUrl = s.observable(""), e.mojiCopyright = s.observable(""), e.isMojiPlaying = s.observable(!1), e.isMojiPlayed = s.observable(!1), e.model.mojiMetaData.get().then(l), e.stopMojiPlay = function (e, t) {
      var n = t.target, r = n.previousElementSibling;
      r.pause();
    }, e.playMoji = function (t, n) {
      function s() {
        e.isMojiPlayed(!0), e.isMojiPlaying(!1), i.removeEventListener("pause", s, !1), i.removeEventListener("ended", s, !1);
      }
      var r = n.target, i = r.previousElementSibling.previousElementSibling;
      if (e.isMojiPlaying()) {
        i.pause();
        return;
      }
      e.isMojiPlaying(!0), i.play(), i.addEventListener("ended", s, !1), i.addEventListener("pause", s, !1);
    }, e.i18n = function (e) {
      return i.fetch({ key: e });
    }, e.content = s.observable(n);
  }
  var n = e("swx-enums"), r = e("utils/common/cafeObservable"), i = e("swx-i18n").localization, s = e("vendor/knockout"), o = e("services/pubSub/pubSub"), u = e("services/pes/configSync"), a = e("constants/common"), f = e("browser/dom"), l = e("telemetry/chat/videoMessagePlayback"), c = {};
  c[n.activityType.VideoMessage] = v, c[n.activityType.PictureMessage] = p, c[n.activityType.MojiMessage] = m, c[n.activityType.FileTransfer] = d, t.fetch = function (e) {
    return c[e] || h;
  };
})
