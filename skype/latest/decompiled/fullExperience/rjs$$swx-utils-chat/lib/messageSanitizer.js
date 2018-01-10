(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-chat/lib/messageSanitizer", [
      "require",
      "exports",
      "lodash-compat",
      "swx-cafe-application-instance",
      "swx-constants",
      "swx-encoder",
      "swx-encoder",
      "swx-encoder",
      "swx-service-locator-instance",
      "swx-utils-common",
      "dompurify",
      "./dateTime"
    ], e);
}(function (e, t) {
  function I(e, t, n) {
    return n === void 0 && (n = !1), new RegExp("((?:&lt;" + e + " raw_pre=\"" + t + "\"" + (n ? "" : " raw_post=\"" + t + "\"") + "&gt;)+)([\\s\\S]*?)((?:&lt;/" + e + "&gt;)+)", "gi");
  }
  function q(e, t, n) {
    var r = "<{0} raw_pre=\"{1}\" raw_post=\"{1}\">{2}</{0}>";
    return r.split("{0}").join(e).split("{1}").join(t).split("{2}").join(n);
  }
  function R() {
    var e = "^(https?://)?", t = "(([0-9a-z_!~*'()\\.&=+$%-]+:)?[0-9a-z_!~*'()\\.&=+$%-]+@)?", n = "(\\d{1,2}|1\\d{2}|2[0-4]\\d|25[0-5])", r = "(" + n + "\\.){3}" + n, i = "([0-9a-z][0-9a-z_-]*)?[0-9a-z]", s = "(" + i + "\\.)+(com|org|net|edu|gov|mil|aero|arpa|asia|biz|cat|coop|info|int|jobs|mobi|museum|name|pro|tel|travel|[a-z]{2})", o = "(:\\d{1,5})?", u = "([#/].*)?$", a = [
        e + t + s + o + u,
        e + t + r + o + u,
        e + t + i + o + u
      ];
    return a.map(function (e) {
      return new RegExp(e, "i");
    });
  }
  function U(e) {
    return B[e];
  }
  function z(e) {
    return e.replace(/([<>])/gi, U);
  }
  function W(e) {
    return e.replace(/(&lt;|&gt;)/gi, U);
  }
  function X(e) {
    return e.replace(/([<>&"'])/gi, U);
  }
  function V(e) {
    return e.replace(/&(lt|gt|amp|quot|apos|#39|#96);/gi, U);
  }
  function $(e, t) {
    return e.replace(t, W);
  }
  function J(e) {
    function o(e, t) {
      return r[n] = t, e.replace(t, "DUMMY" + n++);
    }
    function f(e, n) {
      t = t.replace("DUMMY" + n, e);
    }
    var t, n = 0, r = [], i = new RegExp(d, "gi"), s = new RegExp(d, "i"), u = i.exec(e);
    if (!u)
      return e;
    var a = e;
    while (u) {
      var l = u[0].match(s).splice(1);
      t = l.reduce(o, u[0]);
      t = W(t);
      r.forEach(f);
      a = a.replace(u[0], t);
      u = i.exec(e);
    }
    return a;
  }
  function K(e) {
    var t = e.match(S).slice(1);
    return t.reduce($, e);
  }
  function Q(e, t) {
    var n = /(<a|&lt;a)/;
    return e.search(f.regex.escapeSpecialChars(t)) > -1 ? e : e.replace(n, function (e) {
      return e + " " + t;
    });
  }
  function G(e, t, n, r, i) {
    var s, o;
    return s = W(t), o = W(i), n.indexOf(j) !== 0 && (s = Q(s, "target=\"_blank\"")), s = Q(s, "tabindex=\"-1\""), s = Q(s, "title=\"" + n + "\""), s + r + o;
  }
  function Y(e, t) {
    var n = "&lt;", r = /(\+?[\s\d\-]*\d)&lt;/i, i = t.match(r)[0];
    return i.slice(0, i.length - n.length);
  }
  function Z(e) {
    return X(e.replace(p, G));
  }
  function et(e) {
    return V(e.replace(p, G));
  }
  function tt(e) {
    return e.replace(/<a(:?>|\s.*?>)/g, "").replace(/<\/a>/g, "");
  }
  function nt(e) {
    function t(e, t) {
      return e.replace(A[t], "");
    }
    return Object.keys(A).reduce(t, e);
  }
  function rt(e) {
    function t(e, t, n, r, i) {
      var s = H[e] || H["default"];
      return e === "rawFontColor" && (n = n.replace(/font(\s+)color/i, "font color")), W(n.substr(0, s.opening)) + r + W(i.substr(0, s.closing));
    }
    function n(e, n) {
      return e.replace(D[n], t.bind(null, n));
    }
    return Object.keys(D).reduce(n, e);
  }
  function it(e, t) {
    function u() {
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
    function p(e, t, r, i) {
      var s = [
        ",",
        ".",
        ";",
        ":",
        "?",
        "!",
        "(",
        ")"
      ];
      return r !== e || n.first(i) === e ? !1 : l(c(t), s) || l(i, s);
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
        r += 1;
        i = d(e, r, p.bind(null, n));
        if (i === -1)
          return -1;
        s = e.substring(t + 1, i);
      } while (f(s));
      return i;
    }
    var r = 0, i, s, o;
    if (!u())
      return [];
    do {
      if (r >= e.length - 1)
        return [];
      i = d(e, r, h);
      if (i === -1)
        return [];
      o = e.charAt(i);
      s = v(e, i, o);
      t = n.omit(t, o);
      r += 1;
    } while (s === -1);
    return [
      i,
      s
    ];
  }
  function st(e, t) {
    var r = it(t, e), i = r[0], s = r[1], o, u, a, f, l, c, h;
    return i === undefined || s === undefined || i < 0 || s < 0 ? t : (o = t.charAt(i), u = e[o], h = t.substring(0, i), a = t.substring(i + 1, s), l = t.substring(s + 1), f = st(n.omit(e, o), a), f = u(f), c = st(e, l), h + f + c);
  }
  function ot(e) {
    var t = e.split(/\r?\n/), r;
    return r = n.map(t, function (e) {
      return st(P, e);
    }), r.join("\r\n");
  }
  function ut(e, t) {
    function r(e) {
      function n(e) {
        return e.test(t);
      }
      var t = e.replace(/[\u0080-\u9999]/g, "z");
      return M.some(n);
    }
    function i(e) {
      return e.replace(/(["''])/gi, U);
    }
    function s(e, s) {
      return r(s) ? (s = i(s), n = /^w{3}\./i.test(s) ? "http://" + s : s, "<a" + (t ? "" : " tabindex=\"-1\" target=\"_blank\"") + " href=\"" + n + "\">" + s + "</a>") : s;
    }
    function o(e, t) {
      return r(t) ? "<a href=\"mailto:" + t + "\">" + t + "</a>" : t;
    }
    t === void 0 && (t = !1);
    var n;
    return e.replace(O, s).replace(v, o);
  }
  function at(e, t, n) {
    var r = z(e.replace(/&/g, "&amp;")), i = r.match(t), s;
    return i ? i.forEach(function (e, t) {
      var o = r.indexOf(e), u = o + e.length, a = i[t + 1];
      t === 0 && (s = n(r.substring(0, o)));
      s += r.substring(o, u);
      r = r.substring(u);
      var f = a ? r.indexOf(a) : undefined;
      s += n(r.substring(0, f));
    }) : s = n(r), W(s.replace(/&amp;/g, "&"));
  }
  function ft(e) {
    return l.sanitize(e, { ALLOWED_TAGS: [] });
  }
  function lt(e) {
    l.addHook("beforeSanitizeElements", function (e, t, n) {
      yt(e, "legacyquote");
    });
    l.addHook("beforeSanitizeAttributes", function (e, t, n) {
      gt(e, "target", "_blank");
      bt(e, "authorname", "quote");
    });
    l.addHook("afterSanitizeAttributes", function (e, t, n) {
      var r = wt(e, "href");
      r && (gt(e, "rel", "noreferrer noopener"), gt(e, "onclick", "return false;"), gt(e, "title", r));
    });
    var t = l.sanitize(e, F);
    return l.removeHook("beforeSanitizeElements"), l.removeHook("beforeSanitizeAttributes"), l.removeHook("afterSanitizeAttributes"), t.replace("&nbsp;", " ");
  }
  function ct(e) {
    var t = a["default"].resolve(i.COMMON.serviceLocator.FEATURE_FLAGS), n = t.isFeatureOn(i.COMMON.featureFlags.INCOMING_WIKI_MARKUP), r = z(e);
    return r = r.replace(E, K), r = r.replace(x, W), r = J(r), r = r.replace(p, G), r = r.replace(m, Y), n ? rt(r) : r;
  }
  function ht(e) {
    return z(e).replace(/&lt;ss type="[^"]*"&gt;/gi, W).replace(/&lt;\/ss&gt;/gi, W).replace(T, W);
  }
  function pt(e) {
    var t = u.NoTranslateDomTransformer.build(u.NoTranslateDomTransformer.Mode.Remove), n = s.build(r, { domTransformers: [t] });
    return n.encode(e, !1);
  }
  function dt(e) {
    var t = /(\r?\n)|(&lt;br\s?\/&gt;)/gm, n = "<br/>";
    return e.replace(t, n);
  }
  function vt(e) {
    var t = new RegExp(_, "gi"), n = new RegExp(_, "i"), r = e, i = t.exec(e);
    while (i) {
      var s = n.exec(i[0]);
      s && (r = r.replace(s[0], s[2]));
      i = t.exec(e);
    }
    return r;
  }
  function mt(e) {
    var t = /^<pre\s/, n = /^!!|\{code}/, i = o.CodeSnippetDecoder.build(), u = o.CodeSnippetEncoder.build(), a = !t.test(e) && n.test(e), f = e !== undefined && a ? s.build(r, { domTransformers: [u] }).encode(e) : e, h = f !== undefined ? s.build(r, { domDecoders: [i] }).decode(f) : e, p = lt(h), d = o.QuoteDecoder.build(c.formatTimestampLong), v = s.build(r, { domDecoders: [d] }).decode(p), m = v.replace(g, Y), y = nt(m), b = l.sanitize(y, {
        ADD_ATTR: [
          "target",
          "rel",
          "onclick",
          "title",
          "author",
          "role",
          "raw_pre",
          "raw_post"
        ],
        ADD_TAGS: ["at"]
      }), w = dt(b);
    return w.replace(/&nbsp;/g, "\xA0");
  }
  function gt(e, t, n) {
    return e && e.tagName && e.tagName.toLowerCase() === "a" && (e.hasAttribute(t) || e.setAttribute(t, n)), e;
  }
  function yt(e, t) {
    return e && e.nodeName && e.nodeName.toLowerCase() === t && (e.innerHTML = n.escape(e.innerHTML)), e;
  }
  function bt(e, t, r) {
    return e && e.tagName && e.tagName.toLowerCase() === r && e.hasAttribute(t) && e.setAttribute(t, n.escape(e.getAttribute(t))), e;
  }
  function wt(e, t) {
    return e && e.tagName && e.tagName.toLowerCase() === "a" && e.hasAttribute(t) ? e.getAttribute(t) : null;
  }
  function Et(e) {
    var t = o.MarkupDecoder.build(), n = o.MentionDecoder.build(), i = o.CodeSnippetDecoder.build(), u = s.build(r, {
        domTransformers: [
          t,
          n,
          i
        ]
      }), a = u.encode(e, !1);
    return a = vt(a), a;
  }
  function St(e) {
    return e.replace(String.fromCharCode(11), "");
  }
  function xt(e, t) {
    t === void 0 && (t = null);
    e = e.trim();
    e = St(e);
    var n = s.URLDomTransformer.build(!0);
    return e = s.build(r, {
      conversation: t,
      domTransformeExtensions: [n]
    }).encode(e, !0), e = ot(e), e;
  }
  function Tt(e, t) {
    t === void 0 && (t = null);
    var n = xt(e, t), i = u.NoTranslateDomTransformer.build(u.NoTranslateDomTransformer.Mode.Add), o = s.build(r, { domTransformers: [i] });
    return o.encode(n, !1);
  }
  function Nt(e) {
    var t = u.NoTranslateDomTransformer.build(u.NoTranslateDomTransformer.Mode.Add), n = s.build(r, { domTransformers: [t] });
    return n.encode(e, !1);
  }
  function Ct(e, t) {
    var r = n.isArray(t) ? t : [t];
    return n.each(r, function (t) {
      e = e.replace(t, "");
    }), e = e.trim(), !e;
  }
  function kt(e) {
    var t = /<at id="(.*?)">.*?<\/at>/g, n = /<i class="(.*?)"><span title="(.*?)">.*?<\/span><\/i>/g;
    return Ct(e, [
      t,
      n
    ]);
  }
  function Lt(e) {
    return Ct(e, [
      N,
      C,
      w,
      k,
      L
    ]);
  }
  function At(e) {
    var t = o.EmoticonEncoder.build(), n = s.URLDomTransformer.build(), i = s.NewLineDomTransformer.build(), u = s.FlagDomTransformer.build(), a = o.MentionEncoder.build(null), f = o.QuoteDecoder.build(c.formatTimestampLong), h = s.build(r, {
        domTransformers: [
          u,
          t,
          n,
          i,
          a
        ],
        domDecoders: [f]
      }), p = h.encode(e), d = h.decode(p), v = l.sanitize(d, {
        ADD_ATTR: [
          "target",
          "rel",
          "onclick"
        ]
      });
    return v;
  }
  function Mt(e, t, n, r) {
    r === void 0 && (r = null);
    var i = Ot[t] && Ot[t][n];
    if (i)
      return i(e, r);
    throw new Error("Encoder from " + t + " to " + n + " is not available");
  }
  function _t(e) {
    return z(e).replace(p, G);
  }
  function Dt(e) {
    function t(e) {
      var t = s.build(r);
      return t.decode(t.encode(e));
    }
    return at(e, E, t);
  }
  function Pt(e) {
    var t = s.build(r), n = t.encode(e, !1);
    return t.decode(n);
  }
  function Ht(e) {
    return at(e, p, ut);
  }
  function Bt(e) {
    function i(e, t) {
      var r = t.match(n)[1] || "", i = r.replace("&amp;", "&");
      return e.replace(t, i);
    }
    var t = /(<a.*?<\/a>)/gi, n = /href="(.*?)"/i, r = e.match(t) || [];
    return r.reduce(i, e);
  }
  function jt(e) {
    var t = "\r\n", n = /<br\s*\/?>/g;
    return e.replace(n, t);
  }
  function Ft(e) {
    return et(tt(e));
  }
  function It(e) {
    var t = [], n = /(?:<ss type=")(\w+)">/g, r;
    while (r = n.exec(e)) {
      var i = r[1];
      t.push(i);
    }
    return t;
  }
  function qt(e) {
    return s.build(r).encode(e);
  }
  function Rt(e) {
    var t = /<div class=["\']quotedText["\'']>.*[\S\s]*<\/div>/ig, r = t.exec(e);
    return n.isUndefined(r) || n.isNull(r) ? "" : r[0];
  }
  function Ut(e) {
    var t = /<quote.*[\S\s]*<\/quote>/ig, r = t.exec(e);
    return n.isUndefined(r) || n.isNull(r) ? "" : r[0];
  }
  function zt(e) {
    var t = jt(e);
    return t = s.build(r).getNodeTextContent(t), t = Bt(t), t;
  }
  var n = e("lodash-compat"), r = e("swx-cafe-application-instance"), i = e("swx-constants"), s = e("swx-encoder"), o = e("swx-encoder"), u = e("swx-encoder"), a = e("swx-service-locator-instance"), f = e("swx-utils-common"), l = e("dompurify"), c = e("./dateTime"), h = "(?:(?:\\s*title=\"[^\"]+?\"\\s*)|(?:\\s*tabindex=\"-1\"\\s*)|(?:\\s*target=\"_blank\"\\s*)){0,3}", p = f.regex.multilineRegExp([
      "(&lt;a ",
      h,
      "href=\"((?:https?://|mailto:)[^\"]+?)\"",
      h,
      "&gt;)",
      "((?:(?!&lt;/a&gt;)[\\s\\S])*)",
      "(&lt;/a&gt;)"
    ], "gi"), d = "&lt;i class=\"" + i.COMMON.mentions["class"] + "\"&gt;&lt;span title=\"(.*?)\"&gt;(.*?)&lt;/span&gt;&lt;/i&gt;", v = /((([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,}))/gi, m = /(&lt;a href="skype:\+\d+"&gt;(\+?[\s\d\-]*\d)&lt;\/a&gt;)/gi, g = /(<a href="skype:\+\d+">(\+?[\s\d\-]*\d)<\/a>)/gi, y = [
      "(",
      "&lt;span class=\"emoticon [a-z0-9]+\\s?(?:animated)?\\s?\\s?(?:large|extraLarge)?\\s?\"&gt;",
      "&lt;span class=\"emoSprite\"&gt;",
      "|",
      "&lt;span class=\"emoticon\\s?(?:large|extraLarge)?\\s?\"&gt;",
      "&lt;canvas(?:\\s?(?:data-[-a-z]*|height|width)=\"[a-z0-9]*\")*&gt;",
      ")",
      "(?:.+?)",
      "(",
      "&lt;/span&gt;&lt;/span&gt;",
      "|",
      "&lt;/canvas&gt;&lt;/span&gt;",
      ")"
    ], b = [
      "(?:",
      "<span class=\"emoticon [a-z0-9]+\\s?(?:animated)?\\s?\\s?(?:large|extraLarge)?\\s?\">",
      "<span class=\"emoSprite\">",
      "|",
      "<span class=\"emoticon\\s?(?:large|extraLarge)?\\s?\">",
      "<canvas(?:\\s?(?:data-[-a-z]*|height|width)=\"[a-z0-9]*\")*>",
      ")",
      "(?:.+?)",
      "(?:",
      "</span></span>",
      "|",
      "</canvas></span>",
      ")"
    ], w = f.regex.multilineRegExp(b, "gi"), E = f.regex.multilineRegExp(y, "gi"), S = f.regex.multilineRegExp(y, "i"), x = /&lt;span class="flag ([^"]{2})"&gt;[\s]*\(flag:\1\)[\s]*&lt;\/span&gt;/gi, T = /&lt;flag country="([^"]{2})"&gt;[\s]*\(flag:\1\)[\s]*&lt;\/flag&gt;/gi, N = /<ss type="\w+">.*?<\/ss>/g, C = /<flag country="[\w+]{2}">(?:.+?)<\/flag>/gi, k = /<span class="flag [^"]{2}">(?:.+?)<\/span>/gi, L = /(<(?:\/?)(?:quote|legacyquote)[^>]*>)/gi, A = {
      text: /Edited previous message: /,
      edited: /<e_m [^<>]+>/g,
      editedEnd: /<\/e_m>/g,
      quoted: L
    }, O = /\b((https?:\/\/|w{3}\.)\S+)/gi, M = R(), _ = "<ss type=\"(.*?)\">(.*?)</ss>", D = {
      bold: I("b", "\\*"),
      italic: I("i", "_"),
      strike: I("s", "~"),
      rawBold: new RegExp("(&lt;b&gt;)(.*?)(&lt;/b&gt;)", "gi"),
      rawItalic: new RegExp("(&lt;i&gt;)(.*?)(&lt;/i&gt;)", "gi"),
      rawFontColor: new RegExp("(&lt;font\\s+color=\"#[a-f0-9]{6}\"&gt;)(.*?)(&lt;/font&gt;)", "gi")
    }, P = {
      "*": function (e) {
        return q("b", "*", e);
      },
      _: function (e) {
        return q("i", "_", e);
      },
      "~": function (e) {
        return q("s", "~", e);
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
      "&#39;": "'",
      "&#96;": "`",
      "&AMP;": "&",
      "&QUOT;": "\"",
      "&APOS;": "'"
    }, j = "mailto:", F = {
      ALLOWED_ATTR: [
        "href",
        "target",
        "type",
        "country",
        "id",
        "authorname",
        "timestamp",
        "author",
        "raw_pre",
        "raw_post"
      ],
      ALLOWED_TAGS: [
        "b",
        "i",
        "s",
        "u",
        "a",
        "ss",
        "flag",
        "at",
        "pre",
        "quote",
        "legacyquote",
        "br",
        "pre"
      ]
    };
  t.escapeHTML = Z;
  t.unescapeHTML = et;
  t.removeAnchorTags = tt;
  t.removeMetaData = nt;
  t.handleWikiMarkup = rt;
  t.stripHTML = ft;
  t.escapeIncomingXml = lt;
  t.escapeIncomingHTML = ct;
  t.escapeOutgoingHTML = ht;
  t.removeNoTranslateTags = pt;
  t.webify = dt;
  t.getMessageSanitizedContent = mt;
  t.compactHtml = Et;
  t.processOutgoingTextMessage = xt;
  t.processOutgoingTextMessageForTranslation = Tt;
  t.processIncomingSanitizedTextMessageForTranslation = Nt;
  t.isMessageWithMentionOnly = kt;
  t.isMessageWithEmoticonsOnly = Lt;
  var Ot = { "text/typed": { "text/html": At } };
  t.transform = Mt;
  t.validateUnescapedLink = _t;
  t.encodeEmoticonsTextRepresentation = Dt;
  t.encodeEmoticonsRawRepresentation = Pt;
  t.encodeLinkTextRepresentation = Ht;
  t.unboxHrefContent = Bt;
  t.unwebify = jt;
  t.getSanitizedTopic = Ft;
  t.getEmoticonNamesFromMessage = It;
  t.encode = qt;
  t.quotesPresentInHTML = Rt;
  t.quotesPresentInXML = Ut;
  t.extractMessageTextContent = zt;
}));
