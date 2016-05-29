define("telemetry/chat/telemetryEnumerator", [
  "require",
  "constants/common",
  "swx-enums"
], function (e) {
  function r() {
    function u(t, n) {
      if (t === 0)
        return e.enums.CONVERSATION.ZERO;
      if (t === 1)
        return e.enums.CONVERSATION.ONE;
      if (t === 2)
        return e.enums.CONVERSATION.TWO;
      if (t === 3)
        return e.enums.CONVERSATION.THREE;
      if (t === 4)
        return e.enums.CONVERSATION.FOUR;
      if (t === 5)
        return e.enums.CONVERSATION.FIVE;
      if (t > 5 && t <= 10)
        return e.enums.CONVERSATION.LESS_10;
      if (t > 10 && t <= 15)
        return e.enums.CONVERSATION.LESS_15;
      if (t > 15 && t <= 20)
        return e.enums.CONVERSATION.LESS_20;
      if (t > 20 && t <= 50)
        return e.enums.CONVERSATION.LESS_50;
      if (n && t > 50)
        return Math.round(t / 50) + e.enums.CONVERSATION.MORE_50;
      if (t > 50 && t <= 100)
        return e.enums.CONVERSATION.LESS_100;
      if (t > 100)
        return Math.round(t / 100) + e.enums.CONVERSATION.MORE_100;
    }
    function a(e) {
      return Math.round(e / 1000);
    }
    var e = this, r = 60000, i = 60 * r, s = 24 * i, o = t.telemetry.NOT_AVAILABLE;
    e.enums = {
      GROUP_TYPE: {
        ZERO: "zero",
        ONE: "1",
        TWO: "2",
        LESS_5: "3-5",
        LESS_10: "5-10",
        LESS_25: "10-25",
        LESS_50: "25-50",
        LESS_100: "50-100",
        MORE_100: "x100"
      },
      TIMEDELTA: {
        MIN_1: "1MIN",
        MIN_5: "5MIN",
        MIN_10: "10MIN",
        MIN_30: "30MIN",
        HOUR_1: "1HOUR",
        HOUR_3: "3HOUR",
        HOUR_6: "6HOUR",
        HOUR_9: "9HOUR",
        HOUR_12: "12HOUR",
        HOUR_18: "18HOUR",
        HOUR_24: "24HOUR",
        DAYS: "DAY"
      },
      CONTACTS: {
        ZERO: "zero",
        LESS_5: "1-5",
        LESS_10: "5-10",
        LESS_25: "10-25",
        LESS_50: "25-50",
        LESS_100: "50-100",
        LESS_150: "100-150",
        LESS_200: "150-200",
        MORE_200: "x200"
      },
      CONVERSATION: {
        ZERO: "zero",
        ONE: "1",
        TWO: "2",
        THREE: "3",
        FOUR: "4",
        FIVE: "5",
        LESS_10: "5-10",
        LESS_15: "10-15",
        LESS_20: "15-20",
        LESS_50: "20-50",
        MORE_50: "x50",
        LESS_100: "50-100",
        MORE_100: "x100"
      },
      LIFETIME: {
        MIN: "1MIN",
        LESS_5MIN: "5MIN",
        LESS_10MIN: "10MIN",
        LESS_20MIN: "20MIN",
        LESS_1HOUR: "1hour",
        LESS_1DAY: "1DAY",
        LESS_2DAYS: "2DAYS",
        LESS_4DAYS: "3_4_DAYS",
        LESS_6DAYS: "5_6_DAYS",
        LESS_14DAYS: "7_14_DAYS",
        LESS_21DAYS: "15_21_DAYS",
        LESS_29DAYS: "22_29_DAYS"
      },
      URL_CONTENT_TYPE: {
        YOUTUBE: "YT",
        GIF: "GIF",
        TWITTER: "TWIT",
        OTHER: "WWW"
      },
      URL_POSITION: {
        URL_ONLY: "URL",
        TEXT_WITH_URL: "URL_MID",
        TEXT_ENDING_WITH_URL: "URL_END"
      },
      DURATION: {
        NA: "n/a",
        ZERO: "0SEC",
        ONE: "1SEC",
        TWO: "2SEC",
        THREE: "3SEC",
        FOUR: "4SEC",
        FIVE: "5SEC",
        LESS_10: "5-10SEC",
        MORE_10: "x10SEC"
      },
      NET_CODE: {
        OK: {
          START: 200,
          END: 399
        },
        ERROR: {
          START: 400,
          END: 599
        }
      },
      FILE_TYPE_GROUP: {
        PICTURE: "picture",
        VIDEO: "video",
        AUDIO: "audio",
        OFFICE: "office",
        ARCHIVE: "archive",
        BINARY: "binary",
        PDF: "pdf",
        OTHER: "other"
      }
    };
    e.getFileTypeGroup = function (t) {
      switch (t) {
      case "png":
      case "jpg":
      case "gif":
      case "bmp":
      case "tiff":
        return e.enums.FILE_TYPE_GROUP.PICTURE;
      case "avi":
      case "mp4":
      case "mkv":
      case "wmv":
      case "m4v":
        return e.enums.FILE_TYPE_GROUP.VIDEO;
      case "mp3":
      case "cda":
      case "m4a":
      case "wav":
        return e.enums.FILE_TYPE_GROUP.AUDIO;
      case "xls":
      case "xlsx":
      case "xlsm":
      case "doc":
      case "docx":
      case "ppt":
      case "pptx":
        return e.enums.FILE_TYPE_GROUP.OFFICE;
      case "zip":
      case "rar":
      case "ace":
      case "7z":
      case "dmg":
        return e.enums.FILE_TYPE_GROUP.ARCHIVE;
      case "exe":
      case "msi":
      case "iso":
        return e.enums.FILE_TYPE_GROUP.BINARY;
      case "pdf":
        return e.enums.FILE_TYPE_GROUP.PDF;
      default:
        return e.enums.FILE_TYPE_GROUP.OTHER;
      }
    };
    e.getDurationGroup = function (t) {
      if (t <= r)
        return e.enums.TIMEDELTA.MIN_1;
      if (t > r && t <= 5 * r)
        return e.enums.TIMEDELTA.MIN_5;
      if (t > 5 * r && t <= 10 * r)
        return e.enums.TIMEDELTA.MIN_10;
      if (t > 10 * r && t <= 30 * r)
        return e.enums.TIMEDELTA.MIN_30;
      if (t > 30 * r && t <= i)
        return e.enums.TIMEDELTA.HOUR_1;
      if (t > i && t <= 3 * i)
        return e.enums.TIMEDELTA.HOUR_3;
      if (t > 3 * i && t <= 6 * i)
        return e.enums.TIMEDELTA.HOUR_6;
      if (t > 6 * i && t <= 9 * i)
        return e.enums.TIMEDELTA.HOUR_9;
      if (t > 9 * i && t <= 12 * i)
        return e.enums.TIMEDELTA.HOUR_12;
      if (t > 12 * i && t <= 18 * i)
        return e.enums.TIMEDELTA.HOUR_18;
      if (t > 18 * i && t <= 24 * i)
        return e.enums.TIMEDELTA.HOUR_24;
      if (t > s)
        return Math.round(t / s) + e.enums.TIMEDELTA.DAYS;
    };
    e.getParticipantCountGroup = function (t) {
      if (t === 0)
        return e.enums.GROUP_TYPE.ZERO;
      if (t === 1)
        return e.enums.GROUP_TYPE.ONE;
      if (t === 2)
        return e.enums.GROUP_TYPE.TWO;
      if (t > 2 && t <= 5)
        return e.enums.GROUP_TYPE.LESS_5;
      if (t > 5 && t <= 10)
        return e.enums.GROUP_TYPE.LESS_10;
      if (t > 10 && t <= 25)
        return e.enums.GROUP_TYPE.LESS_25;
      if (t > 25 && t <= 50)
        return e.enums.GROUP_TYPE.LESS_50;
      if (t > 50 && t <= 100)
        return e.enums.GROUP_TYPE.LESS_100;
      if (t > 100)
        return Math.round(t / 100) + e.enums.GROUP_TYPE.MORE_100;
    };
    e.getMessageType = function (e) {
      switch (e.model.type()) {
      case n.activityType.TextMessage:
        if (e.previews) {
          var t = e.previews();
          if (t.length > 0)
            return t[0].type();
        }
        return n.activityType.TextMessage;
      case n.activityType.VideoMessage:
      case n.activityType.PictureMessage:
      case n.activityType.MojiMessage:
      case n.activityType.FileTransfer:
        return e.model.type();
      default:
        return o;
      }
    };
    e.getContactsGroup = function (t) {
      if (t === 0)
        return e.enums.CONTACTS.ZERO;
      if (t >= 1 && t <= 5)
        return e.enums.CONTACTS.LESS_5;
      if (t > 5 && t <= 10)
        return e.enums.CONTACTS.LESS_10;
      if (t > 10 && t <= 25)
        return e.enums.CONTACTS.LESS_25;
      if (t > 25 && t <= 50)
        return e.enums.CONTACTS.LESS_50;
      if (t > 50 && t <= 100)
        return e.enums.CONTACTS.LESS_100;
      if (t > 100 && t <= 150)
        return e.enums.CONTACTS.LESS_150;
      if (t > 150 && t <= 200)
        return e.enums.CONTACTS.LESS_200;
      if (t > 200)
        return Math.round(t / 200) + e.enums.CONTACTS.MORE_200;
    };
    e.getConversationCountGroup = function (e) {
      return u(e);
    };
    e.getMessageCountGroup = function (e) {
      return u(e, !0);
    };
    e.getSecondsDurationGroup = function (t) {
      return t === 0 ? e.enums.DURATION.ZERO : t === 1 ? e.enums.DURATION.ONE : t === 2 ? e.enums.DURATION.TWO : t === 3 ? e.enums.DURATION.THREE : t === 4 ? e.enums.DURATION.FOUR : t === 5 ? e.enums.DURATION.FIVE : t > 5 && t <= 10 ? e.enums.DURATION.LESS_10 : t > 10 ? Math.round(t / 10) + e.enums.DURATION.MORE_10 : e.enums.DURATION.NA;
    };
    e.getSecondsDurationGroupFromMs = function (t) {
      return e.getSecondsDurationGroup(a(t));
    };
    e.isError = function (t) {
      return e.enums.NET_CODE.OK.START <= t && t < e.enums.NET_CODE.OK.END ? !1 : e.enums.NET_CODE.ERROR.START <= t && t < e.enums.NET_CODE.ERROR.END ? !0 : o;
    };
    e.getUrlContentType = function (t) {
      return t.indexOf("www.youtube.com") > -1 ? e.enums.URL_CONTENT_TYPE.YOUTUBE : /^http.*\.gif$/.exec(t) ? e.enums.URL_CONTENT_TYPE.GIF : t.indexOf("twitter.com") > -1 ? e.enums.URL_CONTENT_TYPE.TWITTER : e.enums.URL_CONTENT_TYPE.OTHER;
    };
    e.getMessageLifeDurationGroup = function (t) {
      return t < r ? e.enums.LIFETIME.MIN : t < 5 * r ? e.enums.LIFETIME.LESS_5MIN : t < 10 * r ? e.enums.LIFETIME.LESS_10MIN : t < 20 * r ? e.enums.LIFETIME.LESS_20MIN : t < i ? e.enums.LIFETIME.LESS_1HOUR : t < s ? e.enums.LIFETIME.LESS_1DAY : t < 2 * s ? e.enums.LIFETIME.LESS_2DAYS : t < 4 * s ? e.enums.LIFETIME.LESS_4DAYS : t < 6 * s ? e.enums.LIFETIME.LESS_6DAYS : t < 14 * s ? e.enums.LIFETIME.LESS_14DAYS : t < 21 * s ? e.enums.LIFETIME.LESS_21DAYS : t < 29 * s ? e.enums.LIFETIME.LESS_29DAYS : o;
    };
  }
  var t = e("constants/common"), n = e("swx-enums");
  return new r();
});
