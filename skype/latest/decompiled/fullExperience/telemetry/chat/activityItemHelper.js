define("telemetry/chat/activityItemHelper", [
  "require",
  "constants/common",
  "swx-enums"
], function (e) {
  function i() {
    function e(e, t) {
      return (e & t) !== 0;
    }
    function i(e) {
      return e.originalContent || e.content;
    }
    function s(n, r) {
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
      e(r, t.telemetry.messageTypes.FILES_MASK) && n.files.total++, e(r, t.telemetry.messageTypes.RICHTEXT_MASK) && s(n, r), e(r, t.telemetry.messageTypes.TEXT_MASK) && n.text.total++;
    }, this.getEmptyResult = function () {
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
    }, this.getTelemetryMessageType = function (e) {
      switch (e.type()) {
      case n.activityType.VideoMessage:
        return t.telemetry.messageTypes.MEDIA_VIDEO;
      case n.activityType.PictureMessage:
        return t.telemetry.messageTypes.MEDIA_PICTURE;
      case n.activityType.CallStarted:
      case n.activityType.CallEnded:
      case n.activityType.CallMissed:
        return t.telemetry.messageTypes.CALLING_OTHER;
      case n.activityType.TextMessage:
        var r = 0, i = e.html().indexOf("raw_pre") > -1;
        i && (r |= t.telemetry.messageTypes.RICHTEXT_FORMAT);
        var s = e.html().indexOf("<span class=\"emoSprite\">") > -1;
        return s && (r |= t.telemetry.messageTypes.RICHTEXT_EMOTICONS), r === 0 ? t.telemetry.messageTypes.RICHTEXT_OTHER : r;
      case n.activityType.CONTACTS:
        return t.telemetry.messageTypes.CONTACT_OTHER;
      default:
        return t.telemetry.messageTypes.OTHER_TYPES;
      }
    }, this.getTelemetryMessageTypeObsolete = function (e) {
      switch (e.messagetype) {
      case r.VIDEO:
        return t.telemetry.messageTypes.MEDIA_VIDEO;
      case r.PICTURE:
        return t.telemetry.messageTypes.MEDIA_PICTURE;
      case r.LOCATION:
        return t.telemetry.messageTypes.MEDIA_LOCATION;
      case r.CALL_EVENT:
        return t.telemetry.messageTypes.CALLING_OTHER;
      case r.FILE_TRANSFER:
        var n = new RegExp(".([a-z0-9]{1,4})<", "i"), s = n.exec(i(e))[1];
        switch (s) {
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
      case r.RICH_TEXT:
        var o = 0, u = i(e).indexOf("raw_pre") > -1;
        u && (o |= t.telemetry.messageTypes.RICHTEXT_FORMAT);
        var a = i(e).indexOf("<ss") > -1;
        return a && (o |= t.telemetry.messageTypes.RICHTEXT_EMOTICONS), e.skypeemoteoffset && (o |= t.telemetry.messageTypes.RICHTEXT_ME), o === 0 ? t.telemetry.messageTypes.RICHTEXT_OTHER : o;
      case r.CONTACTS:
        return t.telemetry.messageTypes.CONTACT_OTHER;
      case r.TEXT:
        if (e.skypeemoteoffset)
          return t.telemetry.messageTypes.TEXT_ME;
        return t.telemetry.messageTypes.TEXT_OTHER;
      default:
        return t.telemetry.messageTypes.OTHER_TYPES;
      }
    }, this.processConversation = function (e) {
      var t = this.getEmptyResult(), n, r = e.historyService.activityItems();
      for (n = 0; n < r.length; n++) {
        var i = r[n], s = this.getTelemetryMessageType(i);
        this.updateResult(t, s);
      }
      return t;
    };
  }
  var t = e("constants/common"), n = e("swx-enums"), r = {
      VIDEO: "Event/SkypeVideoMessage",
      PICTURE: "RichText/UriObject",
      LOCATION: "RichText/Location",
      CALL_EVENT: "Event/Call",
      FILE_TRANSFER: "RichText/Files",
      RICH_TEXT: "RichText",
      CONTACTS: "RichText/Contacts",
      TEXT: "Text"
    };
  return new i();
})
