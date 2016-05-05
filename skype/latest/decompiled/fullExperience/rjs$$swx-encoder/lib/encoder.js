function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-encoder/lib/encoder", [
      "require",
      "exports",
      "./countryCodes"
    ], e);
}(function (e, t) {
  function r(e, t) {
    return typeof e == "undefined" ? t : e;
  }
  function i(e) {
    var t = {
      xml: !0,
      emoticons: {},
      countryCodes: {},
      largeEmoticonClass: "large",
      init: function (e) {
        e = e || {}, this.app = e.app, this.xml = r(e.xml, this.xml), this.emoticons = r(e.emoticons, this.emoticons), this.countryCodes = r(e.countries, n.CountryCodes), this.largeEmoticonClass = r(e.largeEmoticonClass, this.largeEmoticonClass);
      },
      encode: function (e, t) {
        t = r(t, !0), !this.xml && t && (e = this.private.escapeXml(e)), e.search("<") !== -1 && this.xml && t && (e = this.private.escapeXml(e));
        var n = "";
        for (var i = 0; i < e.length;) {
          var s = !0, o = i;
          i = this.firstLetter(e, i);
          if (i !== -1) {
            var u = this.firstSeparator(e, i);
            u === -1 && (u = e.length);
            var a = e.substring(i, u), f = this.private.encodeWord(a, this);
            f && (n += e.substring(o, i), n += f, s = !1), i = u;
          } else
            i = e.length;
          s && (++i, n += e.substring(o, i));
        }
        return n;
      },
      decode: function (e) {
        function i(e, t) {
          t.parentNode && t.parentNode.replaceChild(e, t);
        }
        function s() {
          var e = r.getElementsByTagName("flag"), s = [];
          for (n = 0; n < e.length; ++n) {
            var o = t.private.createFlagElement(a, e[n].getAttribute("country"), e[n].textContent);
            s.push([
              o,
              e[n]
            ]);
          }
          for (n = 0; n < s.length; ++n)
            i(s[n][0], s[n][1]);
        }
        function o() {
          var e = r.getElementsByTagName("ss"), s = [], o = e.length <= 3 && e.length > 0;
          if (o)
            for (n = 0; n < r.childNodes.length; ++n) {
              var u = r.childNodes[n].textContent.replace(" ", "").length === 0;
              o = o && (r.childNodes[n].tagName === "ss" || u);
            }
          var f = e.length > 20;
          for (n = 0; n < e.length; ++n) {
            var l = t.private.createEmoticonElement(a, e[n].getAttribute("type"), e[n].textContent, o, f, t.largeEmoticonClass);
            s.push([
              l,
              e[n]
            ]);
          }
          for (n = 0; n < s.length; ++n)
            i(s[n][0], s[n][1]);
        }
        function u() {
          if (!t.app)
            return;
          var e = r.getElementsByTagName("at"), s = [];
          for (n = 0; n < e.length; ++n) {
            var o = t.private.createMentionElement(t.app, a, e[n].getAttribute("id"), e[n].textContent);
            s.push([
              o,
              e[n]
            ]);
          }
          for (n = 0; n < s.length; ++n)
            i(s[n][0], s[n][1]);
        }
        var t = this, n, r;
        try {
          var a = this.private.parseXML(this.private.encapsulateInRootElement(e));
          if (a)
            return r = a.documentElement, s(), o(), u(), this.private.fixInvalidHTML(this.private.decapsulateFromRootElement(this.private.xmlToString(a)));
        } catch (f) {
        }
        return e;
      },
      escapeXml: function (e) {
        return this.private.escapeXml(e);
      },
      getNodeTextContent: function (e) {
        var t = this.private.parseXML(this.private.encapsulateInRootElement(e));
        return t && t.documentElement ? t.documentElement.textContent : e;
      },
      firstLetter: function (e, t) {
        t = r(t, 0);
        for (var n = t; n < e.length; ++n)
          if (!this.private.separators[e[n]])
            return n;
        return -1;
      },
      firstSeparator: function (e, t) {
        t = r(t, 0);
        for (var n = t; n < e.length; ++n)
          if (this.private.separators[e[n]])
            return n;
        return -1;
      },
      "private": {
        separators: {
          "   ": !0,
          "\n": !0,
          "\r": !0,
          " ": !0,
          "\xA0": !0,
          "\u1680": !0,
          "\u2000": !0,
          "\u2001": !0,
          "\u2002": !0,
          "\u2003": !0,
          "\u2004": !0,
          "\u2005": !0,
          "\u2006": !0,
          "\u2007": !0,
          "\u2008": !0,
          "\u2009": !0,
          "\u200A": !0,
          "\u202F": !0,
          "\u205F": !0,
          "\u3000": !0
        },
        createEmoticonXmlTag: function (e, t) {
          return "<ss type=\"" + e + "\">" + this.escapeXml(t) + "</ss>";
        },
        createFlagXmlTag: function (e, t) {
          return "<flag country=\"" + e + "\">" + this.escapeXml(t) + "</flag>";
        },
        createMentionElement: function (e, t, n, r) {
          var i = e.get().personsAndGroupsManager, s = "mention", o, u, a;
          return n === i.mePerson.id() ? (r = i.mePerson.displayName(), s += " me") : (a = i.all.persons(n), a && (r = a.displayName())), r = this.escapeXml(r), u = t.createElement("span"), u.setAttribute("title", n), u.textContent = r, o = t.createElement("i"), o.setAttribute("class", s), o.appendChild(u), o;
        },
        createEmoticonElement: function (e, t, n, r, i, s) {
          var o = e.createElement("span"), u = ["emoticon"];
          u.push(t), i || u.push("animated"), r && u.push(s), o.setAttribute("class", u.join(" "));
          var a = e.createElement("span");
          return a.textContent = n, a.setAttribute("class", "emoSprite"), o.appendChild(a), o;
        },
        createFlagElement: function (e, t, n) {
          var r = e.createElement("span");
          return r.textContent = n, r.setAttribute("class", "flag " + t), r.textContent = "(flag:" + t + ")", r;
        },
        encapsulateInRootElement: function (e) {
          var t;
          while (t !== e)
            t = e, e = e.replace(/<\s*?root[\s\S]*?>.*?(<\s*?\/\s*?root\s*?>)?/gi, "");
          return "<root>" + e + "</root>";
        },
        decapsulateFromRootElement: function (e) {
          return e.match(/<root ?\/>/) ? "" : e.length === "</root>".length ? "" : e.substring("<root>".length, e.length - "</root>".length);
        },
        fixInvalidHTML: function (e) {
          return e.replace(/<span class='emoSprite'\s*\/>/g, "<span class='emoSprite'></span>");
        },
        encodeWord: function (e, t) {
          function i(e) {
            return t.emoticons.map[e];
          }
          function s(e) {
            return t.emoticons.firstLettersMap[e[0]] && i(e);
          }
          function o(e) {
            var t = !0, r = e;
            while (t) {
              var i = r.replace(/[,.;?]$/, "");
              t = i !== r;
              if (t) {
                n = u(i);
                if (n) {
                  n += e.substring(i.length);
                  break;
                }
              }
              r = i;
            }
          }
          function u(e) {
            e = t.private.unescapeXml(e);
            for (var o = e.length - 1; o >= 0;) {
              var u = !1, a = e.substring(o, r);
              if (s(a)) {
                while (o > 0) {
                  var f = e.substring(o - 1, r);
                  if (!s(f))
                    break;
                  o--, a = e.substring(o, r);
                }
                n = t.private.createEmoticonXmlTag(i(a), a) + n, u = !0;
              } else if (!u && a[0] === "(") {
                var l = a.match(/^\(flag:(\w\w)\)$/i), c = l && l[1];
                c && t.countryCodes[c] && (n = t.private.createFlagXmlTag(c, a) + n, u = !0);
              }
              u && (r = o), --o;
            }
            return n;
          }
          var n = "", r = e.length;
          return n = u(e), n || o(e), n === "" ? null : (r !== 0 && (n = e.substring(0, r) + n), n);
        },
        parseXML: function (e) {
          var t;
          try {
            if (window.DOMParser) {
              var n = new DOMParser();
              n.async = !1, t = n.parseFromString(e, "text/xml");
            } else {
              t = new ActiveXObject("Microsoft.XMLDOM"), t.async = !1;
              if (t.loadXML(e))
                return t;
            }
          } catch (r) {
            return null;
          }
          return t.parseError && t.parseError.errorCode !== 0 ? null : t.getElementsByTagName("parsererror").length > 0 ? null : t;
        },
        xmlToString: function (e) {
          var t;
          try {
            t = new XMLSerializer().serializeToString(e);
          } catch (n) {
            t = e.xml;
          }
          return t;
        },
        xmlEscapeMap: {
          "<": "&lt;",
          ">": "&gt;",
          "&": "&amp;",
          "\"": "&quot;",
          "'": "&apos;"
        },
        escapeXml: function (e) {
          var t = this.xmlEscapeMap;
          return e.replace(/[<>&"']/g, function (e) {
            return t[e];
          });
        },
        unescapeXml: function (e) {
          var t = {
            "&lt;": "<",
            "&gt;": ">",
            "&amp;": "&",
            "&quot;": "\"",
            "&apos;": "'"
          };
          return e.replace(/&lt;|&gt;|&amp;|&quot;|&apos/g, function (e) {
            return t[e];
          });
        }
      }
    };
    return t.init(e), t;
  }
  var n = e("./countryCodes");
  t.build = i;
})
