define("jSkype/models/conversationActivityItem", [
  "require",
  "jcafe-property-model",
  "utils/chat/messageSanitizer",
  "utils/chat/urlValidator",
  "utils/common/encoder",
  "lodash-compat",
  "swx-enums",
  "jSkype/services/asyncMedia/main",
  "swx-i18n",
  "jSkype/services/mojiMedia/main",
  "utils/chat/dateTime",
  "jSkype/services/annotations/main",
  "jSkype/client",
  "constants/common",
  "jSkype/settings"
], function (e) {
  function v(e) {
    var t = a.fetch({
      key: "message_text_removed",
      params: {
        date: l.formatDate(e),
        time: l.formatTimestampShort(e)
      }
    });
    return "<span class=\"deleted\">" + t + "</span>";
  }
  function m(e, t, n) {
    var r;
    return t.chatService._editMessage(n, e).then(function () {
      r = t.historyService.activityItems(e.key());
      r.status._set(o.activityStatus.Succeeded);
    }, function () {
      r = t.historyService.activityItems(e.key());
      r.status._set(o.activityStatus.Failed);
    }), e.status._set(o.activityStatus.Pending), n.length === 0 ? (e.isDeleted._set(!0), v(t.lastModificationTimestamp())) : n;
  }
  function g() {
    var e = this;
    e.key = t.property({ readOnly: !0 });
    e.type = t.property({ readOnly: !0 });
    e.timestamp = t.property({ readOnly: !0 });
    e.status = t.property({ readOnly: !0 });
    e.reason = t.property({ readOnly: !0 });
    e.isRead = t.property({
      readOnly: !0,
      value: !0
    });
    e._supportedAnnotations = [];
  }
  function y() {
    s.merge(this, new g());
    this.author = null;
    this.persons = t.collection();
    this.context = t.property({ readOnly: !0 });
  }
  function b() {
    s.merge(this, new g());
    this.direction = t.property({ readOnly: !0 });
    this.duration = t.property({ readOnly: !0 });
  }
  function w() {
    s.merge(this, new g());
    this.direction = t.property({ readonly: !0 });
    this.isGroup = t.property({ readonly: !0 });
    this.participantName = t.property({ readonly: !0 });
    this.participantEndpoint = t.property({ readonly: !0 });
  }
  function E() {
    s.merge(this, new g());
    this.participantNames = t.collection();
  }
  function S() {
    s.merge(this, new g());
  }
  function x(e) {
    function a(t) {
      return m(r, e, t);
    }
    if (!e)
      throw new Error("Text message activity item requires conversation");
    s.merge(this, new g());
    var r = this, o = t.boolProperty(!1), u = t.command(a, o);
    this.direction = t.property({ readOnly: !0 });
    this.sender = null;
    this.isEdited = t.property({ readOnly: !0 });
    this.isDeleted = t.property({ readOnly: !0 });
    this.html = t.property({ set: u });
    this._htmlSetEnabled = o;
    this.text = function () {
      var t = n.unwebify(r.html());
      return i.build(h).getNodeTextContent(t);
    };
    this.isDeleted.once(!0, function () {
      o(!1);
    });
    this._isOriginal = function () {
      return !r.isEdited() && !r.isDeleted();
    };
    this._updateAllProperties = function (e) {
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
      c.updateMessageProperties(r, e);
    };
    c.decorateEmotions(this, e);
    c.decorateTranslations(this, e);
  }
  function T(e) {
    function f(t) {
      return t.length === 0 && u.deleteFile(n.documentId()), m(n, e, t);
    }
    if (!e)
      throw new Error("Video message activity item requires conversation");
    var n = this, r, i = t.boolProperty(!1), a = t.command(f, i);
    s.merge(this, new g(e));
    n._uri = null;
    n.type._set(o.activityType.VideoMessage);
    n.direction = t.property({ readOnly: !0 });
    n.duration = t.property({ readOnly: !0 });
    n.sender = null;
    n.thumbnailPath = t.property({ readOnly: !0 });
    n.thumbnailProgress = t.property({ readOnly: !0 });
    n.mediaUrl = t.property({ readOnly: !0 });
    n.mediaUrlProgress = t.property({ readOnly: !0 });
    n.html = t.property({ set: a });
    n._htmlSetEnabled = i;
    n.isDeleted = t.property({
      readOnly: !0,
      value: !1
    });
    n.documentId = t.property({ readOnly: !0 });
    n.isExpired = t.property({
      readOnly: !0,
      get: function () {
        return r || (r = t.task(), u.getVideoStatus(n._uri, function () {
          r.resolve(!1);
        }, function () {
          r.resolve(!0);
        })), r.promise;
      }
    });
    this._isOriginal = function () {
      return !n.isDeleted();
    };
    this._updateAllProperties = function (e) {
      c.updateMessageProperties(n, e);
      n.isDeleted._set(e.isDeleted());
      n.html._set(e.html());
      n._htmlSetEnabled(e._htmlSetEnabled());
    };
    c.decorateEmotions(this, e);
  }
  function N(e) {
    function u(t) {
      return m(n, e, t);
    }
    var n = this, r = t.boolProperty(!1), i = t.command(u, r);
    if (!e)
      throw new Error("ContactInfo message activity item requires conversation");
    s.merge(this, new g());
    this.direction = t.property({ readOnly: !0 });
    this.sender = null;
    this.type._set(o.activityType.ContactInfoMessage);
    this.contacts = t.collection();
    this.html = t.property({ set: i });
    this._htmlSetEnabled = r;
    this.isDeleted = t.property({
      readOnly: !0,
      value: !1
    });
    this._isOriginal = function () {
      return !n.isDeleted();
    };
    n._updateAllProperties = function (e) {
      n._id = e._id;
      n._actualId = e._actualId;
      n.status._set(e.status());
      n.isDeleted._set(e.isDeleted());
      n.html._set(e.html());
      n._htmlSetEnabled(e._htmlSetEnabled());
      c.updateMessageProperties(n, e);
    };
  }
  function C(e) {
    function l(t) {
      return t.length === 0 && e.fileTransferService.remove(n.documentId()), m(n, e, t);
    }
    if (!e)
      throw new Error("Picture message activity item requires conversation");
    s.merge(this, new g());
    var n = this, r = t.boolProperty(!1), i = t.command(l, r), a, f;
    n._uri = null;
    n.direction = t.property({ readOnly: !0 });
    n.sender = null;
    n.type._set(o.activityType.PictureMessage);
    n.progress = t.property({ value: 0 });
    n.shouldAbort = t.boolProperty(!1);
    n.html = t.property({ set: i });
    n._htmlSetEnabled = r;
    n.isDeleted = t.property({
      readOnly: !0,
      value: !1
    });
    n.documentId = t.property({ readOnly: !0 });
    n.thumbnailUrl = t.property({
      readOnly: !0,
      get: function () {
        if (!n._uri)
          return;
        return a || (a = t.task(), u.getThumbnailStatus(n._uri, a.resolve.bind(a), a.reject.bind(a))), a.promise;
      }
    });
    n.pictureUrl = t.property({
      readOnly: !0,
      get: function () {
        if (!n._uri)
          return;
        return f || (f = t.task(), u.getPictureStatus(n._uri, f.resolve.bind(f), f.reject.bind(f))), f.promise;
      }
    });
    this._isOriginal = function () {
      return !n.isDeleted();
    };
    n._updateAllProperties = function (e) {
      n._id = e._id;
      n._actualId = e._actualId;
      n.status._set(e.status());
      n._uri = e._uri;
      n.pictureUrl.get();
      c.updateMessageProperties(n, e);
    };
    c.decorateEmotions(this, e);
  }
  function k(e) {
    function u(t) {
      return t.length === 0 && e.fileTransferService.remove(n.documentId()), m(n, e, t);
    }
    if (!e)
      throw new Error("File transfer message activity item requires conversation");
    var n = this, r = t.boolProperty(!1), i = t.command(u, r);
    s.merge(this, new g());
    n.direction = t.property({ readOnly: !0 });
    n.sender = null;
    n.type._set(o.activityType.FileTransfer);
    n.fileName = null;
    n.fileType = null;
    n.fileUri = t.property({ readOnly: !0 });
    n.fileThumbnailUri = t.property({ readOnly: !0 });
    n.fileSize = null;
    n.progress = t.property({ value: 0 });
    n.shouldAbort = t.boolProperty(!1);
    n.html = t.property({ set: i });
    n._htmlSetEnabled = r;
    n.isDeleted = t.property({
      readOnly: !0,
      value: !1
    });
    n.documentId = t.property({ readOnly: !0 });
    this._isOriginal = function () {
      return !n.isDeleted();
    };
    n._updateAllProperties = function (e) {
      c.updateMessageProperties(n, e);
      n._id = e._id;
      n._actualId = e._actualId;
      n.isDeleted._set(e.isDeleted());
      n.html._set(e.html());
      n._htmlSetEnabled(e._htmlSetEnabled());
    };
    c.decorateEmotions(this, e);
  }
  function L() {
    function n() {
      var t = {
        name: p.telemetry.contacts.name.CONTACT_REQUEST_READ,
        user_from: [
          e.sender.id(),
          window.skypeTelemetryManager.PIIType.Identity
        ]
      };
      h.get()._telemetryManager.sendEvent(d.settings.telemetry.jSkypeTenantToken, p.telemetry.contacts.type.CONTACT_REQUESTS, t);
    }
    var e = this;
    s.merge(this, new g());
    this.greeting = t.property({ readOnly: !0 });
    this.sender = null;
    this.isRead._set(!1);
    this.direction = t.property({
      readOnly: !0,
      value: o.direction.Incoming
    });
    this.isRead.once(!0, function () {
      e.sender !== null && e.direction() === o.direction.Incoming && n();
    });
  }
  function A(e) {
    function a() {
      return u || (u = new Promise(function (e, t) {
        f.getMojiMetaData(n._metaDataUri, e, t);
      }).then(function (e) {
        return r.validate(e.auxiliaryUrl) || (e.auxiliaryUrl = ""), e.description = e.description || "", e.auxiliaryText = e.auxiliaryText || e.auxiliaryUrl, e.copyright = e.copyright || "", e;
      })), u;
    }
    function l(t) {
      return m(n, e, t);
    }
    var n = this, i = t.boolProperty(!1), o = t.command(l, i), u;
    if (!e)
      throw new Error("Moji message activity item requires conversation");
    s.merge(this, new g(e));
    this.direction = t.property({ readOnly: !0 });
    this.thumbnailUrl = t.property({ readOnly: !1 });
    this.mojiUrl = t.property({ readOnly: !1 });
    this.sender = null;
    this._metaDataUri = null;
    this.isDeleted = t.property({
      readOnly: !0,
      value: !1
    });
    this.html = t.property({ set: o });
    this._htmlSetEnabled = i;
    this.mojiMetaData = t.property({
      readOnly: !0,
      get: a
    });
    this._isOriginal = function () {
      return !n.isDeleted();
    };
    n._updateAllProperties = function (e) {
      n._id = e._id;
      n._actualId = e._actualId;
      c.updateMessageProperties(n, e);
    };
    c.decorateEmotions(this, e);
  }
  function O(e) {
    function o(t) {
      return m(n, e, t);
    }
    if (!e)
      throw new Error("Poll message activity item requires conversation");
    s.merge(this, new g());
    var n = this, r = t.boolProperty(!1), i = t.command(o, r);
    n.conversationId = t.property({ readOnly: !0 });
    n.xmmType = t.property({ readOnly: !0 });
    n.direction = t.property({ readOnly: !0 });
    n.sender = null;
    n.isEdited = t.property({ readOnly: !0 });
    n.isDeleted = t.property({
      readOnly: !0,
      value: !1
    });
    n.html = t.property({ set: i });
    n._htmlSetEnabled = r;
    n.pollQuestion = t.property({ readOnly: !0 });
    n.pollAnswers = t.collection({ readOnly: !0 });
    n.highestNumberOfVotes = t.property({ readOnly: !0 });
    n.peopleVotedNum = t.property({ readOnly: !0 });
    n.meCheckedAnswerPositions = t.collection({ readOnly: !0 });
    n.meVoted = t.property({ readOnly: !0 });
    n.multipleVotes = t.boolProperty(!1);
    n._isOriginal = function () {
      return !this.isEdited() && !this.isDeleted();
    };
    n._updateAllProperties = function (e) {
      var t = this;
      t._id = e._id;
      t._actualId = e._actualId;
      t.key._set(e.key());
      t.type._set(e.type());
      t.timestamp._set(e.timestamp());
      t.status._set(e.status());
      t.reason._set(e.reason());
      t.isRead._set(e.isRead());
      t.direction._set(e.direction());
      t.sender = e.sender;
      t.isEdited._set(e.isEdited());
      t.isDeleted._set(e.isDeleted());
      t.html._set(e.html());
      t._htmlSetEnabled(e._htmlSetEnabled());
      t.conversationId._set(e.conversationId());
      t.xmmType._set(e.xmmType());
      t.pollQuestion._set(e.pollQuestion());
      t.pollAnswers(e.pollAnswers());
      t.highestNumberOfVotes._set(e.highestNumberOfVotes());
      t.peopleVotedNum._set(e.peopleVotedNum());
      t.meCheckedAnswerPositions(e.meCheckedAnswerPositions());
      t.meVoted._set(e.meVoted());
      t.multipleVotes._set(e.multipleVotes());
      c.updateMessageProperties(t, e);
    };
    n.addAnswer = function (e) {
      var t = this, n = t.pollAnswers().indexOf(e);
      if (n === -1)
        return;
      t.meCheckedAnswerPositions.add(n);
      t.poll.add({
        key: "pollAnswer",
        value: JSON.stringify(t.meCheckedAnswerPositions())
      });
      t.meVoted._set(!0);
    };
    c.decorateEmotions(this, e);
    c.decoratePoll(n, e);
  }
  function M(e) {
    var n = this;
    s.merge(n, new g(e));
    n.sender = null;
    n.direction = t.property({ readOnly: !0 });
    n.isRead._set(!1);
    n.orderId = null;
    n.transactionStatus = t.property({
      readOnly: !0,
      value: o.transactionStatus.Pending
    });
    n.amount = null;
    n.currency = null;
    n.personalization = null;
    n._isOriginal = function () {
      return !0;
    };
    n._updateAllProperties = function (e) {
      var t = this;
      t._id = e._id;
      t._actualId = e._actualId;
      c.updateMessageProperties(t, e);
    };
    c.decorateEmotions(this, e);
  }
  var t = e("jcafe-property-model"), n = e("utils/chat/messageSanitizer"), r = e("utils/chat/urlValidator"), i = e("utils/common/encoder"), s = e("lodash-compat"), o = e("swx-enums"), u = e("jSkype/services/asyncMedia/main"), a = e("swx-i18n").localization, f = e("jSkype/services/mojiMedia/main"), l = e("utils/chat/dateTime"), c = e("jSkype/services/annotations/main"), h = e("jSkype/client"), p = e("constants/common"), d = e("jSkype/settings");
  return {
    ConversationActivityItem: g,
    ParticipantActivityItem: y,
    NgcUpgradeActivityItem: E,
    CallingActivityItem: b,
    PluginFreeActivityItem: S,
    PstnActivityItem: w,
    TextMessageActivityItem: x,
    VideoMessageActivityItem: T,
    PictureMessageActivityItem: C,
    FileTransferActivityItem: k,
    ContactRequestActivityItem: L,
    MojiMessageActivityItem: A,
    TransactionMessageActivityItem: M,
    ContactInfoMessageActivityItem: N,
    PollMessageActivityItem: O
  };
});
