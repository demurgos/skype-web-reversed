define("jSkype/services/annotations/main", [
  "require",
  "lodash-compat",
  "jSkype/client",
  "jSkype/services/serviceAccessLayer/serviceLocator",
  "jSkype/settings",
  "jSkype/services/webapi/constants",
  "utils/chat/messageSanitizer",
  "jSkype/modelHelpers/personHelper",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jcafe-property-model",
  "jSkype/services/webapi/main",
  "telemetry/chat/messageSent",
  "constants/common"
], function (e) {
  function v() {
    function e(e, r) {
      var i = e(r.key), s = n.get().personsAndGroupsManager.mePerson, o;
      i || (i = {
        key: r.key,
        users: r.users || []
      }), o = t.some(i.users, function (e) {
        return a.isMePerson(e.mri);
      }), o || (e.empty(), i.users.push({
        mri: s.id(),
        person: s,
        time: new Date().getTime(),
        value: r.value
      }), e.add(i, i.key));
    }
    function s(e, n) {
      var r = e(n.key);
      if (!r)
        return;
      e.empty(), t.remove(r.users, function (e) {
        return a.isMePerson(e.mri);
      }), e.add(r, r.key);
    }
    function h(e, t, n) {
      if (n !== p.EMOTIONS)
        return;
      var r = c.build(t, e);
      return r.heartEvent(), r;
    }
    function v(t, n, r, i, o) {
      function l(e) {
        s(r, o), u.reject(e);
        if (a) {
          var t = e ? e.status : d;
          a.publish(t);
        }
      }
      function c(e) {
        u.resolve();
        if (a) {
          var t = e ? e.response.status : d;
          a.publish(t);
        }
      }
      var u = f.task(), a = h(t, n, i);
      return e(r, o), g().setMessageProperty(n.conversationId, t, i, o, c, l), u.promise;
    }
    function m(t, n, r, i, o) {
      function l(t) {
        e(r, o), u.reject(t);
        if (a) {
          var n = t ? t.status : d;
          a.publish(n);
        }
      }
      function c(e) {
        u.resolve();
        if (a) {
          var t = e ? e.response.status : d;
          a.publish(t);
        }
      }
      var u = f.task(), a = h(t, n, i);
      return s(r, o), g().removeMessageProperty(n.conversationId, t, i, o.key, c, l), u.promise;
    }
    function g() {
      var e = r.build(i.settings.webApiServiceHost);
      return l.getInstance(e);
    }
    function y(e, t, n) {
      var r = "_" + t + "Array";
      return e[r] ? e[r](n) : null;
    }
    this.parseMessageProperties = function (e, r) {
      if (!r.properties)
        return;
      var i = n.get().personsAndGroupsManager.mePerson;
      t.forEach(e._supportedAnnotations, function (n) {
        var s = r.properties[n], f = e["_" + n + "Array"];
        t.forEach(s, function (e) {
          var n = f(e.key);
          n || (n = {
            key: e.key,
            users: []
          }, f.add(n, e.key)), e.users.forEach(function (e) {
            var r = u.getId(e.mri);
            a.isMePerson(r) ? e.person = i : (e.person = a.getPersonById(r), e.person || (e.person = a.createDefaultPerson(r))), e.value && (e.value = o.getMessageSanitizedContent(o.unescapeHTML(e.value)));
            var s = t.some(n.users, function (e, t) {
              return t.mri === e.mri;
            });
            s || n.users.push(e);
          });
        });
      });
    }, this.updateMessageProperties = function (e, n) {
      var r;
      t.forEach(e._supportedAnnotations, function (i) {
        r = "_" + i + "Array";
        if (!e[r])
          return;
        e[r].empty(), n[r] && t.forEach(n[r](), function (t) {
          e[r].add(t, t.key);
        });
      });
    }, this.decorateEmotions = function (e, t) {
      if (e.emotions)
        return;
      e._supportedAnnotations.push(p.EMOTIONS), e._emotionsArray = f.collection(), e.emotions = e._emotionsArray.asWritable({
        add: f.command(v.bind(null, e, t, e._emotionsArray, p.EMOTIONS), f.boolProperty(!0)),
        remove: f.command(m.bind(null, e, t, e._emotionsArray, p.EMOTIONS), f.boolProperty(!0))
      });
    }, this.decorateTranslations = function (e, t) {
      if (t.isGroupConversation())
        return;
      if (e.translations)
        return;
      e._supportedAnnotations.push(p.TRANSLATIONS), e._translationsArray = f.collection(), e.translations = e._translationsArray.asWritable({
        add: f.command(v.bind(null, e, t, e._translationsArray, p.TRANSLATIONS), f.boolProperty(!0)),
        remove: f.command(m.bind(null, e, t, e._translationsArray, p.TRANSLATIONS), f.boolProperty(!0))
      });
    }, this.decoratePoll = function (e, t) {
      if (!t.isGroupConversation())
        return;
      if (e.poll)
        return;
      e._supportedAnnotations.push(p.POLL), e._pollArray = f.collection(), e.poll = e._pollArray.asWritable({
        add: f.command(v.bind(null, e, t, e._pollArray, p.POLL), f.boolProperty(!0)),
        remove: f.command(m.bind(null, e, t, e._pollArray, p.POLL), f.boolProperty(!0))
      });
    }, this.isMessagePropertyUnseen = function (e, n, r, i) {
      var s, o = !1;
      return e.sender && !a.isMePerson(e.sender.id()) ? o : (s = y(e, n, r), s ? (t.forEach(s.users, function (e) {
        e.time > i && !a.isMePerson(e.mri) && (o = !0);
      }), o) : o);
    }, this.getMessagePropertyLastTimestamp = function (e, t, n) {
      var r = y(e, t, n);
      return r ? (r.users.sort(function (e, t) {
        return e.time - t.time;
      }), r.users[r.users.length - 1].time) : null;
    }, this.getLastPersonFromProperty = function (e, t, n) {
      var r = y(e, t, n);
      return r ? (r.users.sort(function (e, t) {
        return e.time - t.time;
      }), r.users[r.users.length - 1].person) : null;
    };
  }
  var t = e("lodash-compat"), n = e("jSkype/client"), r = e("jSkype/services/serviceAccessLayer/serviceLocator"), i = e("jSkype/settings"), s = e("jSkype/services/webapi/constants"), o = e("utils/chat/messageSanitizer"), u = e("jSkype/modelHelpers/personHelper"), a = e("jSkype/modelHelpers/personsAndGroupsHelper"), f = e("jcafe-property-model"), l = e("jSkype/services/webapi/main"), c = e("telemetry/chat/messageSent"), h = e("constants/common"), p = s.MESSAGE_PROPERTIES.PER_USER, d = h.telemetry.NOT_AVAILABLE;
  return new v();
})
