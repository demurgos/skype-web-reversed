define("jSkype/models/chatService", [
  "require",
  "jSkype/client",
  "swx-enums",
  "jcafe-property-model",
  "jSkype/utils/chat/generator",
  "jSkype/settings",
  "constants/common",
  "jSkype/constants/people",
  "utils/chat/messageSanitizer",
  "jSkype/services/systemCommands/main",
  "jSkype/modelHelpers/personHelper",
  "lodash-compat"
], function (e) {
  function h(e, h) {
    function g(t, s, o) {
      function b() {
        var e = h.historyService._lastMessageFromServer, t;
        e && e.timestamp() > p.timestamp() && (t = e.timestamp().getTime() + 100, p.timestamp._set(new Date(t)));
      }
      function w() {
        p.status._set(n.activityStatus.Succeeded), u.resolve();
      }
      function S() {
        p.status._set(n.activityStatus.Failed), u.reject();
      }
      var u = r.task(), f = o && o.translation && o.translation.users && o.translation.users.length && o.translation.users[0].value, l = f ? t : a.processOutgoingTextMessage(t), c = i.processMentions(l), p = i.outgoingTextMessageActivityItem({
          content: c,
          originalContent: t
        }, h), v = h.participants()[0], m, g;
      return f && !a.isMessageWithMentionOnly(c) && (o.translation.users[0].value = i.processMentions(o.translation.users[0].value), p._translationsArray.add(o.translation), m = y(o.translation)), g = {
        key: p.key(),
        content: c,
        messagetype: s || "RichText",
        properties: m
      }, b(), E(v, g) ? (h.historyService._addOutgoingMessage(p), d.personsAndGroupsManager.all.persons.add(v.person, v.person.id(), undefined, n.activityType.ContactRequestIncoming).then(function () {
        e.sendMessage(h, g, p, w, S);
      }, S)) : e.sendMessage(h, g, p, w, S) && h.historyService._addOutgoingMessage(p), u.promise;
    }
    function y(e) {
      var t = {
        translations: JSON.stringify({
          key: e.key,
          mri: e.users[0].mri,
          value: a.escapeHTML(e.users[0].value)
        })
      };
      return t;
    }
    function b(t) {
      var n = r.task();
      return e.sendMojiMessage(h, t, n.resolve.bind(n), n.reject.bind(n)), n.promise;
    }
    function w(t) {
      var n = r.task(), s = i.outgoingTextMessageActivityItem({ content: t }, h);
      return e.sendMessage(h, {
        content: t,
        key: "" + Date.now(),
        messagetype: "RichText"
      }, s, n.resolve.bind(n), n.reject.bind(n)), n.promise;
    }
    function E(e, t) {
      function r() {
        return e && e.person;
      }
      function i() {
        return m.isSkypeCommand(t.content, h);
      }
      function a() {
        return e.person._authorization() === u.PENDING_INCOMING;
      }
      var n = s.isFeatureOn(o.featureFlags.INVITE_FREE_IMPLICIT_INCOMING_CONTACT_REQUEST);
      return n && !h.isGroupConversation() && r() && a() && !i();
    }
    function S() {
      var t = r.task();
      return e.setIsTyping(h.conversationId, !0, t.resolve.bind(t), t.reject.bind(t)), t.promise;
    }
    function x() {
      return r.task().resolve().promise;
    }
    function T(e) {
      if (!e || !e().length)
        return null;
      var t = d.personsAndGroupsManager.mePerson.id(), n = c.filter(e(), function (e) {
          return e.users && e.users[0] && l.getId(e.users[0].mri) === t;
        });
      return n.length ? n[0] : null;
    }
    var p = this, d = t.get(), v = r.collection(), m = f.get();
    v([
      n.messageFormat.Text,
      n.messageFormat.Html
    ]), this._editMessage = function (t, n) {
      var s = r.task(), o = t === "", u = o ? null : T(n.translations), f = u ? t : a.processOutgoingTextMessage(t), l = {
          skypeeditedid: n.key(),
          key: n.key(),
          content: i.processMentions(f),
          messagetype: "RichText"
        };
      return u && (u.users[0].value = i.processMentions(u.users[0].value), n._translationsArray.add(u), l.properties = y(u)), e.sendMessage(h, l, n, s.resolve.bind(s), s.reject.bind(s)), s.promise;
    }, this._notificationOn = !0, this._notificationKeywords = [], this._setNotificationSettings = function (e, t) {
      p._notificationOn = !e || e.toLowerCase() !== "false", this._notificationKeywords = t ? t.split(" ").filter(function (e) {
        return e === 0 || e;
      }) : [], h._notificationsEnabled._set(p._notificationOn);
    }, this._updateNotificationSettings = function (t, n) {
      function r(e, t) {
        p._setNotificationSettings(e.toString(), t);
      }
      e.setAlerts(h.conversationId, t, n, r);
    }, this.shouldNotify = function (t) {
      function n(e) {
        var n = new RegExp("(?:\\s+|^)" + c.escapeRegExp(e), "i");
        return n.test(t);
      }
      return p._notificationOn || p._notificationKeywords.some(n);
    }, this.supportedMessageFormats = v.asReadOnly(), this.sendMessage = r.command(g, h.activeModalities.chat), this._sendMoji = r.command(b, h.activeModalities.chat), this._sendSwiftCard = r.command(w, h.activeModalities.chat), this.sendIsTyping = r.command(S, h.activeModalities.chat), this.start = r.enabledCommand(x), this.accept = r.disabledCommand(), this.reject = r.disabledCommand(), this.stop = r.disabledCommand();
  }
  var t = e("jSkype/client"), n = e("swx-enums"), r = e("jcafe-property-model"), i = e("jSkype/utils/chat/generator"), s = e("jSkype/settings"), o = e("constants/common"), u = e("jSkype/constants/people").authorizationStates, a = e("utils/chat/messageSanitizer"), f = e("jSkype/services/systemCommands/main"), l = e("jSkype/modelHelpers/personHelper"), c = e("lodash-compat");
  return h;
})
