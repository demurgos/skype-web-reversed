define("ui/viewModels/chat/messageParsers/swift/utils", [
  "require",
  "lodash-compat",
  "swx-constants",
  "swx-cafe-application-instance",
  "swx-encoder/lib/encoders/emoticonEncoder",
  "swx-encoder",
  "swx-utils-chat",
  "swx-service-locator-instance",
  "experience/settings"
], function (e) {
  function h(e, n) {
    var r = v(e, n);
    return r = t.filter(r, function (e) {
      return !e.isValid || e.isValid();
    }), r;
  }
  function p(e, n) {
    var r = v(e, n);
    return r = t.filter(r, function (e) {
      return !e.isDisabled || !e.isDisabled();
    }), r;
  }
  function d(e) {
    return !e.isDisabled || !e.isDisabled() ? e : null;
  }
  function v(e, n) {
    var r = t.isArray(e) ? t.compact(e.map(n)) : [];
    return r;
  }
  function m(e) {
    return e ? o.getMessageSanitizedContent(e) : null;
  }
  function g(e, t) {
    function i(e) {
      var t;
      for (var n = 0; n < r.length; n++) {
        t = new RegExp("^" + r[n] + ":", "i");
        if (t.test(e))
          return c;
      }
      return e;
    }
    function s(e) {
      var t = [
        "https:",
        "http:"
      ];
      try {
        var n = document.createElement("a");
        return n.href = e, t.indexOf(n.protocol) > -1 ? e : c;
      } catch (r) {
        return c;
      }
    }
    function u(e) {
      var t = new RegExp(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
      return e.match(t) ? e : c;
    }
    function f(e) {
      if (e === c)
        return c;
      var t = new RegExp(/^[\s\S]*javascript:/igm);
      return e.match(t) ? c : e;
    }
    var n = e ? o.getMessageSanitizedContent(e) : c, r = a.swift.urlPrefixBlacklist;
    switch (t) {
    case "openUrl":
    case "payment":
    case "showImage":
      n = s(n), n = u(n), n = i(n);
      break;
    case "signIn":
      n = /^https/i.test(n) ? n : c;
      break;
    default:
    }
    return n = f(n), n;
  }
  function y(e) {
    return /^(skype|tel):/i.test(e) ? o.getMessageSanitizedContent(e) : c;
  }
  function b(e, t, n) {
    return e = e && e.toLowerCase(), t.hasOwnProperty(e) ? t[e] : n;
  }
  function w(e) {
    return e ? f(o.getMessageSanitizedContent(o.unwebify(e))) : null;
  }
  function E() {
    var e = u.resolve(n.serviceLocator.FEATURE_FLAGS), t = e.isFeatureOn(n.featureFlags.SWIFT_CARD_RENDERING_MEDIA_CARDS);
    l["application/vnd.microsoft.card.hero"] = l.hero;
    l["application/vnd.microsoft.card.thumbnail"] = l.thumb;
    l["application/vnd.microsoft.card.receipt"] = l.receipt;
    l["application/vnd.microsoft.card.signin"] = l.signIn;
    l["application/vnd.microsoft.card.flex"] = l.flex;
    t && (l["application/vnd.microsoft.card.video"] = l.video, l["application/vnd.microsoft.card.audio"] = l.audio, l["application/vnd.microsoft.card.animation"] = l.animation);
  }
  var t = e("lodash-compat"), n = e("swx-constants").COMMON, r = e("swx-cafe-application-instance"), i = e("swx-encoder/lib/encoders/emoticonEncoder"), s = e("swx-encoder"), o = e("swx-utils-chat").messageSanitizer, u = e("swx-service-locator-instance").default, a = e("experience/settings"), f, l = {
      unknown: "Unknown",
      hero: "Hero",
      thumb: "Thumb",
      receipt: "Receipt",
      signIn: "SignIn",
      flex: "Flex",
      audio: "Audio",
      video: "Video",
      animation: "Animation"
    }, c = "invalidValue";
  return f = function (t) {
    var n = i.build(), o = s.build(r, { domTransformers: [n] });
    return f = function (t) {
      return o.decode(o.encode(t, !1));
    }, f(t);
  }, {
    ContentType: l,
    invalidValue: c,
    filterOutNotValidItems: h,
    filterOutDisabledItems: p,
    normalizeDestination: y,
    normalizeEnum: b,
    normalizeRichText: w,
    normalizeText: m,
    normalizeUrl: g,
    mapArray: v,
    getItemIfNotDisabled: d,
    setSupportedSwiftCardTypes: E
  };
});
