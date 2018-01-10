(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/utils/chat/messageTypes", [
      "require",
      "exports",
      "lodash-compat",
      "swx-i18n",
      "swx-encoder",
      "swx-enums",
      "swx-constants",
      "swx-jskype-internal-application-instance",
      "../../../lib/models/conversationActivityItem",
      "swx-mri",
      "swx-mri/lib/mriMaps",
      "../../../lib/modelHelpers/personsAndGroupsHelper",
      "jskype-settings-instance",
      "../../../lib/services/annotations/main",
      "../../../lib/telemetry/poll",
      "../../../lib/utils/chat/parser",
      "../../../lib/utils/chat/message",
      "swx-utils-chat",
      "./smsMessageBuilder",
      "swx-utils-chat/lib/dateTime",
      "swx-utils-chat/lib/urlValidator"
    ], e);
}(function (e, t) {
  function x(e) {
    return ut.hasOwnProperty(e) ? ut[e] : ut.Unknown;
  }
  function T(e, t) {
    try {
      return e(t);
    } catch (n) {
      var r = t.content.match(/<URIObject[^>]*?\stype=\"([^"]+?)\"/i);
      return r && r[1] && r[1].split(".")[0].toLowerCase() === "poll" && d.error(t.conversationModel.conversationId, t.key, r[1], o.COMMON.telemetry.poll.errorType.PARSING), O(t);
    }
  }
  function N(e) {
    var t = r.localization.fetch({
      key: "message_text_removed",
      params: {
        date: b.formatDate(e),
        time: b.formatTimestampShort(e)
      }
    });
    return "<span class=\"deleted\">" + t + "</span>";
  }
  function C() {
    var e = r.localization.fetch({
        key: "message_text_removed",
        params: {
          date: "[^<>&]*",
          time: "[^<>&]*"
        }
      }), t = "(?:<|&lt;)span class=\"deleted\"(?:>|&gt;)" + e + "(?:<|&lt;)/span(?:>|&gt;)";
    return t;
  }
  function k() {
    var e = new RegExp("^" + C() + "$");
    return e;
  }
  function L(e) {
    var t = /<target>(\d+:[^<]+)<\/target>/, n = e.match(t);
    return n ? n[1] : undefined;
  }
  function A(e) {
    var t = /<value>(.+)<\/value>/, n = e.match(t);
    return n ? n[1] : undefined;
  }
  function O(e) {
    return e.content = r.localization.fetch({ key: "message_text_parsing_error" }), I(e);
  }
  function M(e) {
    return e.content = r.localization.fetch({ key: "message_text_pollsFeatureDisabled" }), I(e);
  }
  function _(e) {
    return e.messagetype = g.messageSanitizer.escapeIncomingHTML(e.messagetype), e.messagetype.toLowerCase() === "nudge" ? null : (e.content = r.localization.fetch({
      key: "message_text_unknownMessageType",
      params: { mesageType: e.messagetype }
    }), I(e));
  }
  function D(e) {
    var t = i.build(u).decode(e), n = g.messageSanitizer.removeMetaData(t);
    return n.length === 0 ? !0 : k().test(n);
  }
  function P(e) {
    function i() {
      e.content === "" && !n.isUndefined(t) && t !== "" && (e.content = g.messageSanitizer.processOutgoingTextMessage(t));
    }
    var t = e.originalContent || e.content, r = e.skypeemoteoffset && D(t.substr(e.skypeemoteoffset));
    return !e._processed && !D(t) && !r && (e.content = g.messageSanitizer.getMessageSanitizedContent(t), i()), I(e);
  }
  function H(e) {
    if (e._processed || D(e.content))
      return I(e);
    var t = function (e) {
        var t = /<Currency(.+?)\/>(.+?)<\/URIObject>/, n = e.match(t);
        return n && n.length > 2 && n[2];
      }, n = t(e.content);
    return n && (e.content = g.messageSanitizer.getMessageSanitizedContent(n)), P(e);
  }
  function B(e) {
    var t = f.getId(g.messageSanitizer.escapeIncomingHTML(e));
    return c.getPerson(t, f.getTypeFromKey(e));
  }
  function j(e) {
    var t;
    if (e._proccessed)
      return;
    e.content = g.messageSanitizer.removeMetaData(e.content);
    t = e.content;
    e.skypeemoteoffset && (t = t.substr(e.skypeemoteoffset));
    if (t.length === 0 || k().test(e.content))
      e.isDeleted = !0, e.content = N(new Date(parseInt(e.timestamp)).getTime());
    e._proccessed = !0;
  }
  function F(e, t) {
    j(t);
    e.html._set(t.content);
    !t.isMyself || e._htmlSetEnabled(!0);
    e.isDeleted._set(!!t.isDeleted);
    e.isEdited._set(!!t.skypeeditedid && !t.isDeleted);
  }
  function I(e) {
    var t = B(e.author), n = new a.TextMessageActivityItem(e.conversationModel, e.messagetype);
    return n._id = e.id, n.sender = t, F(n, e), n.type._set(s.activityType.TextMessage), n.direction._set(e.isMyself ? s.direction.Outgoing : s.direction.Incoming), e.skypeemoteoffset && h.isFeatureOn(o.COMMON.featureFlags.ME_COMMAND_ENABLED) && (n._skypeemoteoffset = e.skypeemoteoffset), p["default"].parseMessageProperties(n, e), n;
  }
  function q(e) {
    var t = B(e.author), n = new a.ContactInfoMessageActivityItem(e.conversationModel);
    n._id = e.id;
    n.sender = t;
    n.direction._set(e.isMyself ? s.direction.Outgoing : s.direction.Incoming);
    var r = Y(e);
    return r.forEach(function (e, t) {
      n.contacts.add(e, t);
    }), e.isMyself && n._htmlSetEnabled.set(!0), n;
  }
  function R(e) {
    var t = new a.ParticipantActivityItem();
    return t._id = e.id, t.type._set(e.activityType), t.author = e.author, t.persons(e.persons), t.context._set(e.context), t;
  }
  function U(e) {
    var t = new a.NgcUpgradeActivityItem(), n = e.content.match(/<systemMessage[^>]*?\susers=\"([^"]+?)\"/i), r = n && n[1] ? n[1].split("##~~") : [];
    return t._id = e.id, t.type._set(s.activityType.NgcUpgradeMessage), r.forEach(function (e) {
      t.participantNames.add(g.messageSanitizer.escapeIncomingHTML(e.trim()));
    }), t;
  }
  function z(e, t) {
    if (!w.validate(t, h.settings.URLSanitizer.securedResources))
      return _(e);
    var n = t.match(/.+\/(.+?)\/?$/), r = new a.PictureMessageActivityItem(e.conversationModel);
    return r._id = e.id, r.isRead._set(!1), r.direction._set(e.isMyself ? s.direction.Outgoing : s.direction.Incoming), r.sender = B(e.author), r._uri = t, r.documentId._set(n ? n[1] : ""), e.isMyself && r._htmlSetEnabled.set(!0), p["default"].parseMessageProperties(r, e), r;
  }
  function W(e) {
    var t = B(e.author), r = u.get().personsAndGroupsManager.mePerson, i = new a.PollMessageActivityItem(e.conversationModel), o = new DOMParser().parseFromString(e.content, "text/xml"), f = o.documentElement.getAttribute("type"), l = o.documentElement.getElementsByTagName("Question")[0].getAttribute("value"), c = o.documentElement.getElementsByTagName("MultipleChoice"), h = c.length ? c[0].getAttribute("value") === "true" : !1, d = 0, v = 0, m = [], y = n.map(o.documentElement.getElementsByTagName("Answer"), function (e) {
        return {
          answerText: g.messageSanitizer.escapeIncomingHTML(g.messageSanitizer.unwebify(e.getAttribute("value"))),
          barWidth: 0,
          votes: 0,
          users: []
        };
      });
    p["default"].parseMessageProperties(i, e);
    i._id = e.id;
    i.sender = t;
    i.conversationId._set(e.conversationModel.conversationId);
    j(e);
    !e.isMyself || i._htmlSetEnabled.set(!0);
    i.isDeleted._set(!!e.isDeleted);
    i.isEdited._set(!!e.skypeeditedid && !e.isDeleted);
    i.type._set(s.activityType.PollMessage);
    i.direction._set(e.isMyself ? s.direction.Outgoing : s.direction.Incoming);
    if (i.poll) {
      var b = n.find(i.poll(), function (e) {
        return e.key === "pollAnswer";
      });
      b && b.users && (b.users.forEach(function (e) {
        var t = e.value ? JSON.parse(e.value) : [], n = {};
        v++;
        n.person = e.person;
        e.person ? n.displayName = e.person.displayName() : n.displayName = e.mri;
        t.forEach(function (e) {
          var t = y[e];
          t.votes = t.votes + 1;
          t.users.push(n);
          d < t.votes && (d = t.votes);
        });
        e.person === r && (m = t);
      }), b.users.forEach(function (e) {
        var t = JSON.parse(e.value);
        t.forEach(function (e) {
          var t = y[e];
          t.barWidth = Math.round(t.votes / d * 100);
        });
      }));
    }
    return i.xmmType._set(f), i.pollQuestion._set(g.messageSanitizer.escapeIncomingHTML(g.messageSanitizer.unwebify(l))), i.highestNumberOfVotes._set(d), i.pollAnswers(y), i.peopleVotedNum._set(v), i.meCheckedAnswerPositions(m), i.meVoted._set(!n.isEmpty(m)), i.multipleVotes._set(h), i;
  }
  function X(e, t, n) {
    var r = t.match(/.+\/(.+?)\/?$/);
    n._id = e.id;
    n._uri = t;
    n.isRead._set(!1);
    n.direction._set(e.isMyself ? s.direction.Outgoing : s.direction.Incoming);
    n.sender = B(e.author);
    n.documentId._set(r ? r[1] : "");
    e.isMyself && n._htmlSetEnabled.set(!0);
    p["default"].parseMessageProperties(n, e);
  }
  function V(e, t) {
    var n = h.isFeatureOn(o.COMMON.featureFlags.IS_CLOUD_VIDEO_MESSAGE_ENABLED);
    if (!n || !w.validate(t, h.settings.URLSanitizer.securedResources))
      return _(e);
    var r = new a.VideoMessageActivityItem(e.conversationModel);
    return r.thumbnailPath._set(t + "/views/thumbnail"), r.mediaUrl._set(t + "/views/video"), X(e, t, r), r;
  }
  function $(e, t) {
    var n = h.isFeatureOn(o.COMMON.featureFlags.IS_CLOUD_AUDIO_MESSAGE_ENABLED);
    if (!n || !w.validate(t, h.settings.URLSanitizer.securedResources))
      return _(e);
    var r = new a.AudioMessageActivityItem(e.conversationModel);
    return r.mediaUrl._set(t + "/views/audio"), X(e, t, r), r;
  }
  function J(e, t) {
    function d(e) {
      if (!e)
        return "unknown";
      var t = e.split(".");
      return t.length < 2 ? "unknown" : t.pop().toLowerCase();
    }
    var n = B(e.author), r = new a.FileTransferActivityItem(e.conversationModel), i = t.match(/.+\/(.+?)\/?$/), o = e.content.match(/<OriginalName[\s]+[^<]*v=\"([\s\S]*?)\"[^<]/), u = e.content.match(/<URIObject[\s\S]*url_thumbnail=\"([\S]*?)\"/i), f = e.content.match(/<FileSize[\s]+[^<]*v=\"([\d]*?)\"[^<]/i), l = e.content.match(/uri=\"https:[s\S]*v1\/objects\/([\s\S]*?)(\"|\/)/), c = o ? o[1] : "";
    return r.isRead._set(!1), r.direction._set(e.isMyself ? s.direction.Outgoing : s.direction.Incoming), r.sender = n, r.fileName = c, r.fileType = d(c), r.fileThumbnailUri._set(u ? u[1] : ""), r.fileUri._set(i ? h.settings.amdServiceHost + "/v1/objects/" + i[1] + "/views/original" : ""), r.fileSize = f ? f[1] : 0, r.documentId._set(l ? l[1] : ""), e.isMyself && r._htmlSetEnabled.set(!0), p["default"].parseMessageProperties(r, e), r;
  }
  function K(e) {
    var t = new a.TransactionMessageActivityItem(e.conversationModel);
    t.sender = B(e.author);
    t.type._set(s.activityType.CreditTransaction);
    t.direction._set(e.isMyself ? s.direction.Outgoing : s.direction.Incoming);
    var n = e.content.match(/<Order[^>]*?\svalue=\"([^"]+?)\"/i);
    return t.orderId = n && g.messageSanitizer.escapeIncomingHTML(n[1]), n = e.content.match(/<Personalization[^>]*?\svalue=\"([^"]+?)\"/i), t.personalization = n && g.messageSanitizer.escapeIncomingHTML(n[1]), n = e.content.match(/<Amount[^>]*?\svalue=\"([^"]+?)\"/i), t.amount = n && parseFloat(g.messageSanitizer.escapeIncomingHTML(n[1])), n = e.content.match(/<Currency[^>]*?\svalue=\"([^"]+?)\"/i), t.currency = n && g.messageSanitizer.escapeIncomingHTML(n[1]), p["default"].parseMessageProperties(t, e), t;
  }
  function Q(e) {
    var t = e.content.match(/<sms alt=\"([^"]+?)\">/);
    return t ? g.messageSanitizer.escapeIncomingHTML(t[1]) : g.messageSanitizer.processOutgoingTextMessage(e.content);
  }
  function G() {
    var e = r.localization.fetch({ key: "message_text_fileTransferNotSupported" });
    return "<div class=\"icon-error\"></div>" + e;
  }
  function Y(e) {
    function r(e) {
      var t = /(<c t=\"([^"]+?)\"( p=\"([^"]+?)\")?( s=\"([^"]+?)\")?( f=\"([^"]+?)\")?\/>)/, n, r, i, s = e.match(t);
      s[2] === "s" ? (n = g.messageSanitizer.escapeIncomingHTML(s[6]), r = s[8] ? g.messageSanitizer.escapeIncomingHTML(s[8]) : n, i = l.contactMriTypes.skype) : (s[4] = g.messageSanitizer.escapeIncomingHTML(s[4]), n = r = s[4], i = l.contactMriTypes.pstn);
      var o = c.getPerson(n, i);
      return o.displayName._set(r), o;
    }
    function i() {
      var e = [];
      for (var t = 0; t < n.length; t++)
        e.push(r(n[t]));
      return e;
    }
    var t = /(<c t=\"([^"]+?)\"( p=\"([^"]+?)\")?( s=\"([^"]+?)\")?( f=\"([^"]+?)\")?\/>)/g, n = e.content.match(t);
    return n ? i() : null;
  }
  function Z(e) {
    var t = e.content.match(/<URIObject[^>]*?\suri=\"([^"]+?)\"/i);
    return t ? { url: t[1] } : null;
  }
  function et(e) {
    var t = h.isFeatureOn(o.COMMON.featureFlags.IS_FLIK_MESSAGE_ENABLED);
    if (D(e.content))
      return P(e);
    if (!t)
      return _(e);
    var n = new a.MojiMessageActivityItem(e.conversationModel), r = B(e.author), i = Z(e);
    if (!i)
      return _(e);
    var u = i.url;
    if (!w.validate(u, h.settings.URLSanitizer.securedResources))
      return _(e);
    var f = u + "/views/default", l = u + "/views/thumbnail";
    return n._id = e.id, n.isRead._set(!1), n.direction._set(e.isMyself ? s.direction.Outgoing : s.direction.Incoming), n.type._set(s.activityType.MojiMessage), n.sender = r, n.thumbnailUrl._set(l), n.mojiUrl._set(f), e.isMyself && n._htmlSetEnabled.set(!0), p["default"].parseMessageProperties(n, e), n;
  }
  function tt(e) {
    return decodeURIComponent(Array.prototype.map.call(atob(e), function (e) {
      return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
  }
  function nt(e) {
    var t = e.content.match(/<URIObject[^>]*?\stype=\"([^"]+?)\"/i), i = e.content.match(/<Title>(.*)<\/Title>/i), s = e.content.match(/<Swift b64="([^"]+)"\s*\/>/i);
    if (!t || !s)
      return _(e);
    t = t[1].split(".")[0];
    i ? i = i[1] : i = r.localization.fetch({
      key: "message_text_swift_defaultTitle",
      params: { mesageType: e.messagetype }
    });
    if (t.trim().toLowerCase() !== "swift")
      return rt(e);
    var o = n.clone(e);
    try {
      return o.content = "<SwiftCard Swift=\"" + encodeURIComponent(tt(s[1])) + "\">" + g.messageSanitizer.stripHTML(i) + "</SwiftCard>", I(o);
    } catch (u) {
      return _(e);
    }
  }
  function rt(e) {
    var t = e.content.match(/<URIObject[^>]*?\suri=\"([^"]+?)\"/i), n = e.content.match(/<URIObject[^>]*?\stype=\"([^"]+?)\"/i), r = e.content.match(/<meta[^>]*?\stype=\"([^"]+?)\"/i);
    if (!t)
      return P(e);
    t = t[1];
    if (!n)
      return r && r[1] === "photo" ? z(e, t) : _(e);
    n = n[1].split(".")[0];
    var i = E[n] || _;
    return i(e, t);
  }
  function it(e) {
    var t = Y(e), n = "";
    return t && t.forEach(function (e) {
      n += r.localization.fetch({
        key: "message_text_contactItem",
        params: {
          fullName: e.displayName(),
          name: e.id()
        }
      });
    }), n;
  }
  function st(e) {
    var t, n = e.content.match(/<URIObject[^>]*?\stype=\"([^"]+?)\"/i), r = n && n[1] && n[1].split(".")[0].toLowerCase();
    if (!(t = S[r]))
      return !1;
    var i = h.isFeatureOn(t.flagName);
    return i ? t.onHandler : t.offHandler;
  }
  function ot(e) {
    var t = e.content.match(/<systemMessage[^>]*?\stype=\"([^"]+?)\"/i);
    return t && t[1] === "ngcUpgradeMessage" ? U : undefined;
  }
  var n = e("lodash-compat"), r = e("swx-i18n"), i = e("swx-encoder"), s = e("swx-enums"), o = e("swx-constants"), u = e("swx-jskype-internal-application-instance"), a = e("../../../lib/models/conversationActivityItem"), f = e("swx-mri"), l = e("swx-mri/lib/mriMaps"), c = e("../../../lib/modelHelpers/personsAndGroupsHelper"), h = e("jskype-settings-instance"), p = e("../../../lib/services/annotations/main"), d = e("../../../lib/telemetry/poll"), v = e("../../../lib/utils/chat/parser"), m = e("../../../lib/utils/chat/message"), g = e("swx-utils-chat"), y = e("./smsMessageBuilder"), b = e("swx-utils-chat/lib/dateTime"), w = e("swx-utils-chat/lib/urlValidator"), E = {
      Picture: z,
      Audio: $,
      Video: V,
      File: J
    }, S = {
      credit: {
        onHandler: K,
        offHandler: H,
        flagName: o.COMMON.featureFlags.CREDIT_GIFTING
      },
      poll: {
        onHandler: W,
        offHandler: M,
        flagName: o.COMMON.featureFlags.POLLS_ENABLED
      }
    };
  t.fetch = x;
  t.parse = T;
  t._isDeletedMessage = D;
  var ut = {
    Unknown: _,
    Text: P,
    RichText: function (e) {
      var t = st(e) || ot(e);
      return t ? t(e) : P(e);
    },
    "RichText/Contacts": function (e) {
      if (!e._proccessed && !D(e.content)) {
        var t = h.isFeatureOn(o.COMMON.featureFlags.CONTACT_CARD_RENDERING_ENABLED);
        if (t)
          return q(e);
        e.content = r.localization.fetch({
          key: "message_text_sentContacts",
          params: { contacts: it(e) }
        });
      }
      return I(e);
    },
    "RichText/Files": function (e) {
      return e._proccessed || (e.content = G()), I(e);
    },
    "RichText/Sms": function (e) {
      e._proccessed || (e.content = Q(e));
      var t = I(e);
      return t._isSMS(!0), t._smsInfo(y.getInfo(e.originalContent, t)), t;
    },
    "RichText/Location": function (e) {
      var t = e.content.match(/<a[^>]+href="https:\/\/www.bing.com\/maps([^"]+)"[^>]*>([^<]*)/);
      return t ? (e._proccessed || (e.content = "<a href=\"" + h.settings.locationHost + t[1] + "\" target=\"_blank\">" + g.messageSanitizer.escapeIncomingHTML(t[2]) + "</a>"), I(e)) : _(e);
    },
    "RichText/UriObject": rt,
    "RichText/Media_GenericFile": function (e) {
      return !e._proccessed && !D(e.content) ? rt(e) : I(e);
    },
    "RichText/Media_Video": rt,
    "RichText/Media_AudioMsg": rt,
    "RichText/Media_FlikMsg": et,
    "RichText/Media_Card": nt,
    "Event/SkypeVideoMessage": function (e) {
      return e.content = r.localization.fetch({ key: "message_text_unsupportedVideoMessageYet" }), I(e);
    },
    "Event/SkypeAudioMessage": function (e) {
      return e.content = r.localization.fetch({ key: "message_text_unsupportedAudioMessageYet" }), I(e);
    },
    "ThreadActivity/AddMember": function (e) {
      var t = {}, n = m.getInitiator(e.content), r = m.getTargets(e.content), i = function (e) {
          var t = e.map(function (e) {
            return B(e);
          });
          return t;
        };
      return t.activityType = s.activityType.ParticipantJoined, t.author = B(n), t.persons = i(r), R(t);
    },
    "ThreadActivity/DeleteMember": function (e) {
      var t = {}, n = m.getInitiator(e.content), r = L(e.content), i = v.getConversationIdFromUrl(e.conversationLink);
      return t.activityType = s.activityType.ParticipantLeft, t.author = B(n), t.persons = r === n ? [] : [B(r)], t.context = i.replace(/^\d+:/, ""), R(t);
    },
    "ThreadActivity/RoleUpdate": function (e) {
      var t = m.getInitiator(e.content), n = /<target><id>(\d+:.+)<\/id><role>(.+)<\/role><\/target>/, r = e.content.match(n), i = {};
      return i.activityType = s.activityType.ParticipantRoleUpdate, i.author = B(t), i.persons = [B(r[1])], i.context = g.messageSanitizer.escapeIncomingHTML(r[2]), R(i);
    },
    "ThreadActivity/TopicUpdate": function (e) {
      var t = m.getInitiator(e.content), n = /(?:<value>(.+)<\/value>|<value \/>)/, r = e.content.match(n), o = i.build(u), a = {};
      return a.activityType = s.activityType.ParticipantTopicUpdate, a.author = B(t), a.persons = [], a.context = g.messageSanitizer.escapeIncomingHTML(o.decode(g.messageSanitizer.unescapeHTML(r[1] || ""))), R(a);
    },
    "ThreadActivity/PictureUpdate": function (e) {
      var t = m.getInitiator(e.content), n = {};
      return n.activityType = s.activityType.ParticipantPictureUpdate, n.author = B(t), n.persons = [], R(n);
    },
    "ThreadActivity/HistoryDisclosedUpdate": function (e) {
      var t = m.getInitiator(e.content), n = A(e.content).toLowerCase(), r = {};
      return r.activityType = s.activityType.ParticipantHistoryDisclosed, r.author = B(t), r.persons = [], r.context = n !== "false", R(r);
    },
    "ThreadActivity/JoiningEnabledUpdate": function (e) {
      var t = m.getInitiator(e.content), n = A(e.content).toLowerCase(), r = {};
      return r.activityType = s.activityType.ParticipantJoiningEnabled, r.author = B(t), r.persons = [], r.context = n !== "false", R(r);
    },
    "ThreadActivity/LegacyMemberAdded": function (e) {
      var t = L(e.content), n = {};
      return n.activityType = s.activityType.ParticipantLegacyMemberAdded, n.author = B(t), n.persons = [], R(n);
    },
    "ThreadActivity/LegacyMemberUpgraded": function (e) {
      var t = L(e.content), n = {};
      return n.activityType = s.activityType.ParticipantLegacyMemberUpgraded, n.author = B(t), n.persons = [], R(n);
    },
    "Event/Call": function (e) {
      var t = e.content.replace(/\r?\n/g, ""), n = f.getId(e.myself), r = new RegExp("<part identity=\"" + n + "\">.*?<duration>(\\d+)</duration>\\s*?</part>", "g"), i = t.match(r.source), o = /<partlist type="started" alt="">(.*)<\/partlist>/.test(t), u = /<partlist alt="">\s*<\/partlist>/.test(t), l = /<partlist type="ended" alt="">(.*)<\/partlist>/.test(t), c = 0, h = s.activityType.CallMissed;
      o || u ? h = s.activityType.CallStarted : i ? (c = parseInt(i[1], 10), h = s.activityType.CallEnded) : l && e.isMyself && (h = s.activityType.CallEnded);
      var p = new a.CallingActivityItem();
      return p.duration._set(c), p.isRead._set(!1), p.type._set(h), p.direction._set(e.isMyself ? s.direction.Outgoing : s.direction.Incoming), p;
    }
  };
}));
