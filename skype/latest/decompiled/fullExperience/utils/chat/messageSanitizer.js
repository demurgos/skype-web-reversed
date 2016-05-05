define("utils/chat/messageSanitizer", [
  "require",
  "cafe/applicationInstance",
  "services/serviceLocator",
  "constants/common",
  "utils/common/regex",
  "utils/common/encoder",
  "dompurify",
  "lodash-compat"
], function (e) {
  function F(e, t, n) {
    return new RegExp("((?:&lt;" + e + " raw_pre=\"" + t + "\"" + (n ? "" : " raw_post=\"" + t + "\"") + "&gt;)+)([\\s\\S]*?)((?:&lt;/" + e + "&gt;)+)", "gi");
  }
  function I(e, t, n) {
    var r = "<{0} raw_pre=\"{1}\" raw_post=\"{1}\">{2}</{0}>";
    return r.split("{0}").join(e).split("{1}").join(t).split("{2}").join(n);
  }
  function q() {
    var e = "^(https?://)?", t = "(([0-9a-z_!~*'()\\.&=+$%-]+:)?[0-9a-z_!~*'()\\.&=+$%-]+@)?", n = "(\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])", r = "(" + n + "\\.){3}" + n, i = "([0-9a-z][0-9a-z_-]*)?[0-9a-z]", s = "(" + i + "\\.)+(com|org|net|edu|gov|mil|aero|arpa|asia|biz|cat|coop|info|int|jobs|mobi|museum|name|pro|tel|travel|[a-z]{2})", o = "(:\\d{1,5})?", u = "([#/].*)?$", a = [
        e + t + s + o + u,
        e + t + r + o + u,
        e + t + i + o + u
      ];
    return a.map(function (e) {
      return new RegExp(e, "i");
    });
  }
  function R(e) {
    return B[e];
  }
  function U(e) {
    return e.replace(/([<>])/gi, R);
  }
  function z(e) {
    return e.replace(/(&lt;|&gt;)/gi, R);
  }
  function W(e) {
    return e.replace(/([<>&"'])/gi, R);
  }
  function X(e) {
    return e.replace(/&(lt|gt|amp|quot|apos);/gi, R);
  }
  function V(e, t) {
    return e.replace(t, z);
  }
  function $(e) {
    function f(e, t) {
      return s[i] = t, e.replace(t, "DUMMY" + i++);
    }
    function c(e, n) {
      t = t.replace("DUMMY" + n, e);
    }
    var t, n, r, i = 0, s = [], o, u = new RegExp(l, "gi"), a = new RegExp(l, "i");
    r = u.exec(e);
    if (!r)
      return e;
    n = e;
    while (r)
      o = r[0].match(a).splice(1), t = o.reduce(f, r[0]), t = z(t), s.forEach(c), n = n.replace(r[0], t), r = u.exec(e);
    return n;
  }
  function J(e) {
    var t = e.match(E).slice(1);
    return t.reduce(V, e);
  }
  function K(e, t) {
    var n = /(<a|&lt;a)/;
    return e.search(i.escapeSpecialChars(t)) > -1 ? e : e.replace(n, function (e) {
      return e + " " + t;
    });
  }
  function Q(e, t, n, r, i) {
    var s, o;
    return s = z(t), o = z(i), n.indexOf(j) !== 0 && (s = K(s, "target=\"_blank\"")), s = K(s, "tabindex=\"-1\""), s = K(s, "title=\"" + n + "\""), s + r + o;
  }
  function G(e, t) {
    var n, r = "&lt;", i = /(\+?[\s\d\-]*\d)&lt;/i;
    return n = t.match(i)[0], n.slice(0, n.length - r.length);
  }
  function Y(e) {
    return W(e.replace(f, Q));
  }
  function Z(e) {
    return X(e.replace(f, Q));
  }
  function et(e) {
    return e.replace(/<a(:?>|\s.*?>)/g, "").replace(/<\/a>/g, "");
  }
  function tt(e) {
    function t(e, t) {
      return e.replace(k[t], "");
    }
    return Object.keys(k).reduce(t, e);
  }
  function nt(e) {
    function t(e, t, n, r, i) {
      var s = H[e] || H.default;
      return e === "rawFontColor" && (n = n.replace(/font(\s+)color/i, "font color")), z(n.substr(0, s.opening)) + r + z(i.substr(0, s.closing));
    }
    function n(e, n) {
      return e.replace(D[n], t.bind(null, n));
    }
    return Object.keys(D).reduce(n, e);
  }
  function rt(e, t) {
    function o() {
      return t && Object.keys(t).length > 0 && !f(e) && e.length > 1;
    }
    function a(e) {
      return t[e] !== undefined;
    }
    function f(e) {
      return !e || !/\S/.test(e);
    }
    function l(e, t) {
      var n;
      for (var r = 0; r < e.length; r++) {
        n = e[r];
        if (t !== undefined && t.length > 0 && t.indexOf(n) !== -1)
          continue;
        return n === " ";
      }
      return !0;
    }
    function c(e) {
      return e.split("").reverse().join("");
    }
    function h(e, t, n) {
      var r = [
        ",",
        ".",
        ";",
        ":",
        "?",
        "!",
        "(",
        ")"
      ];
      return a(t) ? l(c(e), r) || l(n, r) : !1;
    }
    function p(e, t, n, r) {
      var i = [
        ",",
        ".",
        ";",
        ":",
        "?",
        "!",
        "(",
        ")"
      ];
      return n !== e || u.first(r) === e ? !1 : l(c(t), i) || l(r, i);
    }
    function d(e, t, n) {
      for (var r = t; r <= e.length; r++)
        if (n(e.substring(0, r), e[r], e.substring(r + 1, e.length)))
          return r;
      return -1;
    }
    function v(e, t, n) {
      var r = t, i, s;
      do {
        r += 1, i = d(e, r, p.bind(null, n));
        if (i === -1)
          return -1;
        s = e.substring(t + 1, i);
      } while (f(s));
      return i;
    }
    var n = 0, r, i, s;
    if (!o())
      return [];
    do {
      if (n >= e.length - 1)
        return [];
      r = d(e, n, h);
      if (r === -1)
        return [];
      s = e.charAt(r), i = v(e, r, s), t = u.omit(t, s), n += 1;
    } while (i === -1);
    return [
      r,
      i
    ];
  }
  function it(e, t) {
    var n = rt(t, e), r = n[0], i = n[1], s, o, a, f, l, c, h;
    return r === undefined || i === undefined || r < 0 || i < 0 ? t : (s = t.charAt(r), o = e[s], h = t.substring(0, r), a = t.substring(r + 1, i), l = t.substring(i + 1), f = it(u.omit(e, s), a), f = o(f), c = it(e, l), h + f + c);
  }
  function st(e) {
    var t = e.split(/\r?\n/), n;
    return n = u.map(t, function (e) {
      return it(P, e);
    }), n.join("\r\n");
  }
  function ot(e, t) {
    function r(e) {
      function n(e) {
        return e.test(t);
      }
      var t = e.replace(/[\u0080-\u9999]/g, "z");
      return A.some(n);
    }
    function i(e) {
      return e.replace(/(["\''])/gi, R);
    }
    function s(e, s) {
      return r(s) ? (s = i(s), n = /^w{3}\./i.test(s) ? "http://" + s : s, "<a" + (t ? "" : " tabindex=\"-1\" target=\"_blank\"") + " href=\"" + n + "\">" + s + "</a>") : s;
    }
    function o(e, t) {
      return r(t) ? "<a href=\"mailto:" + t + "\">" + t + "</a>" : t;
    }
    var n;
    return e.replace(L, s).replace(c, o);
  }
  function ut(e, t, n) {
    var r = U(e.replace(/&/g, "&amp;")), i = r.match(t), s;
    return i ? i.forEach(function (e, t) {
      var o = r.indexOf(e), u = o + e.length, a = i[t + 1], f;
      t === 0 && (s = n(r.substring(0, o))), s += r.substring(o, u), r = r.substring(u), f = a ? r.indexOf(a) : undefined, s += n(r.substring(0, f));
    }) : s = n(r), z(s.replace(/&amp;/g, "&"));
  }
  function at(e) {
    return o.sanitize(e, { ALLOWED_TAGS: [] });
  }
  function ft(e) {
    var t = n.resolve(r.serviceLocator.FEATURE_FLAGS), i = t.isFeatureOn(r.featureFlags.INCOMING_WIKI_MARKUP), s = U(e);
    return s = s.replace(w, J), s = s.replace(S, z), s = $(s), s = s.replace(f, Q), s = s.replace(h, G), i ? nt(s) : s;
  }
  function lt(e) {
    return U(e).replace(/&lt;ss type="[^"]*"&gt;/gi, z).replace(/&lt;\/ss&gt;/gi, z).replace(x, z);
  }
  function ct(e, t, n) {
    var r = e.match(t), i = [], s = e.split(t), o;
    if (!r)
      return e;
    u.each(r, function (e) {
      i.push(n(e));
    }), o = s[0];
    for (var a = 0; a < i.length; a++)
      o += i[a], o += s[a + 1];
    return o;
  }
  function ht(e, t) {
    function i(e) {
      return n + e + r;
    }
    var n = "<span class=\"notranslate\">", r = "</span>";
    return ct(e, t, i);
  }
  function pt(e, t) {
    function s(e) {
      var t = e.replace(n, ""), i = t.substring(0, t.lastIndexOf(r));
      return i;
    }
    var n = "<span class=\"notranslate\">", r = "</span>", i = new RegExp(n + t.source + "</span>", "gi");
    return ct(e, i, s);
  }
  function dt(e) {
    var t;
    return e && (t = pt(e, b), t = pt(t, T), t = pt(t, N), t = pt(t, C), t = pt(t, y), t = pt(t, g)), t;
  }
  function vt(e) {
    var t = /(\r?\n)|(&lt;br\s?\/&gt;)/gm, n = "<br/>";
    return e.replace(t, n);
  }
  function mt(e) {
    var t = new RegExp(O, "gi"), n = new RegExp(O, "i"), r, i, s = e;
    r = t.exec(e);
    while (r)
      i = n.exec(r[0]), i && (s = s.replace(i[0], "@" + i[1])), r = t.exec(e);
    return s;
  }
  function gt(e) {
    var t = new RegExp(_, "gi"), n = new RegExp(_, "i"), r, i, s = e;
    r = t.exec(e);
    while (r)
      i = n.exec(r[0]), i && (s = s.replace(i[0], i[2])), r = t.exec(e);
    return s;
  }
  function yt(e) {
    var t = new RegExp(M, "gi"), n = new RegExp(M, "i"), r, i, s = e;
    r = t.exec(e);
    while (r)
      i = n.exec(r[0]), i && i.length === 4 && (s = s.replace(i[0], i[1] + i[3] + i[2])), r = t.exec(e);
    return s;
  }
  function bt(e) {
    var n = s.build(t).decode(e), r = tt(n), i = ft(r);
    return vt(i);
  }
  function wt(e) {
    var t = mt(e);
    return t = yt(t), t = gt(t), t;
  }
  function Et(e) {
    return e = e.trim(), e = e.replace(/&/g, "&amp;"), e = s.build(t).encode(e), e = lt(e), e = ot(e, !0), e = e.replace(/&amp;amp;/gi, "&amp;"), e = st(e), e;
  }
  function St(e) {
    var t = Et(e);
    return t = ht(t, T), t = ht(t, N), t = ht(t, g), t;
  }
  function xt(e) {
    var t;
    return t = ht(e, b), t = ht(t, C), t = ht(t, y), t = ht(t, g), t;
  }
  function Tt(e, t) {
    var n = u.isArray(t) ? t : [t];
    return u.each(n, function (t) {
      e = e.replace(t, "");
    }), e = e.trim(), !e;
  }
  function Nt(e) {
    var t = /<at id="(.*?)">.*?<\/at>/g, n = /<i class="(.*?)"><span title="(.*?)">.*?<\/span><\/i>/g;
    return Tt(e, [
      t,
      n
    ]);
  }
  function Ct(e) {
    return Tt(e, [
      T,
      N,
      b,
      C
    ]);
  }
  var t = e("cafe/applicationInstance"), n = e("services/serviceLocator"), r = e("constants/common"), i = e("utils/common/regex"), s = e("utils/common/encoder"), o = e("dompurify"), u = e("lodash-compat"), a = "(?:(?:\\s*title=\".*?\"\\s*)|(?:\\s*tabindex=\"-1\"\\s*)|(?:\\s*target=\"_blank\"\\s*)){0,3}", f = i.multilineRegExp([
      "(&lt;a ",
      a,
      "href=\"((?:https?://|mailto:)[^\"]+?)\"",
      a,
      "&gt;)",
      "((?:(?!&lt;/a&gt;)[\\s\\S])*)",
      "(&lt;/a&gt;)"
    ], "gi"), l = "&lt;i class=\"" + r.mentions.class + "\"&gt;&lt;span title=\"(.*?)\"&gt;(.*?)&lt;/span&gt;&lt;/i&gt;", c = /((([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,}))/gi, h = /(&lt;a href="skype:\+\d+"&gt;(\+?[\s\d\-]*\d)&lt;\/a&gt;)/gi, p = [
      "(",
      "&lt;span class=\"emoticon [a-z0-9]+\\s?(?:animated)?\\s?\\s?(?:large|extraLarge)?\\s?\"&gt;",
      "&lt;span class=\"emoSprite\"&gt;",
      ")",
      "(?:.+?)",
      "(&lt;/span&gt;&lt;/span&gt;)"
    ], d = [
      "<span class=\"emoticon [a-z0-9]+\\s?(?:animated)?\\s?\\s?(?:large|extraLarge)?\\s?\">",
      "<span class=\"emoSprite\">",
      "(?:.+?)",
      "</span></span>"
    ], v = [
      "<i class=\"" + r.mentions.class + "\">",
      "<span title=\"(?:.+?)\">",
      "(?:.+?)",
      "</span></i>"
    ], m = [
      "<a (?:(?:\\s*title=\".*?\"\\s*)|(?:s*tabindex=\"-1\"\\s*)|(?:\\s*target=\"_blank\"\\s*)){0,3}href=\"(?:https?://|mailto:)[^\"]+?\"",
      "(?:(?:\\s*title=\".*?\"\\s*)|(?:\\s*tabindex=\"-1\"\\s*)|(?:\\s*target=\"_blank\"\\s*)){0,3}>",
      "(?:(?!</a>)[\\s\\S])*</a>"
    ], g = i.multilineRegExp(m, "gi"), y = i.multilineRegExp(v, "gi"), b = i.multilineRegExp(d, "gi"), w = i.multilineRegExp(p, "gi"), E = i.multilineRegExp(p, "i"), S = /&lt;span class="flag ([^"]{2})"&gt;[\s]*\(flag:\1\)[\s]*&lt;\/span&gt;/gi, x = /&lt;flag country="([^"]{2})"&gt;[\s]*\(flag:\1\)[\s]*&lt;\/flag&gt;/gi, T = /<ss type="\w+">.*?<\/ss>/g, N = /<flag country="[\w+]{2}">(?:.+?)<\/flag>/gi, C = /<span class="flag [^"]{2}">(?:.+?)<\/span>/gi, k = {
      text: /Edited previous message: /,
      edited: /<e_m [^<>]+>/g,
      quoted: /(<(?:\/?)(?:quote|legacyquote)[^>]*>)/gi
    }, L = /\b((https?:\/\/|w{3}\.)\S+)/gi, A = q(), O = "<i class=\"" + r.mentions.class + "\"><span title=\"(.*?)\">(.*?)</span></i>", M = "<.? raw_pre=\"(.?)\" raw_post=\"(.?)\">(.*?)</.?>", _ = "<ss type=\"(.*?)\">(.*?)</ss>", D = {
      bold: F("b", "\\*"),
      italic: F("i", "_"),
      strike: F("s", "~"),
      code: F("pre", "{code}"),
      codeBlock: F("pre", "!! ", !0),
      rawBold: new RegExp("(&lt;b&gt;)(.*?)(&lt;/b&gt;)", "gi"),
      rawItalic: new RegExp("(&lt;i&gt;)(.*?)(&lt;/i&gt;)", "gi"),
      rawFontColor: new RegExp("(&lt;font\\s+color=\"#[a-f0-9]{6}\"&gt;)(.*?)(&lt;/font&gt;)", "gi")
    }, P = {
      "*": function (e) {
        return I("b", "*", e);
      },
      _: function (e) {
        return I("i", "_", e);
      },
      "~": function (e) {
        return I("s", "~", e);
      }
    }, H = {
      code: {
        opening: 46,
        closing: 12
      },
      codeBlock: {
        opening: 25,
        closing: 12
      },
      rawBold: {
        opening: 9,
        closing: 10
      },
      rawItalic: {
        opening: 9,
        closing: 10
      },
      rawFontColor: {
        opening: 28,
        closing: 13
      },
      "default": {
        opening: 34,
        closing: 10
      }
    }, B = {
      "<": "&lt;",
      ">": "&gt;",
      "&lt;": "<",
      "&gt;": ">",
      "&LT;": "<",
      "&GT;": ">",
      "&": "&amp;",
      "\"": "&quot;",
      "'": "&apos;",
      "&amp;": "&",
      "&quot;": "\"",
      "&apos;": "'",
      "&AMP;": "&",
      "&QUOT;": "\"",
      "&APOS;": "'"
    }, j = "mailto:";
  return {
    validateUnescapedLink: function (e) {
      return U(e).replace(f, Q);
    },
    encodeEmoticonsTextRepresentation: function (e) {
      function n(e) {
        var n = s.build(t);
        return n.decode(n.encode(e));
      }
      return ut(e, w, n);
    },
    encodeEmoticonsRawRepresentation: function (e) {
      var n = s.build(t);
      return n.decode(n.encode(e, !1));
    },
    encodeLinkTextRepresentation: function (e) {
      return ut(e, f, ot);
    },
    unboxHrefContent: function (e) {
      function i(e, t) {
        var r = t.match(n)[1] || "", i = r.replace("&amp;", "&");
        return e.replace(t, i);
      }
      var t = /(<a.*?<\/a>)/gi, n = /href="(.*?)"/i, r = e.match(t) || [];
      return r.reduce(i, e);
    },
    processOutgoingTextMessage: Et,
    escapeIncomingHTML: ft,
    escapeOutgoingHTML: lt,
    escapeHTML: Y,
    unescapeHTML: Z,
    removeAnchorTags: et,
    removeMetaData: tt,
    webify: vt,
    unwebify: function (e) {
      var t = "\r\n", n = /<br\/?>/g;
      return e.replace(n, t);
    },
    getSanitizedTopic: function (e) {
      return Z(et(e));
    },
    getMessageSanitizedContent: bt,
    getEmoticonNamesFromMessage: function (e) {
      var t = [], n = /(?:<ss type=")(\w+)">/g, r;
      while (r = n.exec(e)) {
        var i = r[1];
        t.push(i);
      }
      return t;
    },
    stripHTML: at,
    encode: function (e) {
      return s.build(t).encode(e);
    },
    handleWikiMarkup: nt,
    compactHtml: wt,
    isMessageWithMentionOnly: Nt,
    removeNoTranslateTags: dt,
    processOutgoingTextMessageForTranslation: St,
    isMessageWithEmoticonsOnly: Ct,
    processIncomingSanitizedTextMessageForTranslation: xt
  };
})
