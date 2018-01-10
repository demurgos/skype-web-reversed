(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-telemetry-buckets/lib/telemetryBuckets", [
      "require",
      "exports",
      "swx-constants",
      "swx-enums"
    ], e);
}(function (e, t) {
  function c(e) {
    switch (e) {
    case "png":
    case "jpg":
    case "gif":
    case "bmp":
    case "tiff":
      return a.fileTypeBucket.Picture;
    case "avi":
    case "mp4":
    case "mkv":
    case "wmv":
    case "m4v":
      return a.fileTypeBucket.Video;
    case "mp3":
    case "cda":
    case "m4a":
    case "wav":
      return a.fileTypeBucket.Audio;
    case "xls":
    case "xlsx":
    case "xlsm":
    case "doc":
    case "docx":
    case "ppt":
    case "pptx":
      return a.fileTypeBucket.Office;
    case "zip":
    case "rar":
    case "ace":
    case "7z":
    case "dmg":
      return a.fileTypeBucket.Archive;
    case "exe":
    case "msi":
    case "iso":
      return a.fileTypeBucket.Binary;
    case "pdf":
      return a.fileTypeBucket.Pdf;
    default:
      return a.fileTypeBucket.Other;
    }
  }
  function h(e) {
    return e <= i ? a.timeDeltaBucket.Min1 : e > i && e <= 5 * i ? a.timeDeltaBucket.Min5 : e > 5 * i && e <= 10 * i ? a.timeDeltaBucket.Min10 : e > 10 * i && e <= 30 * i ? a.timeDeltaBucket.Min30 : e > 30 * i && e <= s ? a.timeDeltaBucket.Hour1 : e > s && e <= 3 * s ? a.timeDeltaBucket.Hour3 : e > 3 * s && e <= 6 * s ? a.timeDeltaBucket.Hour6 : e > 6 * s && e <= 9 * s ? a.timeDeltaBucket.Hour9 : e > 9 * s && e <= 12 * s ? a.timeDeltaBucket.Hour12 : e > 12 * s && e <= 18 * s ? a.timeDeltaBucket.Hour18 : e > 18 * s && e <= 24 * s ? a.timeDeltaBucket.Hour24 : e > o ? Math.round(e / o) + a.timeDeltaBucket.Days : undefined;
  }
  function p(e) {
    return e === 0 ? a.participantCountBucket.Zero : e === 1 ? a.participantCountBucket.One : e === 2 ? a.participantCountBucket.Two : e > 2 && e <= 5 ? a.participantCountBucket.Less5 : e > 5 && e <= 10 ? a.participantCountBucket.Less10 : e > 10 && e <= 25 ? a.participantCountBucket.Less25 : e > 25 && e <= 50 ? a.participantCountBucket.Less50 : e > 50 && e <= 100 ? a.participantCountBucket.Less100 : e > 100 ? Math.round(e / 100) + a.participantCountBucket.More100 : undefined;
  }
  function d(e) {
    switch (e.model.type_()) {
    case r.activityType.TextMessage:
      if (e.previews) {
        var t = e.previews();
        if (t.length > 0)
          return t[0].type_();
      }
      return r.activityType.TextMessage;
    case r.activityType.VideoMessage:
    case r.activityType.PictureMessage:
    case r.activityType.MojiMessage:
    case r.activityType.FileTransfer:
      return e.model.type_();
    default:
      return r.activityType.Na;
    }
  }
  function v(e) {
    return e === 0 ? a.contactCountBucket.Zero : e >= 1 && e <= 5 ? a.contactCountBucket.Less5 : e > 5 && e <= 10 ? a.contactCountBucket.Less10 : e > 10 && e <= 25 ? a.contactCountBucket.Less25 : e > 25 && e <= 50 ? a.contactCountBucket.Less50 : e > 50 && e <= 100 ? a.contactCountBucket.Less100 : e > 100 && e <= 150 ? a.contactCountBucket.Less150 : e > 150 && e <= 200 ? a.contactCountBucket.Less200 : e > 200 ? Math.round(e / 200) + a.contactCountBucket.More200 : undefined;
  }
  function m(e) {
    return y(e);
  }
  function g(e) {
    return y(e, !0);
  }
  function y(e, t) {
    return e === 0 ? a.conversationCountBucket.Zero : e === 1 ? a.conversationCountBucket.One : e === 2 ? a.conversationCountBucket.Two : e === 3 ? a.conversationCountBucket.Three : e === 4 ? a.conversationCountBucket.Four : e === 5 ? a.conversationCountBucket.Five : e > 5 && e <= 10 ? a.conversationCountBucket.Less10 : e > 10 && e <= 15 ? a.conversationCountBucket.Less15 : e > 15 && e <= 20 ? a.conversationCountBucket.Less20 : e > 20 && e <= 50 ? a.conversationCountBucket.Less50 : t && e > 50 ? Math.round(e / 50) + a.conversationCountBucket.More50 : e > 50 && e <= 100 ? a.conversationCountBucket.Less100 : e > 100 ? Math.round(e / 100) + a.conversationCountBucket.More100 : undefined;
  }
  function b(e) {
    return e === 0 ? a.durationBucket.Zero : e === 1 ? a.durationBucket.One : e === 2 ? a.durationBucket.Two : e === 3 ? a.durationBucket.Three : e === 4 ? a.durationBucket.Four : e === 5 ? a.durationBucket.Five : e > 5 && e <= 10 ? a.durationBucket.Less10 : e > 10 ? Math.round(e / 10) + a.durationBucket.More10 : a.durationBucket.Na;
  }
  function w(e) {
    return b(E(e));
  }
  function E(e) {
    return Math.round(e / 1000);
  }
  function S(e) {
    return f.Start <= e && e < f.End ? !1 : l.Start <= e && e < l.End ? !0 : u;
  }
  function x(e) {
    return e.indexOf("www.youtube.com") > -1 ? a.urlContentTypeBucket.YouTube : /^http.*\.gif$/.exec(e) ? a.urlContentTypeBucket.Gif : e.indexOf("twitter.com") > -1 ? a.urlContentTypeBucket.Twitter : a.urlContentTypeBucket.Other;
  }
  function T(e) {
    return e < i ? a.lifetimeBucket.Min : e < 5 * i ? a.lifetimeBucket.Less5Min : e < 10 * i ? a.lifetimeBucket.Less10Min : e < 20 * i ? a.lifetimeBucket.Less20Min : e < s ? a.lifetimeBucket.Less1Hour : e < o ? a.lifetimeBucket.Less1Day : e < 2 * o ? a.lifetimeBucket.Less2Days : e < 4 * o ? a.lifetimeBucket.Less4Days : e < 6 * o ? a.lifetimeBucket.Less6Days : e < 14 * o ? a.lifetimeBucket.Less14Days : e < 21 * o ? a.lifetimeBucket.Less21Days : e < 29 * o ? a.lifetimeBucket.Less29Days : a.lifetimeBucket.Na;
  }
  function N(e) {
    return e ? e.sidebar && e.sidebar.lastTimeOpened ? L(new Date(e.sidebar.lastTimeOpened)) <= 30 : !1 : u;
  }
  function C(e) {
    return e ? e.sidebar && e.sidebar.lastTimeOpened ? L(new Date(e.sidebar.lastTimeOpened)) > 30 : !1 : u;
  }
  function k(e) {
    if (!e)
      return u;
    if (e.sidebar && e.sidebar.lastTimeOpened) {
      var t = L(new Date(e.sidebar.lastTimeOpened));
      return t > 1 && t <= 30;
    }
    return !1;
  }
  function L(e) {
    var t = 86400000;
    return Math.round(Math.abs((Date.now() - e) / t));
  }
  var n = e("swx-constants"), r = e("swx-enums"), i = 60000, s = 60 * i, o = 24 * s, u = n.COMMON.telemetry.NOT_AVAILABLE, a;
  (function (e) {
    var t;
    (function (e) {
      e.Zero = "zero";
      e.One = "1";
      e.Two = "2";
      e.Less5 = "3-5";
      e.Less10 = "5-10";
      e.Less25 = "10-25";
      e.Less50 = "25-50";
      e.Less100 = "50-100";
      e.More100 = "x100";
    }(t = e.participantCountBucket || (e.participantCountBucket = {})));
    var n;
    (function (e) {
      e.Min1 = "1MIN";
      e.Min5 = "5MIN";
      e.Min10 = "10MIN";
      e.Min30 = "30MIN";
      e.Hour1 = "1HOUR";
      e.Hour3 = "3HOUR";
      e.Hour6 = "6HOUR";
      e.Hour9 = "9HOUR";
      e.Hour12 = "12HOUR";
      e.Hour18 = "18HOUR";
      e.Hour24 = "24HOUR";
      e.Days = "DAY";
    }(n = e.timeDeltaBucket || (e.timeDeltaBucket = {})));
    var r;
    (function (e) {
      e.Zero = "zero";
      e.Less5 = "1-5";
      e.Less10 = "5-10";
      e.Less25 = "10-25";
      e.Less50 = "25-50";
      e.Less100 = "50-100";
      e.Less150 = "100-150";
      e.Less200 = "150-200";
      e.More200 = "x200";
    }(r = e.contactCountBucket || (e.contactCountBucket = {})));
    var i;
    (function (e) {
      e.Zero = "zero";
      e.One = "1";
      e.Two = "2";
      e.Three = "3";
      e.Four = "4";
      e.Five = "5";
      e.Less10 = "5-10";
      e.Less15 = "10-15";
      e.Less20 = "15-20";
      e.Less50 = "20-50";
      e.More50 = "x50";
      e.Less100 = "50-100";
      e.More100 = "x100";
    }(i = e.conversationCountBucket || (e.conversationCountBucket = {})));
    var s;
    (function (e) {
      e.Min = "1MIN";
      e.Less5Min = "5MIN";
      e.Less10Min = "10MIN";
      e.Less20Min = "20MIN";
      e.Less1Hour = "1hour";
      e.Less1Day = "1DAY";
      e.Less2Days = "2DAYS";
      e.Less4Days = "3_4_DAYS";
      e.Less6Days = "5_6_DAYS";
      e.Less14Days = "7_14_DAYS";
      e.Less21Days = "15_21_DAYS";
      e.Less29Days = "22_29_DAYS";
      e.Na = "n/a";
    }(s = e.lifetimeBucket || (e.lifetimeBucket = {})));
    var o;
    (function (e) {
      e.YouTube = "YT";
      e.Gif = "GIF";
      e.Twitter = "TWIT";
      e.Other = "WWW";
    }(o = e.urlContentTypeBucket || (e.urlContentTypeBucket = {})));
    var u;
    (function (e) {
      e.UrlOnly = "URL";
      e.TextWithUrl = "URL_MID";
      e.TextEndingWithUrl = "URL_END";
    }(u = e.urlPositionBucket || (e.urlPositionBucket = {})));
    var a;
    (function (e) {
      e.Na = "n/a";
      e.Zero = "0SEC";
      e.One = "1SEC";
      e.Two = "2SEC";
      e.Three = "3SEC";
      e.Four = "4SEC";
      e.Five = "5SEC";
      e.Less10 = "5-10SEC";
      e.More10 = "x10SEC";
    }(a = e.durationBucket || (e.durationBucket = {})));
    var f;
    (function (e) {
      e.Picture = "picture";
      e.Video = "video";
      e.Audio = "audio";
      e.Office = "office";
      e.Archive = "archive";
      e.Binary = "binary";
      e.Pdf = "pdf";
      e.Other = "other";
    }(f = e.fileTypeBucket || (e.fileTypeBucket = {})));
  }(a = t.enums || (t.enums = {})));
  var f;
  (function (e) {
    e[e.Start = 200] = "Start";
    e[e.End = 399] = "End";
  }(f || (f = {})));
  var l;
  (function (e) {
    e[e.Start = 400] = "Start";
    e[e.End = 599] = "End";
  }(l || (l = {})));
  t.getFileTypeGroup = c;
  t.getDurationGroup = h;
  t.getParticipantCountGroup = p;
  t.getMessageType = d;
  t.getContactsGroup = v;
  t.getConversationCountGroup = m;
  t.getMessageCountGroup = g;
  t.getSecondsDurationGroup = b;
  t.getSecondsDurationGroupFromMs = w;
  t.isError = S;
  t.getUrlContentType = x;
  t.getMessageLifeDurationGroup = T;
  t.isMau = N;
  t.isMauCandidate = C;
  t.isDauCandidate = k;
  t.getDays = L;
}));
