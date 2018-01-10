define("utils/chat/message", [
  "require",
  "swx-enums",
  "constants/activityTypeGroups",
  "swx-constants",
  "swx-browser-detect",
  "constants/calling.resources",
  "swx-i18n",
  "swx-utils-chat",
  "swx-service-locator-instance",
  "swx-utils-chat",
  "ui/viewModels/people/properties/displayNameText",
  "ui/viewModels/people/properties/locationText",
  "experience/settings",
  "lodash-compat",
  "ui/modelHelpers/personHelper"
], function (e) {
  function v(e, t, n) {
    var i, s = "28:" + e, u = n._botsSettings, a = u ? m(s, u) : r.chat.BOT_MESSAGING_MODE.UNDEFINED;
    switch (a) {
    case r.chat.BOT_MESSAGING_MODE.ALL:
      i = "message_text_addedBotGroupConversation_allMessagesMode";
      break;
    case r.chat.BOT_MESSAGING_MODE.AT:
    case r.chat.BOT_MESSAGING_MODE.UNDEFINED:
      i = "message_text_addedBotGroupConversation_privateMode";
    }
    return o.fetch({
      key: i,
      params: { botName: t }
    });
  }
  function m(e, t) {
    return e && t[e] ? t[e].messagingMode : r.chat.BOT_MESSAGING_MODE.UNDEFINED;
  }
  var t = e("swx-enums"), n = e("constants/activityTypeGroups"), r = e("swx-constants").COMMON, i = e("swx-browser-detect").default, s = e("constants/calling.resources").fallbackMessages, o = e("swx-i18n").localization, u = e("swx-utils-chat").dateTime, a = e("swx-service-locator-instance").default, f = e("swx-utils-chat").messageSanitizer, l = e("ui/viewModels/people/properties/displayNameText"), c = e("ui/viewModels/people/properties/locationText"), h = e("experience/settings"), p = e("lodash-compat"), d = e("ui/modelHelpers/personHelper");
  return {
    getMessageFromParticipantActivityItem: function (e, n, i, s, u, l) {
      function b() {
        var e = "";
        return i.forEach(function (t, n) {
          e = n === 0 ? e + t.displayName() : e + ", " + t.displayName();
        }), e;
      }
      function w(e) {
        var t = "", n = p.some(e, function (e) {
            return d.isAgent(e.getPerson());
          });
        return n ? (e.forEach(function (e) {
          var n = e.getPerson(), r = p.escape(n.displayName());
          if (!d.isAgent(n))
            return;
          m ? t += "\n" + v(n.id(), r, l) : t += "\n" + o.fetch({
            key: "message_text_botWasAddedToConversation",
            params: { botName: r }
          });
        }), t) : "";
      }
      function E() {
        return o.fetch({
          key: "message_text_wasAddedToConversation",
          params: {
            participant: g(),
            contact: b()
          }
        });
      }
      function S(e, t) {
        return a.resolve(r.serviceLocator.FEATURE_FLAGS).isFeatureOn(r.featureFlags.SPACES) ? e() === t() : !1;
      }
      function x(e) {
        var t = [];
        e.participants().forEach(function (e) {
          t.push(e.person.displayName());
        });
        if (t.length === 0)
          return;
        if (t.length === 1)
          return o.fetch({
            key: "message_text_meJoinedConversation_one",
            params: { participant: t[0] }
          });
        var n = t.pop();
        return o.fetch({
          key: "message_text_meJoinedConversation_more",
          params: {
            participants: t.join(", "),
            participant: n
          }
        });
      }
      var c = a.resolve(r.serviceLocator.FEATURE_FLAGS), h = c.isFeatureOn(r.featureFlags.SINGLE_CONVERSATION_MODE), m = c.isFeatureOn(r.featureFlags.BOT_MESSAGES_MODE_V2_ENABLED), g = n.displayName, y = d.isMePerson(n);
      switch (e) {
      case t.activityType.ParticipantJoined:
        if (i.length > 0)
          return E() + w(i);
        if (h && y && l)
          return x(l);
        return o.fetch({
          key: "message_text_joinedConversation",
          params: { participant: g() }
        });
      case t.activityType.ParticipantJoinFailed:
        return o.fetch({
          key: "message_text_joinConversationFailed",
          params: { participant: g() }
        });
      case t.activityType.ParticipantLeft:
        if (S(g, s))
          return o.fetch({
            key: "message_text_guestRemovedBySystem",
            params: { participant: b() }
          });
        if (i.length > 0)
          return o.fetch({
            key: "message_text_wasRemovedFromConversation",
            params: {
              participant: g(),
              removedParticipant: b()
            }
          });
        if (u && u.subcode === "Ejected" && u.message === "You were removed from the meeting.")
          return o.fetch({ key: "message_text_youWereRemovedFromConversation" });
        return o.fetch({
          key: "message_text_hasLeftConversation",
          params: { participant: g() }
        });
      case t.activityType.ParticipantRoleUpdate:
        return o.fetch({
          key: "message_text_roleUpdated",
          params: {
            who: g(),
            whom: i[0] ? i[0].displayName() : g(),
            role: s()
          }
        });
      case t.activityType.ParticipantTopicUpdate:
        var T = s ? f.escapeHTML(s()) : "";
        return o.fetch({
          key: "message_text_topicUpdated",
          params: {
            participant: g(),
            topic: T
          }
        });
      case t.activityType.ParticipantPictureUpdate:
        return o.fetch({
          key: "message_text_threadPictureUpdated",
          params: { participant: g() }
        });
      case t.activityType.ParticipantHistoryDisclosed:
        return o.fetch({
          key: s() ? "message_text_historyDisclosed" : "message_text_historyClosed",
          params: { participant: g() }
        });
      case t.activityType.ParticipantJoiningEnabled:
        return o.fetch({
          key: s() ? "message_text_joiningEnabled" : "message_text_joiningDisabled",
          params: { participant: g() }
        });
      case t.activityType.ParticipantLegacyMemberAdded:
        return o.fetch({
          key: "message_text_legacyMemberAdded",
          params: { participant: g() }
        });
      case t.activityType.ParticipantLegacyMemberUpgraded:
        return o.fetch({
          key: "message_text_legacyMemberUpgraded",
          params: { participant: g() }
        });
      }
      return "";
    },
    getMessageFromCallActivityItem: function (e, n) {
      function a() {
        return i ? o.fetch({ key: "message_text_ended" + r }) : o.fetch({ key: "message_text_outgoing" + r + "NoAnswer" });
      }
      var r = n ? "GroupCall" : "Call", i = !!e.duration(), s = {
          callAction: "",
          duration: i ? u.formatCallDuration(e.duration()) : "",
          text: ""
        };
      switch (e.type()) {
      case t.activityType.CallStarted:
        s.callAction = "callStart", s.text = o.fetch({ key: "message_text_started" + r });
        break;
      case t.activityType.CallEnded:
        s.callAction = "callEnd", s.text = a();
        break;
      case t.activityType.CallMissed:
        s.callAction = "callMissed", s.text = o.fetch({ key: "message_text_missed" + r });
      }
      return s;
    },
    getMessageFromContactRequestActivityItem: function (e, n) {
      var r;
      switch (e) {
      case t.activityType.ContactRequestIncoming:
        return o.fetch({
          key: "message_text_addingContactRequest",
          params: { id: n.id() }
        });
      case t.activityType.ContactRequestIsNowContact:
        return o.fetch({
          key: "message_text_contactRequestIsNowContact",
          params: { displayName: l.format(n.id(), n.displayName()) }
        });
      case t.activityType.ContactRequestIncomingInviteFree:
        return r = c.format(n.location), r ? o.fetch({
          key: "invite_free_message_received_location",
          params: {
            displayName: l.format(n.id(), n.displayName()),
            location: r
          }
        }) : o.fetch({
          key: "invite_free_message_received",
          params: { displayName: l.format(n.id(), n.displayName()) }
        });
      }
      return "";
    },
    getMessageFromNgcUpgradeActivityItem: function (e) {
      var t = e.participantNames();
      return t.length === 1 ? o.fetch({
        key: "message_text_ngcUpgradeMessage_one",
        params: {
          participant: t[0],
          link: s.ngcUpgradeLink
        }
      }) : t.length > 1 ? o.fetch({
        key: "message_text_ngcUpgradeMessage_many",
        params: {
          participantList: t.slice(0, t.length - 1).join(", "),
          lastParticipant: t[t.length - 1],
          link: s.ngcUpgradeLink
        }
      }) : "";
    },
    getMessageFromPluginFreeActivityItem: function (e) {
      function n() {
        var e = o.fetch({ key: "message_text_pluginFree_screenSharingFallback_line1" }), t = o.fetch({
            key: "message_text_pluginFree_screenSharingFallback_line2",
            params: { upgrade_link: s.skypeUpgradeLink }
          });
        return e + "\r\n" + t;
      }
      function r() {
        return o.fetch({ key: i.getBrowserInfo().isEdge ? "message_text_pluginFree_microphoneAccess_edge" : "message_text_pluginFree_microphoneAccess_others" });
      }
      function u() {
        return o.fetch({ key: "message_text_pluginFree_noVideoCapability" });
      }
      function a() {
        return u();
      }
      switch (e.type()) {
      case t.activityType.PluginFreeFallbackScreenSharing:
        return n();
      case t.activityType.PluginFreeFallbackMicrophoneAccess:
        return r();
      case t.activityType.PluginFreeNoVideoCapability:
        return u();
      case t.activityType.PluginFreeVideoCompatibility:
        return a();
      }
      return "";
    },
    getMessageFromPstnActivityItem: function (e) {
      function n(e) {
        var t = "<a href=\"{url}\" target=\"_blank\" class=\"{class}\">{text}</a>", n = h.commerce.purchaseCreditUrl, i = h.commerce.purchaseSubscriptionUrl, s, u, a, f, l = r.telemetry.pstn.cssClasses.ADD_CREDIT, c = r.telemetry.pstn.cssClasses.ADD_SUBSCRIPTION;
        return s = o.fetch({ key: "pstn_insufficient_funds_credit" }), u = o.fetch({ key: "pstn_insufficient_funds_subscription" }), a = t.replace("{url}", n).replace("{text}", s).replace("{class}", l), f = t.replace("{url}", i).replace("{text}", u).replace("{class}", c), e.isGroup() ? e.participantName() === e.participantEndpoint() ? o.fetch({
          key: "pstn_insufficient_funds_group",
          params: {
            phoneNumber: e.participantEndpoint(),
            credit: a,
            subscription: f
          }
        }) : o.fetch({
          key: "pstn_insufficient_funds_group_name",
          params: {
            displayName: e.participantName(),
            phoneNumber: e.participantEndpoint(),
            credit: a,
            subscription: f
          }
        }) : o.fetch({
          key: "pstn_insufficient_funds",
          params: {
            credit: a,
            subscription: f
          }
        });
      }
      function i(e) {
        return e.isGroup() ? e.participantName() === e.participantEndpoint() ? o.fetch({
          key: "pstn_invalid_number_group",
          params: { phoneNumber: e.participantEndpoint() }
        }) : o.fetch({
          key: "pstn_invalid_number_group_name",
          params: {
            displayName: e.participantName(),
            phoneNumber: e.participantEndpoint()
          }
        }) : o.fetch({ key: "pstn_invalid_number" });
      }
      function s(e) {
        return e.isGroup() ? e.participantName() === e.participantEndpoint() ? o.fetch({
          key: "pstn_forbidden_number_group",
          params: { phoneNumber: e.participantEndpoint() }
        }) : o.fetch({
          key: "pstn_forbidden_number_group_name",
          params: {
            displayName: e.participantName(),
            phoneNumber: e.participantEndpoint()
          }
        }) : o.fetch({ key: "pstn_forbidden_number" });
      }
      switch (e.type()) {
      case t.activityType.PstnInsufficientFunds:
        return n(e);
      case t.activityType.PstnInvalidNumber:
        return i(e);
      case t.activityType.PstnForbiddenNumber:
        return s(e);
      }
      return "";
    },
    getActivityItemGroup: function (e) {
      return n.PARTICIPANT_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.PARTICIPANT : n.CALL_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.CALL : n.NGC_UPGRADE_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.NGC_UPGRADE : n.PLUGIN_FREE_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.PLUGIN_FREE : n.MEDIA_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.MEDIA : n.CONTACT_REQUEST_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.CONTACT_REQUEST : n.POLL_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.POLL : n.CONTACT_INFO_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.CONTACT_INFO : n.TRANSACTION_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.TRANSACTION : n.PSTN_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.PSTN : n.CUSTOM_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.CUSTOM : n.TRANSCRIPT_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.TRANSCRIPT : n.SYSTEM_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.SYSTEM : r.activityItemGroups.TEXT;
    },
    getBotDisclosureMessage: v
  };
});
