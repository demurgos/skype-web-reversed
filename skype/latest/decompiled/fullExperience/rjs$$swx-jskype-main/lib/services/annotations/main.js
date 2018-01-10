(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/annotations/main", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../../../lib/services/serviceAccessLayer/decorations/reporting",
      "../../../lib/modelHelpers/personsAndGroupsHelper",
      "../../../lib/services/webapi/main",
      "../../../lib/telemetry/messageSent",
      "swx-xhr-dispatcher",
      "jskype-settings-instance",
      "swx-chat-service/lib/constants",
      "swx-utils-chat",
      "swx-mri",
      "jcafe-property-model",
      "swx-constants",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function g(e, t) {
    var r = e(t.key), s = n.get().personsAndGroupsManager.mePerson;
    r || (r = {
      key: t.key,
      users: t.users || []
    });
    var o = d.some(r.users, function (e) {
      return i.isMePerson(e.mri);
    });
    o || (e.empty(), r.users.push({
      mri: s.id(),
      person: s,
      time: new Date().getTime(),
      value: t.value
    }), e.add(r, r.key));
  }
  function y(e, t) {
    var n = e(t.key);
    if (!n)
      return;
    e.empty();
    d.remove(n.users, function (e) {
      return i.isMePerson(e.mri);
    });
    e.add(n, n.key);
  }
  function b(e, t, n) {
    if (n !== v.EMOTIONS)
      return undefined;
    var r = o.build(t, e);
    return r.heartEvent(), r;
  }
  function w(e, t, n, r, i) {
    function u(e) {
      y(n, i);
      s.reject(e);
      if (o) {
        var t = e ? e.status : m;
        o.publish(t);
      }
    }
    function a(e) {
      s.resolve();
      if (o) {
        var t = e ? e.response.status : m;
        o.publish(t);
      }
    }
    var s = h.task(), o = b(e, t, r);
    return g(n, i), S().setMessageProperty(t.conversationId, e, r, i, a, u), s.promise;
  }
  function E(e, t, n, r, i) {
    function u(e) {
      g(n, i);
      s.reject(e);
      if (o) {
        var t = e ? e.status : m;
        o.publish(t);
      }
    }
    function a(e) {
      s.resolve();
      if (o) {
        var t = e ? e.response.status : m;
        o.publish(t);
      }
    }
    var s = h.task(), o = b(e, t, r);
    return y(n, i), S().removeMessageProperty(t.conversationId, e, r, i.key, a, u), s.promise;
  }
  function S() {
    var e = u.build({
      host: a.settings.webApiServiceHost,
      decorations: [r]
    });
    return s.getInstance(e);
  }
  function x(e, t, n) {
    var r = "_" + t + "Array";
    return e[r] ? e[r](n) : null;
  }
  function T(e) {
    var t = JSON.parse(e);
    for (var n in t)
      t.hasOwnProperty(n) && (t[n] = l.messageSanitizer.unescapeHTML(l.messageSanitizer.getMessageSanitizedContent(t[n])));
    return t;
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../../../lib/services/serviceAccessLayer/decorations/reporting"), i = e("../../../lib/modelHelpers/personsAndGroupsHelper"), s = e("../../../lib/services/webapi/main"), o = e("../../../lib/telemetry/messageSent"), u = e("swx-xhr-dispatcher"), a = e("jskype-settings-instance"), f = e("swx-chat-service/lib/constants"), l = e("swx-utils-chat"), c = e("swx-mri"), h = e("jcafe-property-model"), p = e("swx-constants"), d = e("lodash-compat"), v = f.MESSAGE_PROPERTIES.PER_USER, m = p.COMMON.telemetry.NOT_AVAILABLE, N = function () {
      function e() {
        this.parseMessageProperties = function (e, t) {
          if (!t.properties)
            return;
          var r = n.get().personsAndGroupsManager.mePerson;
          d.forEach(e._supportedAnnotations, function (n) {
            var s = t.properties[n], o = e["_" + n + "Array"];
            if (s && n === v.ACTIVITY_DATA) {
              e._activityData._set(T(s));
              return;
            }
            d.forEach(s, function (e) {
              var t = o(e.key);
              t || (t = {
                key: e.key,
                users: []
              }, o.add(t, e.key));
              e.users.forEach(function (e) {
                var n = c.getId(e.mri);
                i.isMePerson(n) ? e.person = r : (e.person = i.getPersonById(n), e.person || (e.person = i.createDefaultPerson(n)));
                e.value && (e.value = l.messageSanitizer.getMessageSanitizedContent(l.messageSanitizer.unescapeHTML(e.value)));
                var s = d.some(t.users, function (e, t) {
                  return t.mri === e.mri;
                });
                s || t.users.push(e);
              });
            });
          });
        };
        this.updateMessageProperties = function (e, t) {
          d.forEach(e._supportedAnnotations, function (n) {
            if (n === v.ACTIVITY_DATA && e["_" + n]) {
              e._activityData._set(t._activityData());
              return;
            }
            var r = "_" + n + "Array";
            if (!e[r])
              return;
            e[r].empty();
            t[r] && d.forEach(t[r](), function (t) {
              e[r].add(t, t.key);
            });
          });
        };
        this.decorateEmotions = function (e, t) {
          if (e.emotions)
            return;
          e._supportedAnnotations.push(v.EMOTIONS);
          e._emotionsArray = h.collection();
          e.emotions = e._emotionsArray.asWritable({
            add: h.command(w.bind(null, e, t, e._emotionsArray, v.EMOTIONS), h.boolProperty(!0)),
            remove: h.command(E.bind(null, e, t, e._emotionsArray, v.EMOTIONS), h.boolProperty(!0))
          });
        };
        this.decorateSms = function (e, t, n) {
          if (n !== "RichText/Sms")
            return;
          if (e.smsdeliveryreports)
            return;
          e._supportedAnnotations.push(v.SMS_REPORT);
          e._smsdeliveryreportsArray = h.collection();
          e.smsdeliveryreports = e._smsdeliveryreportsArray.asWritable({
            add: h.command(w.bind(null, e, t, e._smsdeliveryreportsArray, v.SMS_REPORT), h.boolProperty(!0)),
            remove: h.command(E.bind(null, e, t, e._smsdeliveryreportsArray, v.SMS_REPORT), h.boolProperty(!0))
          });
        };
        this.decorateTranslations = function (e, t) {
          if (t.isGroupConversation())
            return;
          if (e.translations)
            return;
          e._supportedAnnotations.push(v.TRANSLATIONS);
          e._translationsArray = h.collection();
          e.translations = e._translationsArray.asWritable({
            add: h.command(w.bind(null, e, t, e._translationsArray, v.TRANSLATIONS), h.boolProperty(!0)),
            remove: h.command(E.bind(null, e, t, e._translationsArray, v.TRANSLATIONS), h.boolProperty(!0))
          });
        };
        this.decorateActivityData = function (e) {
          if (e._activityData)
            return;
          e._supportedAnnotations.push(v.ACTIVITY_DATA);
          e._activityData = h.property({ readOnly: !0 });
        };
        this.decoratePoll = function (e, t) {
          if (!t.isGroupConversation())
            return;
          if (e.poll)
            return;
          e._supportedAnnotations.push(v.POLL);
          e._pollArray = h.collection();
          e.poll = e._pollArray.asWritable({
            add: h.command(w.bind(null, e, t, e._pollArray, v.POLL), h.boolProperty(!0)),
            remove: h.command(E.bind(null, e, t, e._pollArray, v.POLL), h.boolProperty(!0))
          });
        };
        this.isMessagePropertyUnseen = function (e, t, n, r) {
          var s = !1;
          if (e.sender && !i.isMePerson(e.sender.id()))
            return s;
          var o = x(e, t, n);
          return o ? (d.forEach(o.users, function (e) {
            e.time > r && !i.isMePerson(e.mri) && (s = !0);
          }), s) : s;
        };
        this.getMessagePropertyLastTimestamp = function (e, t, n) {
          var r = x(e, t, n);
          return r ? (r.users.sort(function (e, t) {
            return e.time - t.time;
          }), r.users[r.users.length - 1].time) : null;
        };
        this.getLastPersonFromProperty = function (e, t, n) {
          var r = x(e, t, n);
          return r ? (r.users.sort(function (e, t) {
            return e.time - t.time;
          }), r.users[r.users.length - 1].person) : null;
        };
      }
      return e;
    }(), C = new N();
  t.__esModule = !0;
  t["default"] = C;
}));
