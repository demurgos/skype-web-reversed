(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/chatService", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "swx-enums",
      "jcafe-property-model",
      "../../lib/utils/chat/generator",
      "jskype-settings-instance",
      "swx-constants",
      "jskype-constants",
      "swx-utils-chat",
      "../../lib/services/systemCommands/main",
      "swx-mri",
      "lodash-compat",
      "../../../swx-jskype-main/lib/utils/chat/smsMessageBuilder"
    ], e);
}(function (e, t) {
  var n = e("swx-jskype-internal-application-instance"), r = e("swx-enums"), i = e("jcafe-property-model"), s = e("../../lib/utils/chat/generator"), o = e("jskype-settings-instance"), u = e("swx-constants"), a = e("jskype-constants"), f = e("swx-utils-chat"), l = e("../../lib/services/systemCommands/main"), c = e("swx-mri"), h = e("lodash-compat"), p = e("../../../swx-jskype-main/lib/utils/chat/smsMessageBuilder"), d = a.PEOPLE.authorizationStates, v = function () {
      function e(e, t) {
        var s = this;
        this.app = n.get();
        this.supportedFormats = i.collection();
        this.systemCommandsService = l.get();
        this._notificationOn = !0;
        this._notificationKeywords = [];
        this.supportedMessageFormats = this.supportedFormats.asReadOnly();
        this.start = i.enabledCommand(this.dummyCommand.bind(this));
        this.accept = i.disabledCommand();
        this.reject = i.disabledCommand();
        this.stop = i.disabledCommand();
        this._editMessage = function (e, t) {
          var n = i.task(), r = e === "", o = r ? null : s.getMyTranslation(t.translations), u = {
              skypeeditedid: t.key(),
              key: t.key(),
              content: e,
              messagetype: "RichText"
            };
          return o && (t._translationsArray.add(o), u.properties = s.prepareTranslationsPropeties(o)), t._skypeemoteoffset && (u.skypeemoteoffset = t._skypeemoteoffset), s.apiHandler.sendMessage(s.conversation, u, t, n.resolve.bind(n), n.reject.bind(n)), n.promise;
        };
        this._setNotificationSettings = function (e, t) {
          s._notificationOn = !e || e.toLowerCase() !== "false";
          s._notificationKeywords = t ? t.split(" ").filter(function (e) {
            var t = e === 0 || e;
            return t;
          }) : [];
          s.conversation._notificationsEnabled._set(s._notificationOn);
        };
        this._updateNotificationSettings = function (e, t) {
          var n = function (e, t) {
            s._setNotificationSettings(e.toString(), t);
          };
          s.apiHandler.setAlerts(s.conversation.conversationId, e, t, n);
        };
        this.shouldNotify = function (e) {
          var t = function (t) {
            var n = new RegExp("(?:\\b)" + h.escapeRegExp(t), "i");
            return n.test(e);
          };
          return s._notificationOn || s._notificationKeywords.some(t);
        };
        this.apiHandler = e;
        this.conversation = t;
        this.supportedFormats([
          r.messageFormat.Text,
          r.messageFormat.Html
        ]);
        this.sendMessage = i.command(this.sendMessageCommand.bind(this), this.conversation.activeModalities.chat);
        this._sendMessageWithoutSanitization = i.command(this.sendMessageWithoutSanitization.bind(this), t.activeModalities.chat);
        this._sendMoji = i.command(this.sendMojiCommand.bind(this), t.activeModalities.chat);
        this._sendSwiftCard = i.command(this.sendSwiftCardCommand.bind(this), t.activeModalities.chat);
        this.sendIsTyping = i.command(this.sendIsTypingCommand.bind(this), t.activeModalities.chat);
      }
      return e.prototype.sendMessageCommand = function (e, t, n) {
        var r = n && n.translation && n.translation.users && n.translation.users.length && n.translation.users[0].value, i = n && n.quotesPresent, s = r ? e : f.messageSanitizer.processOutgoingTextMessage(e, this.conversation);
        if (t === "RichText/Sms") {
          var o = n && n.targets ? n.targets : [];
          s = p.createOutgoingXMLPayload(e, o);
          e = s;
        } else
          i && !h.isUndefined(n.quotedMessageXML) && (e = n.quotedMessageXML + e, s = n.quotedMessageXML + s);
        return this.sendMessageWithoutSanitization(s, t, n, e);
      }, e.prototype.sendMessageWithoutSanitization = function (e, t, n, o) {
        var u = this;
        o || (o = e);
        var a = i.task(), l = n && n.translation && n.translation.users && n.translation.users.length && n.translation.users[0].value, c = n && n.skypeemoteoffset ? n.skypeemoteoffset : null, h = s.outgoingTextMessageActivityItem({
            content: e,
            originalContent: o,
            skypeemoteoffset: c,
            messageType: t
          }, this.conversation), p = this.conversation.participants()[0], d, v = n && n.activityData, m = function () {
            var e = u.conversation.historyService._lastMessageFromServer;
            if (e && e.timestamp() > h.timestamp()) {
              var t = e.timestamp().getTime() + 100;
              h.timestamp._set(new Date(t));
            }
          }, g = function () {
            h.status._set(r.activityStatus.Succeeded);
            a.resolve();
          }, y = function () {
            h.status._set(r.activityStatus.Failed);
            a.reject();
          };
        if (l && !f.messageSanitizer.isMessageWithMentionOnly(e)) {
          var b = h;
          b._translationsArray.add(n.translation);
          d = this.prepareTranslationsPropeties(n.translation);
        } else
          v && (d = this.prepareGiphyPropeties(n.activityData));
        var w = {
          key: h.key(),
          content: e,
          messagetype: t || "RichText",
          properties: d,
          skypeemoteoffset: c
        };
        return m(), this.isInviteFreeMode(p, w) ? (this.conversation.historyService._addOutgoingMessage(h), this.app.personsAndGroupsManager.all.persons.add(p.person, p.person.id(), undefined, r.activityType.ContactRequestIncoming).then(function () {
          u.apiHandler.sendMessage(u.conversation, w, h, g, y);
        }, y)) : this.apiHandler.sendMessage(this.conversation, w, h, g, y) && this.conversation.historyService._addOutgoingMessage(h), a.promise;
      }, e.prototype.prepareTranslationsPropeties = function (e) {
        var t = {
          translations: JSON.stringify({
            key: e.key,
            mri: e.users[0].mri,
            value: f.messageSanitizer.escapeHTML(e.users[0].value)
          })
        };
        return t;
      }, e.prototype.prepareGiphyPropeties = function (e) {
        var t;
        try {
          var n = JSON.parse(e);
          t = { activityData: JSON.stringify({ giphyExpression: f.messageSanitizer.escapeOutgoingHTML(n.giphyExpression) }) };
        } catch (r) {
        }
        return t;
      }, e.prototype.sendMojiCommand = function (e) {
        var t = i.task();
        return this.apiHandler.sendMojiMessage(this.conversation, e, t.resolve.bind(t), t.reject.bind(t)), t.promise;
      }, e.prototype.sendSwiftCardCommand = function (e, t) {
        var n = i.task(), r = s.outgoingTextMessageActivityItem({ content: e }, this.conversation), o = t ? "RichText/Media_Card" : "RichText";
        return this.apiHandler.sendMessage(this.conversation, {
          content: e,
          key: "" + Date.now(),
          messagetype: o
        }, r, n.resolve.bind(n), n.reject.bind(n)), n.promise;
      }, e.prototype.isInviteFreeMode = function (e, t) {
        var n = this, r = o.isFeatureOn(u.COMMON.featureFlags.INVITE_FREE_IMPLICIT_INCOMING_CONTACT_REQUEST), i = function () {
            return e && e.person;
          }, s = function () {
            return n.systemCommandsService.isSkypeCommand(t.content, n.conversation);
          }, a = function () {
            return e.person._authorization() === d.PENDING_INCOMING;
          };
        return r && !this.conversation.isGroupConversation() && i() && a() && !s();
      }, e.prototype.sendIsTypingCommand = function () {
        var e = i.task();
        return this.apiHandler.setIsTyping(this.conversation.conversationId, !0, e.resolve.bind(e), e.reject.bind(e)), e.promise;
      }, e.prototype.dummyCommand = function () {
        return i.task().resolve().promise;
      }, e.prototype.getMyTranslation = function (e) {
        if (!e || !e().length)
          return null;
        var t = this.app.personsAndGroupsManager.mePerson.id(), n = h.filter(e(), function (e) {
            return e.users && e.users[0] && c.getId(e.users[0].mri) === t;
          });
        return n.length ? n[0] : null;
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = v;
}));
