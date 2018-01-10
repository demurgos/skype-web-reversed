define("telemetry/chat/activityItemHelper", [
  "require",
  "swx-constants",
  "swx-encoder/lib/encoders/emoticonEncoder",
  "swx-enums"
], function (e) {
  function s() {
    function e(e, t) {
      return (e & t) !== 0;
    }
    function s(e) {
      return e.originalContent || e.content;
    }
    function o(n, r) {
      e(r, t.telemetry.messageTypes.RICHTEXT_MASK) && (e(r, t.telemetry.messageTypes.RICHTEXT_FORMAT) && n.richtext.format++, e(r, t.telemetry.messageTypes.RICHTEXT_EMOTICONS) && n.richtext.emoticons++, e(r, t.telemetry.messageTypes.RICHTEXT_ME) && n.richtext.me++, n.richtext.total++);
    }
    this.updateResult = function (n, r) {
      switch (r) {
      case t.telemetry.messageTypes.MEDIA_VIDEO:
        n.media.video++;
        break;
      case t.telemetry.messageTypes.MEDIA_PICTURE:
        n.media.picture++;
        break;
      case t.telemetry.messageTypes.MEDIA_LOCATION:
        n.media.location++;
        break;
      case t.telemetry.messageTypes.CALLING_OTHER:
        n.calling.total++;
        break;
      case t.telemetry.messageTypes.FILES_PICTURE:
        n.files.picture++;
        break;
      case t.telemetry.messageTypes.FILES_VIDEO:
        n.files.video++;
        break;
      case t.telemetry.messageTypes.FILES_OFFICE:
        n.files.office++;
        break;
      case t.telemetry.messageTypes.FILES_ARCHIVE:
        n.files.zip++;
        break;
      case t.telemetry.messageTypes.FILES_BINARY:
        n.files.binary++;
        break;
      case t.telemetry.messageTypes.FILES_PDF:
        n.files.pdf++;
        break;
      case t.telemetry.messageTypes.CONTACT_OTHER:
        n.contact.total++;
        break;
      case t.telemetry.messageTypes.TEXT_ME:
        n.text.me++;
        break;
      case t.telemetry.messageTypes.OTHER_TYPES:
        n.other++;
        break;
      default:
        if (!e(r, t.telemetry.messageTypes.FILES_MASK | t.telemetry.messageTypes.RICHTEXT_MASK | t.telemetry.messageTypes.TEXT_MASK))
          throw new Error("Not supported:" + r);
      }
      e(r, t.telemetry.messageTypes.FILES_MASK) && n.files.total++;
      e(r, t.telemetry.messageTypes.RICHTEXT_MASK) && o(n, r);
      e(r, t.telemetry.messageTypes.TEXT_MASK) && n.text.total++;
    };
    this.getEmptyResult = function () {
      var e = {
        media: {
          picture: 0,
          video: 0,
          location: 0
        },
        files: {
          total: 0,
          picture: 0,
          video: 0,
          office: 0,
          zip: 0,
          binary: 0,
          pdf: 0
        },
        richtext: {
          total: 0,
          format: 0,
          emoticons: 0,
          me: 0
        },
        text: {
          total: 0,
          me: 0
        },
        contact: { total: 0 },
        calling: { total: 0 },
        other: 0
      };
      return e;
    };
    this.getTelemetryMessageType = function (e) {
      switch (e.type()) {
      case r.activityType.VideoMessage:
        return t.telemetry.messageTypes.MEDIA_VIDEO;
      case r.activityType.PictureMessage:
        return t.telemetry.messageTypes.MEDIA_PICTURE;
      case r.activityType.CallStarted:
      case r.activityType.CallEnded:
      case r.activityType.CallMissed:
        return t.telemetry.messageTypes.CALLING_OTHER;
      case r.activityType.TextMessage:
        var i = 0, s = e.html().indexOf("raw_pre") > -1;
        s && (i |= t.telemetry.messageTypes.RICHTEXT_FORMAT);
        var o = n.build().hasEmoticons(e.html());
        return o && (i |= t.telemetry.messageTypes.RICHTEXT_EMOTICONS), i === 0 ? t.telemetry.messageTypes.RICHTEXT_OTHER : i;
      case r.activityType.CONTACTS:
        return t.telemetry.messageTypes.CONTACT_OTHER;
      default:
        return t.telemetry.messageTypes.OTHER_TYPES;
      }
    };
    this.getTelemetryMessageTypeObsolete = function (e) {
      switch (e.messagetype) {
      case i.VIDEO:
        return t.telemetry.messageTypes.MEDIA_VIDEO;
      case i.PICTURE:
        return t.telemetry.messageTypes.MEDIA_PICTURE;
      case i.LOCATION:
        return t.telemetry.messageTypes.MEDIA_LOCATION;
      case i.CALL_EVENT:
        return t.telemetry.messageTypes.CALLING_OTHER;
      case i.FILE_TRANSFER:
        var n = new RegExp(".([a-z0-9]{1,4})<", "i"), r = n.exec(s(e))[1];
        switch (r) {
        case "png":
        case "jpg":
        case "gif":
        case "bmp":
          return t.telemetry.messageTypes.FILES_PICTURE;
        case "avi":
        case "mp4":
        case "mkv":
          return t.telemetry.messageTypes.FILES_VIDEO;
        case "xls":
        case "xlsx":
        case "doc":
        case "docx":
        case "ppt":
        case "pptx":
          return t.telemetry.messageTypes.FILES_OFFICE;
        case "zip":
        case "rar":
        case "ace":
        case "7z":
          return t.telemetry.messageTypes.FILES_ARCHIVE;
        case "exe":
        case "msi":
        case "iso":
          return t.telemetry.messageTypes.FILES_BINARY;
        case "pdf":
          return t.telemetry.messageTypes.FILES_PDF;
        default:
          return t.telemetry.messageTypes.FILES_OTHER;
        }
        break;
      case i.RICH_TEXT:
        var o = 0, u = s(e).indexOf("raw_pre") > -1;
        u && (o |= t.telemetry.messageTypes.RICHTEXT_FORMAT);
        var a = s(e).indexOf("<ss") > -1;
        return a && (o |= t.telemetry.messageTypes.RICHTEXT_EMOTICONS), e.skypeemoteoffset && (o |= t.telemetry.messageTypes.RICHTEXT_ME), o === 0 ? t.telemetry.messageTypes.RICHTEXT_OTHER : o;
      case i.CONTACTS:
        return t.telemetry.messageTypes.CONTACT_OTHER;
      case i.TEXT:
        if (e.skypeemoteoffset)
          return t.telemetry.messageTypes.TEXT_ME;
        return t.telemetry.messageTypes.TEXT_OTHER;
      default:
        return t.telemetry.messageTypes.OTHER_TYPES;
      }
    };
    this.processConversation = function (e) {
      var t = this.getEmptyResult(), n, r = e.historyService.activityItems();
      for (n = 0; n < r.length; n++) {
        var i = r[n], s = this.getTelemetryMessageType(i);
        this.updateResult(t, s);
      }
      return t;
    };
  }
  var t = e("swx-constants").COMMON, n = e("swx-encoder/lib/encoders/emoticonEncoder"), r = e("swx-enums"), i = {
      VIDEO: "Event/SkypeVideoMessage",
      PICTURE: "RichText/UriObject",
      LOCATION: "RichText/Location",
      CALL_EVENT: "Event/Call",
      FILE_TRANSFER: "RichText/Files",
      RICH_TEXT: "RichText",
      CONTACTS: "RichText/Contacts",
      TEXT: "Text"
    };
  return new s();
});
