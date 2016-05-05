define("utils/chat/message", [
  "require",
  "swx-enums",
  "constants/activityTypeGroups",
  "constants/common",
  "browser/detect",
  "constants/calling.resources",
  "swx-i18n",
  "utils/chat/dateTime",
  "services/serviceLocator",
  "ui/viewModels/people/properties/displayNameText",
  "ui/viewModels/people/properties/locationText",
  "experience/settings",
  "lodash-compat",
  "ui/modelHelpers/personHelper"
], function (e) {
  var t = e("swx-enums"), n = e("constants/activityTypeGroups"), r = e("constants/common"), i = e("browser/detect"), s = e("constants/calling.resources").fallbackMessages, o = e("swx-i18n").localization, u = e("utils/chat/dateTime"), a = e("services/serviceLocator"), f = e("ui/viewModels/people/properties/displayNameText"), l = e("ui/viewModels/people/properties/locationText"), c = e("experience/settings"), h = e("lodash-compat"), p = e("ui/modelHelpers/personHelper");
  return {
    getMessageFromParticipantActivityItem: function (e, n, i, s, u, f) {
      function m() {
        var e = "";
        return i.forEach(function (t, n) {
          e = n === 0 ? e + t.displayName() : e + ", " + t.displayName();
        }), e;
      }
      function g(e) {
        var t = h.some(e, function (e) {
          return p.isAgent(e.getPerson());
        });
        return t ? "\n" + o.fetch({ key: "message_text_botWasAddedToConversation" }) : "";
      }
      function y() {
        return o.fetch({
          key: "message_text_wasAddedToConversation",
          params: {
            participant: d(),
            contact: m()
          }
        });
      }
      function b(e, t) {
        return a.resolve(r.serviceLocator.FEATURE_FLAGS).isFeatureOn(r.featureFlags.SPACES) ? e() === t() : !1;
      }
      function w(e) {
        var t = [];
        e.participants().forEach(function (e) {
          t.push(e.displayName());
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
      var l = a.resolve(r.serviceLocator.FEATURE_FLAGS), c = l.isFeatureOn(r.featureFlags.SINGLE_CONVERSATION_MODE), d = n.displayName, v = p.isMePerson(n);
      switch (e) {
      case t.activityType.ParticipantJoined:
        if (i.length > 0)
          return y() + g(i);
        if (c && v && f)
          return w(f);
        return o.fetch({
          key: "message_text_joinedConversation",
          params: { participant: d() }
        });
      case t.activityType.ParticipantJoinFailed:
        return o.fetch({
          key: "message_text_joinConversationFailed",
          params: { participant: d() }
        });
      case t.activityType.ParticipantLeft:
        if (b(d, s))
          return o.fetch({
            key: "message_text_guestRemovedBySystem",
            params: { participant: m() }
          });
        if (i.length > 0)
          return o.fetch({
            key: "message_text_wasRemovedFromConversation",
            params: {
              participant: d(),
              removedParticipant: m()
            }
          });
        if (u && u.subcode === "Ejected" && u.message === "You were removed from the meeting.")
          return o.fetch({ key: "message_text_youWereRemovedFromConversation" });
        return o.fetch({
          key: "message_text_hasLeftConversation",
          params: { participant: d() }
        });
      case t.activityType.ParticipantRoleUpdate:
        return o.fetch({
          key: "message_text_roleUpdated",
          params: {
            who: d(),
            whom: i[0] ? i[0].displayName() : d(),
            role: s()
          }
        });
      case t.activityType.ParticipantTopicUpdate:
        return o.fetch({
          key: "message_text_topicUpdated",
          params: {
            participant: d(),
            topic: s()
          }
        });
      case t.activityType.ParticipantPictureUpdate:
        return o.fetch({
          key: "message_text_threadPictureUpdated",
          params: { participant: d() }
        });
      case t.activityType.ParticipantHistoryDisclosed:
        return o.fetch({
          key: s() ? "message_text_historyDisclosed" : "message_text_historyClosed",
          params: { participant: d() }
        });
      case t.activityType.ParticipantJoiningEnabled:
        return o.fetch({
          key: s() ? "message_text_joiningEnabled" : "message_text_joiningDisabled",
          params: { participant: d() }
        });
      case t.activityType.ParticipantLegacyMemberAdded:
        return o.fetch({
          key: "message_text_legacyMemberAdded",
          params: { participant: d() }
        });
      case t.activityType.ParticipantLegacyMemberUpgraded:
        return o.fetch({
          key: "message_text_legacyMemberUpgraded",
          params: { participant: d() }
        });
      }
      return "";
    },
    getMessageFromCallActivityItem: function (e, n) {
      function a() {
        return i ? o.fetch({ key: "message_text_ended" + r }) : o.fetch({ key: "message_text_outgoing" + r + "NoAnswer" });
      }
      var r = n ? "GroupCall" : "Call", i = e.duration() !== 0, s = {
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
          params: { displayName: f.format(n.id(), n.displayName()) }
        });
      case t.activityType.ContactRequestIncomingInviteFree:
        return r = l.format(n.location), r ? o.fetch({
          key: "invite_free_message_received_location",
          params: {
            displayName: f.format(n.id(), n.displayName()),
            location: r
          }
        }) : o.fetch({
          key: "invite_free_message_received",
          params: { displayName: f.format(n.id(), n.displayName()) }
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
        var e = o.fetch({
          key: "message_text_pluginFree_windowsUpdate_line1",
          params: { update_link: s.windowsUpdateLink }
        });
        return e + "\r\n" + o.fetch({ key: "message_text_pluginFree_windowsUpdate_line2" });
      }
      function r() {
        return o.fetch({ key: "message_text_pluginFree_screenSharingFallback_line1" }) + "\r\n" + o.fetch({
          key: "message_text_pluginFree_screenSharingFallback_line2",
          params: { upgrade_link: s.skypeUpgradeLink }
        });
      }
      function u() {
        return o.fetch({ key: i.getBrowserInfo().isEdge ? "message_text_pluginFree_microphoneAccess_edge" : "message_text_pluginFree_microphoneAccess_others" });
      }
      function a() {
        var e = o.fetch({
          key: "message_text_pluginFree_outgoingP2P_line1",
          params: { upgrade_link: s.skypeUpgradeLink }
        });
        return e + "\r\n" + o.fetch({ key: "message_text_pluginFree_outgoingP2P_line2" });
      }
      function f() {
        var e = o.fetch({
          key: "message_text_pluginFree_incomingP2P_line1",
          params: { upgrade_link: s.skypeUpgradeLink }
        });
        return e + "\r\n" + o.fetch({ key: "message_text_pluginFree_incomingP2P_line2" });
      }
      function l() {
        return o.fetch({ key: "message_text_pluginFree_noVideoCapability" });
      }
      switch (e.type()) {
      case t.activityType.PluginFreeFallbackWindowsUpdate:
        return n();
      case t.activityType.PluginFreeFallbackScreenSharing:
        return r();
      case t.activityType.PluginFreeFallbackMicrophoneAccess:
        return u();
      case t.activityType.PluginFreeFallbackOutgoingP2PCall:
        return a();
      case t.activityType.PluginFreeFallbackIncomingP2PCall:
        return f();
      case t.activityType.PluginFreeNoVideoCapability:
        return l();
      }
      return "";
    },
    getMessageFromPstnActivityItem: function (e) {
      function n(e) {
        var t = "<a href=\"{url}\" target=\"_blank\" class=\"{class}\">{text}</a>", n = c.commerce.purchaseCreditUrl, i = c.commerce.purchaseSubscriptionUrl, s, u, a, f, l = r.telemetry.pstn.cssClasses.ADD_CREDIT, h = r.telemetry.pstn.cssClasses.ADD_SUBSCRIPTION;
        return s = o.fetch({ key: "pstn_insufficient_funds_credit" }), u = o.fetch({ key: "pstn_insufficient_funds_subscription" }), a = t.replace("{url}", n).replace("{text}", s).replace("{class}", l), f = t.replace("{url}", i).replace("{text}", u).replace("{class}", h), e.isGroup() ? e.participantName() === e.participantEndpoint() ? o.fetch({
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
      return n.PARTICIPANT_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.PARTICIPANT : n.CALL_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.CALL : n.NGC_UPGRADE_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.NGC_UPGRADE : n.PLUGIN_FREE_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.PLUGIN_FREE : n.MEDIA_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.MEDIA : n.CONTACT_REQUEST_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.CONTACT_REQUEST : n.POLL_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.POLL : n.CONTACT_INFO_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.CONTACT_INFO : n.TRANSACTION_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.TRANSACTION : n.PSTN_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.PSTN : n.CUSTOM_MESSAGES.indexOf(e) !== -1 ? r.activityItemGroups.CUSTOM : r.activityItemGroups.TEXT;
    }
  };
})
