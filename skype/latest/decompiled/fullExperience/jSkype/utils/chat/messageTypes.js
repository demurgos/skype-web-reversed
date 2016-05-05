define("jSkype/utils/chat/messageTypes", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-i18n",
  "utils/common/encoder",
  "swx-enums",
  "constants/common",
  "jSkype/client",
  "jSkype/models/conversationActivityItem",
  "jSkype/modelHelpers/contacts/dataMappers/dataMaps",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/modelHelpers/personHelper",
  "jSkype/settings",
  "jSkype/services/annotations/main",
  "jSkype/telemetry/poll",
  "jSkype/utils/chat/parser",
  "utils/chat/dateTime",
  "utils/chat/messageSanitizer",
  "jSkype/utils/chat/message",
  "utils/chat/pesUtils",
  "utils/chat/urlValidator"
], function (e, t) {
  function x(e) {
    var t = r.fetch({
      key: "message_text_removed",
      params: {
        date: m.formatDate(e),
        time: m.formatTimestampShort(e)
      }
    });
    return "<span class=\"deleted\">" + t + "</span>";
  }
  function T() {
    var e, t = r.fetch({
        key: "message_text_removed",
        params: {
          date: "[^<>&]*",
          time: "[^<>&]*"
        }
      });
    return e = "(?:<|&lt;)span class=\"deleted\"(?:>|&gt;)" + t + "(?:<|&lt;)/span(?:>|&gt;)", e;
  }
  function N() {
    var e;
    return e = new RegExp("^" + T() + "$"), e;
  }
  function C(e) {
    var t = /<target>(\d+:[^<]+)<\/target>/, n = e.match(t);
    if (n)
      return n[1];
  }
  function k(e) {
    var t = /<value>(.+)<\/value>/, n = e.match(t);
    if (n)
      return n[1];
  }
  function L(e) {
    return e.content = r.fetch({ key: "message_text_parsing_error" }), j(e);
  }
  function A(e) {
    return e.content = r.fetch({ key: "message_text_pollsFeatureDisabled" }), j(e);
  }
  function O(e) {
    return e.messagetype = g.escapeIncomingHTML(e.messagetype), e.content = r.fetch({
      key: "message_text_unknownMessageType",
      params: { mesageType: e.messagetype }
    }), j(e);
  }
  function M(e) {
    var t = i.build(u).decode(e), n = g.removeMetaData(t);
    return n.length === 0 ? !0 : N().test(n);
  }
  function _(e) {
    return !e._processed && !M(e.content) && (e.content = g.getMessageSanitizedContent(e.content)), j(e);
  }
  function D(e) {
    if (e._processed || M(e.content))
      return j(e);
    var t = function (e) {
        var t = /<Currency(.+?)\/>(.+?)<\/URIObject>/, n = e.match(t);
        return n && n.length > 2 && n[2];
      }, n = t(e.content);
    return n && (e.content = g.getMessageSanitizedContent(n)), _(e);
  }
  function P(e) {
    var t = c.getId(g.escapeIncomingHTML(e));
    return l.getPerson(t, c.getTypeFromKey(e));
  }
  function H(e) {
    if (e._proccessed)
      return;
    e.content = g.removeMetaData(e.content), e.content.length === 0 && (e.isDeleted = !0, e.content = x(new Date(parseInt(e.timestamp)))), e._proccessed = !0;
  }
  function B(e, t) {
    H(t), e.html._set(t.content), !t.isMyself || e._htmlSetEnabled(!0), e.isDeleted._set(!!t.isDeleted), e.isEdited._set(!!t.skypeeditedid && !t.isDeleted);
  }
  function j(e) {
    var t = P(e.author), n;
    return n = new a.TextMessageActivityItem(e.conversationModel), n._id = e.id, n.sender = t, B(n, e), n.type._set(s.activityType.TextMessage), n.direction._set(e.isMyself ? s.direction.Outgoing : s.direction.Incoming), p.parseMessageProperties(n, e), n;
  }
  function F(e) {
    var t = P(e.author), n, r;
    return n = new a.ContactInfoMessageActivityItem(e.conversationModel), n._id = e.id, n.sender = t, n.direction._set(e.isMyself ? s.direction.Outgoing : s.direction.Incoming), r = J(e), r.forEach(function (e, t) {
      n.contacts.add(e, t);
    }), e.isMyself && n._htmlSetEnabled.set(!0), n;
  }
  function I(e) {
    var t = new a.ParticipantActivityItem();
    return t._id = e.id, t.type._set(e.activityType), t.author = e.author, t.persons(e.persons), t.context._set(e.context), t;
  }
  function q(e) {
    var t = new a.NgcUpgradeActivityItem(), n = e.content.match(/<systemMessage[^>]*?\susers=\"([^"]+?)\"/i), r = n && n[1] ? n[1].split("##~~") : [];
    return t._id = e.id, t.type._set(s.activityType.NgcUpgradeMessage), r.forEach(function (e) {
      t.participantNames.add(g.escapeIncomingHTML(e.trim()));
    }), t;
  }
  function R(e, t) {
    var n;
    return w.validate(t, h.settings.URLSanitizer.securedResources) ? (n = new a.PictureMessageActivityItem(e.conversationModel), n._id = e.id, n.isRead._set(!1), n.direction._set(e.isMyself ? s.direction.Outgoing : s.direction.Incoming), n.sender = P(e.author), n._uri = t, e.isMyself && n._htmlSetEnabled.set(!0), p.parseMessageProperties(n, e), n) : O(e);
  }
  function U(e) {
    var t = P(e.author), r = u.get().personsAndGroupsManager.mePerson, i = new a.PollMessageActivityItem(e.conversationModel), o = new DOMParser().parseFromString(e.content, "text/xml"), f = o.documentElement.getAttribute("type"), l = o.documentElement.getElementsByTagName("Question")[0].getAttribute("value"), c = o.documentElement.getElementsByTagName("MultipleChoice"), h = c.length ? c[0].getAttribute("value") === "true" : !1, d = 0, v = 0, m = [], y = n.map(o.documentElement.getElementsByTagName("Answer"), function (e) {
        return {
          answerText: g.escapeIncomingHTML(g.unwebify(e.getAttribute("value"))),
          barWidth: 0,
          votes: 0,
          users: []
        };
      });
    p.parseMessageProperties(i, e), i._id = e.id, i.sender = t, i.conversationId._set(e.conversationModel.conversationId), H(e), !e.isMyself || i._htmlSetEnabled.set(!0), i.isDeleted._set(!!e.isDeleted), i.isEdited._set(!!e.skypeeditedid && !e.isDeleted), i.type._set(s.activityType.PollMessage), i.direction._set(e.isMyself ? s.direction.Outgoing : s.direction.Incoming);
    if (i.poll) {
      var b = n.find(i.poll(), function (e) {
        return e.key === "pollAnswer";
      });
      b && b.users && (b.users.forEach(function (e) {
        var t = e.value ? JSON.parse(e.value) : [], n = {};
        v++, n.person = e.person, e.person ? n.displayName = e.person.displayName() : n.displayName = e.mri, t.forEach(function (e) {
          var t = y[e];
          t.votes = t.votes + 1, t.users.push(n), d < t.votes && (d = t.votes);
        }), e.person === r && (m = t);
      }), b.users.forEach(function (e) {
        var t = JSON.parse(e.value);
        t.forEach(function (e) {
          var t = y[e];
          t.barWidth = Math.round(t.votes / d * 100);
        });
      }));
    }
    return i.xmmType._set(f), i.pollQuestion._set(g.escapeIncomingHTML(g.unwebify(l))), i.highestNumberOfVotes._set(d), i.pollAnswers(y), i.peopleVotedNum._set(v), i.meCheckedAnswerPositions(m), i.meVoted._set(!n.isEmpty(m)), i.multipleVotes._set(h), i;
  }
  function z(e, t) {
    var n, r = t.match(/.+\/(.+?)\/?$/), i = h.isFeatureOn(o.featureFlags.IS_CLOUD_VIDEO_MESSAGE_ENABLED);
    return !i || !w.validate(t, h.settings.URLSanitizer.securedResources) ? O(e) : (n = new a.VideoMessageActivityItem(e.conversationModel), n._id = e.id, n._uri = t, n.isRead._set(!1), n.direction._set(e.isMyself ? s.direction.Outgoing : s.direction.Incoming), n.sender = P(e.author), n.documentId._set(r[1]), n.thumbnailPath._set(t + "/views/thumbnail"), n.mediaUrl._set(t + "/views/video"), e.isMyself && n._htmlSetEnabled.set(!0), p.parseMessageProperties(n, e), n);
  }
  function W(e, t) {
    function c(e) {
      if (!e)
        return "unknown";
      var t = e.split(".");
      return t.length < 2 ? "unknown" : t.pop().toLowerCase();
    }
    var n = P(e.author), r = new a.FileTransferActivityItem(e.conversationModel), i = t.match(/.+\/(.+?)\/?$/), o = e.content.match(/<OriginalName[\s]+[^<]*v=\"([\s\S]*?)\"[^<]/), u = e.content.match(/<URIObject[\s\S]*url_thumbnail=\"([\S]*?)\"/i), f = e.content.match(/<FileSize[\s]+[^<]*v=\"([\d]*?)\"[^<]/i), l = e.content.match(/uri=\"https:[s\S]*v1\/objects\/([\s\S]*?)(\"|\/)/);
    return r.isRead._set(!1), r.direction._set(e.isMyself ? s.direction.Outgoing : s.direction.Incoming), r.sender = n, r.fileName = o[1], r.fileType = c(o[1]), r.fileThumbnailUri._set(u[1]), r.fileUri._set(h.settings.amdServiceHost + "/v1/objects/" + i[1] + "/views/original"), r.fileSize = f ? f[1] : 0, r.documentId._set(l[1]), e.isMyself && r._htmlSetEnabled.set(!0), p.parseMessageProperties(r, e), r;
  }
  function X(e) {
    var t, n = new a.TransactionMessageActivityItem(e.conversationModel);
    return n.sender = P(e.author), n.type._set(s.activityType.CreditTransaction), n.direction._set(e.isMyself ? s.direction.Outgoing : s.direction.Incoming), t = e.content.match(/<Order[^>]*?\svalue=\"([^"]+?)\"/i), n.orderId = t && g.escapeIncomingHTML(t[1]), t = e.content.match(/<Personalization[^>]*?\svalue=\"([^"]+?)\"/i), n.personalization = t && g.escapeIncomingHTML(t[1]), t = e.content.match(/<Amount[^>]*?\svalue=\"([^"]+?)\"/i), n.amount = t && parseFloat(g.escapeIncomingHTML(t[1])), t = e.content.match(/<Currency[^>]*?\svalue=\"([^"]+?)\"/i), n.currency = t && g.escapeIncomingHTML(t[1]), p.parseMessageProperties(n, e), n;
  }
  function V(e) {
    var t = e.content.match(/<sms alt=\"([^"]+?)\">/);
    return g.escapeIncomingHTML(t[1]);
  }
  function $() {
    var e = r.fetch({ key: "message_text_fileTransferNotSupported" });
    return "<div class=\"icon-error\"></div>" + e;
  }
  function J(e) {
    function i(e) {
      var t = /(<c t=\"([^"]+?)\"( p=\"([^"]+?)\")?( s=\"([^"]+?)\")?( f=\"([^"]+?)\")?\/>)/, n, i, s, o;
      return n = e.match(t), n[2] === "s" ? (i = g.escapeIncomingHTML(n[6]), s = n[8] ? g.escapeIncomingHTML(n[8]) : i, o = f.contactTypes[f.contactTypeNames.skype]) : (n[4] = g.escapeIncomingHTML(n[4]), i = s = n[4], o = f.contactTypes[f.contactTypeNames.pstn]), r = l.getPerson(i, o), r.displayName._set(s), r;
    }
    function s() {
      var e = [];
      for (var t = 0; t < n.length; t++)
        e.push(i(n[t]));
      return e;
    }
    var t = /(<c t=\"([^"]+?)\"( p=\"([^"]+?)\")?( s=\"([^"]+?)\")?( f=\"([^"]+?)\")?\/>)/g, n = e.content.match(t), r;
    return n ? s() : null;
  }
  function K(e) {
    var t = e.content.match(/<URIObject[^>]*?\suri=\"([^"]+?)\"/i);
    return t ? { url: t[1] } : null;
  }
  function Q(e) {
    var t, n, r, i, u = "en", f, l, c, d;
    return t = h.isFeatureOn(o.featureFlags.IS_FLIK_MESSAGE_ENABLED), n = h.isFeatureOn(o.featureFlags.PES_CDN_AUTH_ENABLED), M(e.content) ? _(e) : t ? (h.settings.locale && h.settings.locale.pes && (u = h.settings.locale.pes), r = new a.MojiMessageActivityItem(e.conversationModel), i = P(e.author), f = K(e), f ? (l = f.url, w.validate(l, h.settings.URLSanitizer.securedResources) ? (n && (l = b.rewriteUrls(l, h.settings.pesCDNAuthentication.rewriteRules)), c = l + "/views/default", d = l + "/views/thumbnail", r._id = e.id, r.isRead._set(!1), r.direction._set(e.isMyself ? s.direction.Outgoing : s.direction.Incoming), r.type._set(s.activityType.MojiMessage), r.sender = i, r.thumbnailUrl._set(d), r.mojiUrl._set(c), r._metaDataUri = l + "/views/meta." + u, e.isMyself && r._htmlSetEnabled.set(!0), p.parseMessageProperties(r, e), r) : O(e)) : O(e)) : O(e);
  }
  function G(e) {
    var t = e.content.match(/<URIObject[^>]*?\suri=\"([^"]+?)\"/i), n = e.content.match(/<URIObject[^>]*?\stype=\"([^"]+?)\"/i), r = e.content.match(/<meta[^>]*?\stype=\"([^"]+?)\"/i), i;
    return t ? (t = t[1], n ? (n = n[1].split(".")[0], i = E[n] || O, i(e, t)) : r && r[1] === "photo" ? R(e, t) : O(e)) : _(e);
  }
  function Y(e) {
    var t = J(e), n = "";
    return t && t.forEach(function (e) {
      n += r.fetch({
        key: "message_text_contactItem",
        params: {
          fullName: e.displayName(),
          name: e.id()
        }
      });
    }), n;
  }
  function Z(e) {
    var t, n, r = e.content.match(/<URIObject[^>]*?\stype=\"([^"]+?)\"/i), i = r && r[1] && r[1].split(".")[0].toLowerCase();
    return (t = S[i]) ? (n = h.isFeatureOn(t.flagName), n ? t.onHandler : t.offHandler) : !1;
  }
  function et(e) {
    var t = e.content.match(/<systemMessage[^>]*?\stype=\"([^"]+?)\"/i);
    return t && t[1] === "ngcUpgradeMessage" ? q : !1;
  }
  var n = e("lodash-compat"), r = e("swx-i18n").localization, i = e("utils/common/encoder"), s = e("swx-enums"), o = e("constants/common"), u = e("jSkype/client"), a = e("jSkype/models/conversationActivityItem"), f = e("jSkype/modelHelpers/contacts/dataMappers/dataMaps"), l = e("jSkype/modelHelpers/personsAndGroupsHelper"), c = e("jSkype/modelHelpers/personHelper"), h = e("jSkype/settings"), p = e("jSkype/services/annotations/main"), d = e("jSkype/telemetry/poll"), v = e("jSkype/utils/chat/parser"), m = e("utils/chat/dateTime"), g = e("utils/chat/messageSanitizer"), y = e("jSkype/utils/chat/message"), b = e("utils/chat/pesUtils"), w = e("utils/chat/urlValidator"), E = {
      Picture: R,
      Video: z,
      File: W
    }, S = {
      credit: {
        onHandler: X,
        offHandler: D,
        flagName: o.featureFlags.CREDIT_GIFTING
      },
      poll: {
        onHandler: U,
        offHandler: A,
        flagName: o.featureFlags.POLLS_ENABLED
      }
    };
  t.fetch = function (e) {
    return tt.hasOwnProperty(e) ? tt[e] : tt.Unknown;
  }, t.parse = function (e, t) {
    try {
      return e(t);
    } catch (n) {
      var r = t.content.match(/<URIObject[^>]*?\stype=\"([^"]+?)\"/i);
      return r && r[1] && r[1].split(".")[0].toLowerCase() === "poll" && d.error(t.conversationModel.conversationId, t.key, r[1], o.telemetry.poll.errorType.PARSING), L(t);
    }
  }, t._isDeletedMessage = M;
  var tt = {
    Unknown: O,
    Text: _,
    RichText: function (e) {
      var t = Z(e) || et(e);
      return t ? t(e) : _(e);
    },
    "RichText/Contacts": function (e) {
      if (!e._proccessed && !M(e.content)) {
        var t = h.isFeatureOn(o.featureFlags.CONTACT_CARD_RENDERING_ENABLED);
        if (t)
          return F(e);
        e.content = r.fetch({
          key: "message_text_sentContacts",
          params: { contacts: Y(e) }
        });
      }
      return j(e);
    },
    "RichText/Files": function (e) {
      return e._proccessed || (e.content = $()), j(e);
    },
    "RichText/Sms": function (e) {
      return e._proccessed || (e.content = V(e)), j(e);
    },
    "RichText/Location": function (e) {
      var t = e.content.match(/<a[^>]+href="https:\/\/www.bing.com\/maps([^"]+)"[^>]*>([^<]*)/);
      return t ? (e._proccessed || (e.content = "<a href=\"" + h.settings.locationHost + t[1] + "\" target=\"_blank\">" + g.escapeIncomingHTML(t[2]) + "</a>"), j(e)) : O(e);
    },
    "RichText/UriObject": G,
    "RichText/Media_GenericFile": function (e) {
      return !e._proccessed && !M(e.content) ? G(e) : j(e);
    },
    "RichText/Media_Video": G,
    "RichText/Media_FlikMsg": Q,
    "Event/SkypeVideoMessage": function (e) {
      return e.content = r.fetch({ key: "message_text_unsupportedVideoMessageYet" }), j(e);
    },
    "ThreadActivity/AddMember": function (e) {
      var t = {}, n = y.getInitiator(e.content), r = y.getTargets(e.content), i = function (e) {
          var t;
          return t = e.map(function (e) {
            return P(e);
          }), t;
        };
      return t.activityType = s.activityType.ParticipantJoined, t.author = P(n), t.persons = i(r), I(t);
    },
    "ThreadActivity/DeleteMember": function (e) {
      var t = {}, n = y.getInitiator(e.content), r = C(e.content), i = v.getConversationIdFromUrl(e.conversationLink);
      return t.activityType = s.activityType.ParticipantLeft, t.author = P(n), t.persons = r === n ? [] : [P(r)], t.context = i.replace(/^\d+:/, ""), I(t);
    },
    "ThreadActivity/RoleUpdate": function (e) {
      var t = y.getInitiator(e.content), n = /<target><id>(\d+:.+)<\/id><role>(.+)<\/role><\/target>/, r = e.content.match(n), i = {};
      return i.activityType = s.activityType.ParticipantRoleUpdate, i.author = P(t), i.persons = [P(r[1])], i.context = g.escapeIncomingHTML(r[2]), I(i);
    },
    "ThreadActivity/TopicUpdate": function (e) {
      var t = y.getInitiator(e.content), n = /(?:<value>(.+)<\/value>|<value \/>)/, r = e.content.match(n), o = i.build(u), a = {};
      return a.activityType = s.activityType.ParticipantTopicUpdate, a.author = P(t), a.persons = [], a.context = g.escapeIncomingHTML(o.decode(g.unescapeHTML(r[1] || ""))), I(a);
    },
    "ThreadActivity/PictureUpdate": function (e) {
      var t = y.getInitiator(e.content), n = {};
      return n.activityType = s.activityType.ParticipantPictureUpdate, n.author = P(t), n.persons = [], I(n);
    },
    "ThreadActivity/HistoryDisclosedUpdate": function (e) {
      var t = y.getInitiator(e.content), n = k(e.content).toLowerCase(), r = {};
      return r.activityType = s.activityType.ParticipantHistoryDisclosed, r.author = P(t), r.persons = [], r.context = n !== "false", I(r);
    },
    "ThreadActivity/JoiningEnabledUpdate": function (e) {
      var t = y.getInitiator(e.content), n = k(e.content).toLowerCase(), r = {};
      return r.activityType = s.activityType.ParticipantJoiningEnabled, r.author = P(t), r.persons = [], r.context = n !== "false", I(r);
    },
    "ThreadActivity/LegacyMemberAdded": function (e) {
      var t = C(e.content), n = {};
      return n.activityType = s.activityType.ParticipantLegacyMemberAdded, n.author = P(t), n.persons = [], I(n);
    },
    "ThreadActivity/LegacyMemberUpgraded": function (e) {
      var t = C(e.content), n = {};
      return n.activityType = s.activityType.ParticipantLegacyMemberUpgraded, n.author = P(t), n.persons = [], I(n);
    },
    "Event/Call": function (e) {
      var t = e.content.replace(/\r?\n/g, ""), n = c.getId(e.myself), r = new RegExp("<part identity=\"" + n + "\">.*?<duration>(\\d+)</duration>\\s*?</part>", "g"), i = t.match(r.source), o = /<partlist type="started" alt="">(.*)<\/partlist>/.test(t), u = /<partlist alt="">\s*<\/partlist>/.test(t), f = /<partlist type="ended" alt="">(.*)<\/partlist>/.test(t), l = 0, h = s.activityType.CallMissed, p;
      return o || u ? h = s.activityType.CallStarted : i ? (l = parseInt(i[1], 10), h = s.activityType.CallEnded) : f && e.isMyself && (h = s.activityType.CallEnded), p = new a.CallingActivityItem(), p.duration._set(l), p.isRead._set(!1), p.type._set(h), p.direction._set(e.isMyself ? s.direction.Outgoing : s.direction.Incoming), p;
    }
  };
})
