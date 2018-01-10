(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-encoder/lib/aggregateEncoder", [
      "require",
      "exports",
      "lodash-compat",
      "./countryCodes"
    ], e);
}(function (e, t) {
  function i(e, t) {
    return typeof e == "undefined" ? t : e;
  }
  function o(e) {
    var t = new u();
    return t.init(e), t;
  }
  var n = e("lodash-compat"), r = e("./countryCodes"), s;
  (function (e) {
    e[e.Element = 1] = "Element";
    e[e.Text = 3] = "Text";
  }(s || (s = {})));
  t.build = o;
  var u = function () {
    function e() {
      this.xml = !0;
      this.countryCodes = {};
      this.largeEmoticonClass = "large";
      this.emoticonEncoder = {};
      this.domTransformers = [];
      this.domDecoders = [];
      this._private = {
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
        createMentionElement: function (e, t, n, r) {
          var i = e.get().personsAndGroupsManager, s = n.match(/^\d+:/), o = "mention";
          s && (n = n.substring(s[0].length));
          if (n === i.mePerson.id())
            r = i.mePerson.displayName(), o += " me";
          else {
            var u = i.all.persons(n);
            u && (r = u.displayName());
          }
          r = this.escapeXml(r);
          var a = t.createElement("span");
          a.setAttribute("title", n);
          a.textContent = r;
          var f = t.createElement("i");
          return f.setAttribute("class", o), f.appendChild(a), f;
        },
        createFlagElement: function (e, t, n) {
          var r = e.createElement("span");
          return r.textContent = n, r.setAttribute("class", "flag " + t), r.textContent = "(flag:" + t + ")", r;
        },
        encapsulateInRootElement: function (e) {
          var t;
          while (t !== e)
            t = e, e = e.replace(/<\s*?root[\s\S]*?>.*?(<\s*?\/\s*?root\s*?>)?/ig, "");
          return "<root>" + e + "</root>";
        },
        decapsulateFromRootElement: function (e) {
          return e.match(/<root ?\/>/) ? "" : e.length === "</root>".length ? "" : e.substring("<root>".length, e.length - "</root>".length);
        },
        parseXML: function (e) {
          var t;
          try {
            if (window.DOMParser) {
              var n = new DOMParser();
              n.async = !1;
              t = n.parseFromString(e, "text/xml");
            } else {
              var r = new ActiveXObject("Microsoft.XMLDOM");
              r.async = !1;
              if (r.loadXML(e))
                return r;
            }
          } catch (i) {
            return null;
          }
          var s = t.parseError;
          return s && s.errorCode !== 0 ? null : t.getElementsByTagName("parsererror").length > 0 ? null : t;
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
      };
    }
    return e.prototype.init = function (e) {
      e = e || {};
      this.app = e.app;
      this.xml = i(e.xml, this.xml);
      this.countryCodes = i(e.countries, r.CountryCodes);
      this.largeEmoticonClass = i(e.largeEmoticonClass, this.largeEmoticonClass);
      this.emoticonEncoder = i(e.emoticonEncoder, this.emoticonEncoder);
      e.domTransformers && e.domTransformers.length && (this.domTransformers = this.domTransformers.concat(e.domTransformers));
      e.domDecoders && e.domDecoders.length && (this.domDecoders = this.domDecoders.concat(e.domDecoders));
    }, e.prototype.encode = function (e, t) {
      function f(e) {
        var t = e.implementation.createDocument(e.body.namespaceURI, "message", null);
        while (e.body.childNodes.length !== 0)
          t.childNodes[0].appendChild(e.body.childNodes[0]);
        var n = t.childNodes[0].outerHTML;
        return n.replace(/(?:^<message.*?>|<\/message>$)/g, "").replace(/&nbsp;/g, " ");
      }
      t === void 0 && (t = !0);
      var r = this, i = new DOMParser();
      if (typeof e != "string")
        throw new TypeError("Text parameter must be of type string.");
      var s = t ? n.escape(e) : e;
      try {
        var o = i.parseFromString(s, "text/html"), u = o.getElementsByTagName("parsererror").length !== 0;
        if (u)
          throw new Error("ParserError");
        return this.domTransformers.forEach(function (e) {
          try {
            e.transformRawToXml(o, o.body);
          } catch (t) {
          }
        }), f(o);
      } catch (a) {
        return s;
      }
    }, e.prototype.decode = function (e) {
      function i(e, t) {
        t.parentNode && t.parentNode.replaceChild(e, t);
      }
      function s() {
        var e = r.getElementsByTagName("flag"), s = [];
        for (n = 0; n < e.length; ++n) {
          var o = t._private.createFlagElement(a, e[n].getAttribute("country"), e[n].textContent);
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
          var l = t.emoticonEncoder.createHtmlElement(a, e[n].getAttribute("type"), e[n].textContent, o, f, t.largeEmoticonClass);
          l && s.push([
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
          var o = t._private.createMentionElement(t.app, a, e[n].getAttribute("id"), e[n].textContent);
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
        var a = this._private.parseXML(this._private.encapsulateInRootElement(e));
        if (a)
          return r = a.documentElement, s(), o(), u(), this.domDecoders.forEach(function (e) {
            try {
              e.transformRawToXml(a, r);
            } catch (t) {
            }
          }), this.emoticonEncoder.fixInvalidHtml(this._private.decapsulateFromRootElement(this._private.xmlToString(a)));
      } catch (f) {
      }
      return e;
    }, e.prototype.escapeXml = function (e) {
      return this._private.escapeXml(e);
    }, e.prototype.getNodeTextContent = function (e) {
      var t = this._private.parseXML(this._private.encapsulateInRootElement(e));
      return t && t.documentElement ? t.documentElement.textContent : e;
    }, e.prototype.firstLetter = function (e, t) {
      t = i(t, 0);
      for (var n = t; n < e.length; ++n)
        if (!this._private.separators[e[n]])
          return n;
      return -1;
    }, e.prototype.firstSeparator = function (e, t) {
      t = i(t, 0);
      for (var n = t; n < e.length; ++n)
        if (this._private.separators[e[n]])
          return n;
      return -1;
    }, e;
  }();
}));
