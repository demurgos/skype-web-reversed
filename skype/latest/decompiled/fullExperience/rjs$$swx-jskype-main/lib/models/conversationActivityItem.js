(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/conversationActivityItem", [
      "require",
      "exports",
      "jcafe-property-model",
      "swx-utils-chat",
      "swx-encoder",
      "swx-enums",
      "../../lib/services/asyncMedia/main",
      "swx-i18n",
      "swx-utils-chat",
      "../../lib/services/annotations/main",
      "swx-jskype-internal-application-instance",
      "swx-constants",
      "jskype-settings-instance"
    ], e);
}(function (e, t) {
  function p(e) {
    var t = u.localization.fetch({
      key: "message_text_removed",
      params: {
        date: a.dateTime.formatDate(e),
        time: a.dateTime.formatTimestampShort(e)
      }
    });
    return "<span class=\"deleted\">" + t + "</span>";
  }
  function d(e, t, n) {
    t.chatService._editMessage(n, e).then(function () {
      var n = t.historyService.activityItems(e.key());
      n.status._set(s.activityStatus.Succeeded);
    }, function () {
      var n = t.historyService.activityItems(e.key());
      n.status._set(s.activityStatus.Failed);
    });
    e.status._set(s.activityStatus.Pending);
    if (n.length === 0)
      return e.isDeleted._set(!0), p(t.lastModificationTimestamp());
    if (e.type() === s.activityType.TextMessage) {
      var i = e, o = r.messageSanitizer.quotesPresentInXML(i.getOriginalContent());
      if (o !== "")
        return r.messageSanitizer.quotesPresentInHTML(i.html()) + n.replace(o, "");
    }
    return n;
  }
  var n = e("jcafe-property-model"), r = e("swx-utils-chat"), i = e("swx-encoder"), s = e("swx-enums"), o = e("../../lib/services/asyncMedia/main"), u = e("swx-i18n"), a = e("swx-utils-chat"), f = e("../../lib/services/annotations/main"), l = e("swx-jskype-internal-application-instance"), c = e("swx-constants"), h = e("jskype-settings-instance"), v = function () {
      function e() {
        this._supportedAnnotations = [];
        this.key = n.property({ readOnly: !0 });
        this.type = n.property({ readOnly: !0 });
        this.timestamp = n.property({ readOnly: !0 });
        this.status = n.property({ readOnly: !0 });
        this.reason = n.property({ readOnly: !0 });
        this.isRead = n.property({
          readOnly: !0,
          value: !0
        });
      }
      return e;
    }();
  t.ConversationActivityItem = v;
  var m = function (e) {
    function t() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.author = null, t.persons = n.collection(), t.context = n.property({ readOnly: !0 }), t;
    }
    return __extends(t, e), t;
  }(v);
  t.ParticipantActivityItem = m;
  var g = function (e) {
    function t() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.direction = n.property({ readOnly: !0 }), t.duration = n.property({ readOnly: !0 }), t;
    }
    return __extends(t, e), t;
  }(v);
  t.CallingActivityItem = g;
  var y = function (e) {
    function t() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.direction = n.property({ readOnly: !0 }), t.isGroup = n.property({ readOnly: !0 }), t.participantName = n.property({ readOnly: !0 }), t.participantEndpoint = n.property({ readOnly: !0 }), t;
    }
    return __extends(t, e), t;
  }(v);
  t.PstnActivityItem = y;
  var b = function (e) {
    function t() {
      var t = e !== null && e.apply(this, arguments) || this;
      return t.participantNames = n.collection(), t;
    }
    return __extends(t, e), t;
  }(v);
  t.NgcUpgradeActivityItem = b;
  var w = function (e) {
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return __extends(t, e), t;
  }(v);
  t.PluginFreeActivityItem = w;
  var E = function (e) {
    function t(t, s) {
      var o = e.call(this) || this;
      o.setHtmlCommandProperty = n.boolProperty(!1);
      o.setHtmlCommand = n.command(o.htmlSet.bind(o), o.setHtmlCommandProperty);
      o.direction = n.property({ readOnly: !0 });
      o.sender = null;
      o.isEdited = n.property({ readOnly: !0 });
      o.isDeleted = n.property({ readOnly: !0 });
      o.html = n.property({ set: o.setHtmlCommand });
      o._isSMS = n.property({ value: !1 });
      o._smsInfo = n.property({ value: null });
      o._htmlSetEnabled = o.setHtmlCommandProperty;
      o.text = function () {
        var e = r.messageSanitizer.unwebify(o.html());
        return i.build(l).getNodeTextContent(e);
      };
      o.getOriginalContent = function () {
        return o._originalContent;
      };
      o._isOriginal = function () {
        return !o.isEdited() && !o.isDeleted();
      };
      o._updateAllProperties = function (e) {
        o._id = e._id;
        o._actualId = e._actualId;
        o.key._set(e.key());
        o.type._set(e.type());
        o.timestamp._set(e.timestamp());
        o.status._set(e.status());
        o.reason._set(e.reason());
        o.isRead._set(e.isRead());
        o.direction._set(e.direction());
        o.sender = e.sender;
        o.isEdited._set(e.isEdited());
        o.isDeleted._set(e.isDeleted());
        o.html._set(e.html());
        o._htmlSetEnabled(e._htmlSetEnabled());
        f["default"].updateMessageProperties(o, e);
      };
      if (!t)
        throw new Error("Text message activity item requires conversation");
      return o.conversation = t, f["default"].decorateSms(o, t, s), f["default"].decorateTranslations(o, t), f["default"].decorateActivityData(o), o.isDeleted.once(!0, function () {
        o.setHtmlCommandProperty(!1);
      }), o;
    }
    return __extends(t, e), t.prototype.htmlSet = function (e) {
      return this._skypeemoteoffset && !!e && (e = this.html().substr(0, this._skypeemoteoffset) + e), d(this, this.conversation, e);
    }, t;
  }(v);
  t.TextMessageActivityItem = E;
  var S = function (e) {
    function t(t) {
      var r = e.call(this) || this;
      r.setHtmlCommandProperty = n.boolProperty(!1);
      r.setHtmlCommand = n.command(r.htmlSet.bind(r), r.setHtmlCommandProperty);
      r.direction = n.property({ readOnly: !0 });
      r.duration = n.property({ readOnly: !0 });
      r.sender = null;
      r.thumbnailPath = n.property({ readOnly: !0 });
      r.thumbnailProgress = n.property({ readOnly: !0 });
      r.mediaUrl = n.property({ readOnly: !0 });
      r.mediaUrlProgress = n.property({ readOnly: !0 });
      r.html = n.property({ set: r.setHtmlCommand });
      r.isDeleted = n.property({
        readOnly: !0,
        value: !1
      });
      r.documentId = n.property({ readOnly: !0 });
      r._uri = null;
      r._htmlSetEnabled = r.setHtmlCommandProperty;
      r.isExpired = n.property({
        readOnly: !0,
        get: function () {
          return r.videoStatusTask || (r.videoStatusTask = n.task(), o.get().getVideoStatus(r._uri).then(function () {
            r.videoStatusTask.resolve(!1);
          }, function () {
            r.videoStatusTask.resolve(!0);
          })), r.videoStatusTask.promise;
        }
      });
      r._isOriginal = function () {
        return !r.isDeleted();
      };
      r._updateAllProperties = function (e) {
        f["default"].updateMessageProperties(r, e);
        r.isDeleted._set(e.isDeleted());
        r.html._set(e.html());
        r._htmlSetEnabled(e._htmlSetEnabled());
      };
      if (!t)
        throw new Error("Video message activity item requires conversation");
      return r.conversation = t, r.type._set(s.activityType.VideoMessage), f["default"].decorateEmotions(r, t), r;
    }
    return __extends(t, e), t.prototype.htmlSet = function (e) {
      return e.length === 0 && o.get().deleteFile(this.documentId()), d(this, this.conversation, e);
    }, t;
  }(v);
  t.VideoMessageActivityItem = S;
  var x = function (e) {
    function t(t) {
      var r = e.call(this) || this;
      r.setHtmlCommandProperty = n.boolProperty(!1);
      r.setHtmlCommand = n.command(r.htmlSet.bind(r), r.setHtmlCommandProperty);
      r.direction = n.property({ readOnly: !0 });
      r.duration = n.property({ readOnly: !0 });
      r.sender = null;
      r.mediaUrl = n.property({ readOnly: !0 });
      r.mediaUrlProgress = n.property({ readOnly: !0 });
      r.html = n.property({ set: r.setHtmlCommand });
      r.isDeleted = n.property({
        readOnly: !0,
        value: !1
      });
      r.documentId = n.property({ readOnly: !0 });
      r._uri = null;
      r._htmlSetEnabled = r.setHtmlCommandProperty;
      r.isExpired = n.property({
        readOnly: !0,
        get: function () {
          return r.audioStatusTask || (r.audioStatusTask = n.task(), o.get().getAudioStatus(r._uri).then(function () {
            r.audioStatusTask.resolve(!1);
          }, function () {
            r.audioStatusTask.resolve(!0);
          })), r.audioStatusTask.promise;
        }
      });
      r._isOriginal = function () {
        return !r.isDeleted();
      };
      r._updateAllProperties = function (e) {
        f["default"].updateMessageProperties(r, e);
        r.isDeleted._set(e.isDeleted());
        r.html._set(e.html());
        r._htmlSetEnabled(e._htmlSetEnabled());
      };
      if (!t)
        throw new Error("Audio message activity item requires conversation");
      return r.conversation = t, r.type._set(s.activityType.AudioMessage), r;
    }
    return __extends(t, e), t.prototype.htmlSet = function (e) {
      return e.length === 0 && o.get().deleteFile(this.documentId()), d(this, this.conversation, e);
    }, t;
  }(v);
  t.AudioMessageActivityItem = x;
  var T = function (e) {
    function t(t) {
      var r = e.call(this) || this;
      r.setHtmlCommandProperty = n.boolProperty(!1);
      r.setHtmlCommand = n.command(r.htmlSet.bind(r), r.setHtmlCommandProperty);
      r.direction = n.property({ readOnly: !0 });
      r.sender = null;
      r.contacts = n.collection();
      r.html = n.property({ set: r.setHtmlCommand });
      r.isDeleted = n.property({
        readOnly: !0,
        value: !1
      });
      r._htmlSetEnabled = r.setHtmlCommandProperty;
      r._isOriginal = function () {
        return !r.isDeleted();
      };
      r._updateAllProperties = function (e) {
        r._id = e._id;
        r._actualId = e._actualId;
        r.status._set(e.status());
        r.isDeleted._set(e.isDeleted());
        r.html._set(e.html());
        r._htmlSetEnabled(e._htmlSetEnabled());
        f["default"].updateMessageProperties(r, e);
      };
      if (!t)
        throw new Error("ContactInfo message activity item requires conversation");
      return r.conversation = t, r.type._set(s.activityType.ContactInfoMessage), r;
    }
    return __extends(t, e), t.prototype.htmlSet = function (e) {
      return d(this, this.conversation, e);
    }, t;
  }(v);
  t.ContactInfoMessageActivityItem = T;
  var N = function (e) {
    function t(t) {
      var r = e.call(this) || this;
      r.setHtmlCommandProperty = n.boolProperty(!1);
      r.setHtmlCommand = n.command(r.htmlSet.bind(r), r.setHtmlCommandProperty);
      r.direction = n.property({ readOnly: !0 });
      r.sender = null;
      r.progress = n.property({ value: 0 });
      r.shouldAbort = n.boolProperty(!1);
      r.html = n.property({ set: r.setHtmlCommand });
      r.isDeleted = n.property({
        readOnly: !0,
        value: !1
      });
      r.documentId = n.property({ readOnly: !0 });
      r._uri = null;
      r._htmlSetEnabled = r.setHtmlCommandProperty;
      r.thumbnailUrl = n.property({
        readOnly: !0,
        get: function () {
          if (!r._uri)
            return;
          return r.thumbnailStatusTask || (r.thumbnailStatusTask = n.task(), o.get().getThumbnailStatus(r._uri).then(r.thumbnailStatusTask.resolve.bind(r.thumbnailStatusTask), r.thumbnailStatusTask.reject.bind(r.thumbnailStatusTask))), r.thumbnailStatusTask.promise;
        }
      });
      r.pictureUrl = n.property({
        readOnly: !0,
        get: function () {
          if (!r._uri)
            return;
          return r.pictureStatusTask || (r.pictureStatusTask = n.task(), o.get().getPictureStatus(r._uri).then(r.pictureStatusTask.resolve.bind(r.pictureStatusTask), r.pictureStatusTask.reject.bind(r.pictureStatusTask))), r.pictureStatusTask.promise;
        }
      });
      r._isOriginal = function () {
        return !r.isDeleted();
      };
      r._updateAllProperties = function (e) {
        r._id = e._id;
        r._actualId = e._actualId;
        r.status._set(e.status());
        r._uri = e._uri;
        r.pictureUrl.get();
        f["default"].updateMessageProperties(r, e);
      };
      if (!t)
        throw new Error("Picture message activity item requires conversation");
      return r.conversation = t, r.type._set(s.activityType.PictureMessage), f["default"].decorateEmotions(r, t), r;
    }
    return __extends(t, e), t.prototype.htmlSet = function (e) {
      return e.length === 0 && this.conversation.fileTransferService.remove(this.documentId()), d(this, this.conversation, e);
    }, t;
  }(v);
  t.PictureMessageActivityItem = N;
  var C = function (e) {
    function t(t) {
      var r = e.call(this) || this;
      r.setHtmlCommandProperty = n.boolProperty(!1);
      r.setHtmlCommand = n.command(r.htmlSet.bind(r), r.setHtmlCommandProperty);
      r.direction = n.property({ readOnly: !0 });
      r.sender = null;
      r.fileName = null;
      r.fileType = null;
      r.fileUri = n.property({ readOnly: !0 });
      r.fileThumbnailUri = n.property({ readOnly: !0 });
      r.fileSize = null;
      r.progress = n.property({ value: 0 });
      r.shouldAbort = n.boolProperty(!1);
      r.html = n.property({ set: r.setHtmlCommand });
      r.isDeleted = n.property({
        readOnly: !0,
        value: !1
      });
      r.documentId = n.property({ readOnly: !0 });
      r._htmlSetEnabled = r.setHtmlCommandProperty;
      r._isOriginal = function () {
        return !r.isDeleted();
      };
      r._updateAllProperties = function (e) {
        f["default"].updateMessageProperties(r, e);
        r._id = e._id;
        r._actualId = e._actualId;
        r.isDeleted._set(e.isDeleted());
        r.html._set(e.html());
        r._htmlSetEnabled(e._htmlSetEnabled());
      };
      if (!t)
        throw new Error("File transfer message activity item requires conversation");
      return r.conversation = t, r.type._set(s.activityType.FileTransfer), f["default"].decorateEmotions(r, t), r;
    }
    return __extends(t, e), t.prototype.htmlSet = function (e) {
      return e.length === 0 && this.conversation.fileTransferService.remove(this.documentId()), d(this, this.conversation, e);
    }, t;
  }(v);
  t.FileTransferActivityItem = C;
  var k = function (e) {
    function t() {
      var t = e.call(this) || this;
      return t.greeting = n.property({ readOnly: !0 }), t.sender = null, t.direction = n.property({
        readOnly: !0,
        value: s.direction.Incoming
      }), t.isRead._set(!1), t.isRead.once(!0, function () {
        t.sender !== null && t.direction() === s.direction.Incoming && t.sendContactRequestReadEvent();
      }), t;
    }
    return __extends(t, e), t.prototype.sendContactRequestReadEvent = function () {
      var e = {
        name: c.COMMON.telemetry.contacts.name.CONTACT_REQUEST_READ,
        user_from: [
          this.sender.id(),
          window.skypeTelemetryManager.PIIType.Identity
        ]
      };
      l.get()._telemetryManager.sendEvent(h.settings.telemetry.jSkypeTenantToken, c.COMMON.telemetry.contacts.type.CONTACT_REQUESTS, e);
    }, t;
  }(v);
  t.ContactRequestActivityItem = k;
  var L = function (e) {
    function t(t) {
      var r = e.call(this) || this;
      r.setHtmlCommandProperty = n.boolProperty(!1);
      r.setHtmlCommand = n.command(r.htmlSet.bind(r), r.setHtmlCommandProperty);
      r.direction = n.property({ readOnly: !0 });
      r.thumbnailUrl = n.property({ readOnly: !0 });
      r.mojiUrl = n.property({ readOnly: !0 });
      r.sender = null;
      r.html = n.property({ set: r.setHtmlCommand });
      r.isDeleted = n.property({
        readOnly: !0,
        value: !1
      });
      r._htmlSetEnabled = r.setHtmlCommandProperty;
      r._isOriginal = function () {
        return !r.isDeleted();
      };
      r._updateAllProperties = function (e) {
        r._id = e._id;
        r._actualId = e._actualId;
        f["default"].updateMessageProperties(r, e);
      };
      if (!t)
        throw new Error("Moji message activity item requires conversation");
      return r.conversation = t, f["default"].decorateEmotions(r, t), r;
    }
    return __extends(t, e), t.prototype.htmlSet = function (e) {
      return d(this, this.conversation, e);
    }, t;
  }(v);
  t.MojiMessageActivityItem = L;
  var A = function (e) {
    function t(t) {
      var r = e.call(this) || this;
      r.setHtmlCommandProperty = n.boolProperty(!1);
      r.setHtmlCommand = n.command(r.htmlSet.bind(r), r.setHtmlCommandProperty);
      r.conversationId = n.property({ readOnly: !0 });
      r.xmmType = n.property({ readOnly: !0 });
      r.direction = n.property({ readOnly: !0 });
      r.sender = null;
      r.isEdited = n.property({ readOnly: !0 });
      r.html = n.property({ set: r.setHtmlCommand });
      r.pollQuestion = n.property({ readOnly: !0 });
      r.pollAnswers = n.collection();
      r.highestNumberOfVotes = n.property({ readOnly: !0 });
      r.peopleVotedNum = n.property({ readOnly: !0 });
      r.meCheckedAnswerPositions = n.collection();
      r.meVoted = n.property({ readOnly: !0 });
      r.multipleVotes = n.boolProperty(!1);
      r.isDeleted = n.property({
        readOnly: !0,
        value: !1
      });
      r._htmlSetEnabled = r.setHtmlCommandProperty;
      r._isOriginal = function () {
        return !r.isEdited() && !r.isDeleted();
      };
      r._updateAllProperties = function (e) {
        r._id = e._id;
        r._actualId = e._actualId;
        r.key._set(e.key());
        r.type._set(e.type());
        r.timestamp._set(e.timestamp());
        r.status._set(e.status());
        r.reason._set(e.reason());
        r.isRead._set(e.isRead());
        r.direction._set(e.direction());
        r.sender = e.sender;
        r.isEdited._set(e.isEdited());
        r.isDeleted._set(e.isDeleted());
        r.html._set(e.html());
        r._htmlSetEnabled(e._htmlSetEnabled());
        r.conversationId._set(e.conversationId());
        r.xmmType._set(e.xmmType());
        r.pollQuestion._set(e.pollQuestion());
        r.pollAnswers(e.pollAnswers());
        r.highestNumberOfVotes._set(e.highestNumberOfVotes());
        r.peopleVotedNum._set(e.peopleVotedNum());
        r.meCheckedAnswerPositions(e.meCheckedAnswerPositions());
        r.meVoted._set(e.meVoted());
        r.multipleVotes._set(e.multipleVotes());
        f["default"].updateMessageProperties(r, e);
      };
      r.addAnswer = function (e) {
        var t = r.pollAnswers().indexOf(e);
        if (t === -1)
          return;
        r.meCheckedAnswerPositions.add(t);
        r.poll.add({
          key: "pollAnswer",
          value: JSON.stringify(r.meCheckedAnswerPositions())
        });
        r.meVoted._set(!0);
      };
      if (!t)
        throw new Error("Poll message activity item requires conversation");
      return r.conversation = t, f["default"].decorateEmotions(r, t), f["default"].decoratePoll(r, t), r;
    }
    return __extends(t, e), t.prototype.htmlSet = function (e) {
      return d(this, this.conversation, e);
    }, t;
  }(v);
  t.PollMessageActivityItem = A;
  var O = function (e) {
    function t(t) {
      var r = e.call(this) || this;
      r.sender = null;
      r.direction = n.property({ readOnly: !0 });
      r.orderId = null;
      r.transactionStatus = n.property({
        readOnly: !0,
        value: s.transactionStatus.Pending
      });
      r.amount = null;
      r.currency = null;
      r.personalization = null;
      r._isOriginal = function () {
        return !0;
      };
      r._updateAllProperties = function (e) {
        r._id = e._id;
        r._actualId = e._actualId;
        f["default"].updateMessageProperties(r, e);
      };
      if (!t)
        throw new Error("Transaction message activity item requires conversation");
      return r.conversation = t, r.isRead._set(!1), f["default"].decorateEmotions(r, t), r;
    }
    return __extends(t, e), t;
  }(v);
  t.TransactionMessageActivityItem = O;
}));
