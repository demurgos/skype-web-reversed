define("utils/chat/translatorHelper", [
  "require",
  "exports",
  "module",
  "cafe/applicationInstance",
  "constants/common",
  "utils/chat/messageSanitizer",
  "ui/modelHelpers/personHelper",
  "telemetry/translator/translatorTelemetry",
  "lodash-compat"
], function (e, t) {
  function f(e) {
    var t = e && e().length, n;
    return t ? (n = a.filter(e(), function (e) {
      return e.users && e.users[0] && s.isMePersonId(e.users[0].mri);
    }), n.length ? n[0] : null) : null;
  }
  var n = e("cafe/applicationInstance"), r = e("constants/common"), i = e("utils/chat/messageSanitizer"), s = e("ui/modelHelpers/personHelper"), o = r.telemetry.translator, u = e("telemetry/translator/translatorTelemetry"), a = e("lodash-compat");
  t.extractLanguageKey = function (e) {
    if (!e)
      return;
    var t = /original./, n = t.test(e), r = e.replace(t, "");
    return n ? r.substring(0, r.lastIndexOf(".")) : e;
  };
  t.isMatchingMyLanguage = function (e, n) {
    var r = n && n.isEnabled && n.meLanguage ? n.meLanguage.code : null, i = t.extractLanguageKey(e);
    return i === r;
  };
  t.findMatchingTranslation = function (e, n) {
    var r = e && e().length, i, s;
    return r ? (a.some(e(), function (e) {
      return t.isMatchingMyLanguage(e.key, n) && e.users && e.users[0] && e.users[0].value ? (i = e.users[0].value, !0) : !1;
    }), i || (s = f(e), i = s ? s.users[0].value : i), i) : i;
  };
  t.requestTranslation = function (e, t, s, a) {
    function b(e) {
      typeof a == "function" && a(e);
    }
    function w(e) {
      var t = e && e.statusText || "Translator service failed";
      h.send(d, {
        action: o.action.TRANSLATE,
        error: t,
        language: g
      });
      b({ message: v });
    }
    function E(t) {
      var n = i.removeNoTranslateTags(t), r = p ? y : g, s = p ? i.processOutgoingTextMessage(v) : n, u = p ? n : v, a = {
          message: u,
          translation: {
            key: r,
            users: [{
                value: s,
                mri: c
              }]
          }
        };
      h.send(d, {
        action: o.action.TRANSLATE,
        success: !0,
        language: g
      });
      if (e === n) {
        b({ message: v });
        return;
      }
      b(a);
    }
    var f = n.get(), l = f.translatorService, c = f.personsAndGroupsManager.mePerson.id(), h = u.build(), p = t === r.chat.messageType.OUTGOING, d = p ? o.eventType.OUTGOING : o.eventType.INCOMING, v = e, m = p ? i.processOutgoingTextMessageForTranslation(e) : i.processIncomingSanitizedTextMessageForTranslation(e), g, y;
    p ? (y = s._translatorSettings.meLanguage.code, g = s._translatorSettings.participantLanguage.code) : g = s._translatorSettings.meLanguage.code;
    l.translateMessage(y, g, m).then(E, w);
  };
});
