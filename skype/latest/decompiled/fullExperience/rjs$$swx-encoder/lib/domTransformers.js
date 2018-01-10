(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-encoder/lib/domTransformers", [
      "require",
      "exports",
      "lodash-compat",
      "./countryCodes"
    ], e);
}(function (e, t) {
  var n = e("lodash-compat"), r = e("./countryCodes"), i = function () {
      function e() {
      }
      return e.prototype.transformRawToXml = function (e, t) {
        var n = [];
        n.push(t);
        while (n.length !== 0) {
          var r = n.pop();
          r.nodeType === Node.TEXT_NODE ? this.encodeTextNodeToXml(e, r) : r.nodeName.toLowerCase() !== "pre" && this.isElementAllowed(r) && this.pushChildNodes(n, r);
        }
      }, e.prototype.encodeTextNodeToXml = function (e, t) {
        var n = t.parentNode, r = this.encodeWords(e, t);
        if (r.length === 0)
          return;
        for (var i = 0; i < r.length; i++)
          n.insertBefore(r[i], t);
        n.removeChild(t);
      }, e.prototype.encodeWords = function (e, t) {
        var r = this, i = t.nodeValue, s = this.getAllWords(i), o = 0, u = [];
        return s.forEach(function (t) {
          var s = r.wordRawToXml(e, t[0]);
          if (n.isUndefined(s) || s.length === 0)
            return;
          o !== t.index && u.push(e.createTextNode(i.substring(o, t.index)));
          o = t.index + t[0].length;
          u = u.concat(s);
        }), o !== 0 && o < i.length && u.push(e.createTextNode(i.substring(o))), u;
      }, e.prototype.getAllWords = function (e) {
        var t = this.wordMatcher(), n, r = [];
        while ((n = t.exec(e)) !== null)
          r.push(n);
        return r;
      }, e.prototype.pushChildNodes = function (e, t) {
        for (var n = 0; n < t.childNodes.length; n++)
          e.push(t.childNodes[n]);
      }, e.prototype.wordMatcher = function () {
        return /[\w()#:\-=<>\u2329\u232A;'\|\$"\]\*\^&\+@\{\?Ǝ\/\\!~]+/g;
      }, e;
    }();
  t.WordDomTransformer = i;
  var s = function (e) {
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return __extends(t, e), t.build = function () {
      return new t();
    }, t.prototype.isElementAllowed = function (e) {
      return e.nodeName.toLowerCase() !== "span" || e.className.toLowerCase().indexOf("flag") === -1;
    }, t.prototype.wordRawToXml = function (e, t) {
      var n = t.match(/^\(flag:([A-Za-z]{2})\)$/i), i = n && n[1].toLowerCase();
      return i && r.CountryCodes[i] ? [this.createXmlElement(e, i, t)] : [];
    }, t.prototype.createXmlElement = function (e, t, n) {
      var r = e.createElement("flag");
      return r.setAttribute("country", t), r.innerText = n, r;
    }, t;
  }(i);
  t.FlagDomTransformer = s;
  var o = function (e) {
    function t(t) {
      var n = e.call(this) || this;
      return n.isOutgoing = t, n;
    }
    return __extends(t, e), t.build = function (e) {
      return e === void 0 && (e = !1), new t(e);
    }, t.prototype.isElementAllowed = function (e) {
      return e.nodeName.toLowerCase() !== "a";
    }, t.prototype.wordRawToXml = function (e, t) {
      var n = t.match(/^(\()?(.*?)((\.|\?|\!|\))+)?$/i), r = n[1], i = n[2], s = n[3], o = i.match(/^(?:https?:\/\/|mailto:)(.+)$/i), u = o && o[0];
      u || (o = i.match(/^[^@]+@(?:\w+(?:\.\w+)+)$/i), u = o && "mailto:" + o[0]);
      u || (o = i.match(/^www\.\S+$/i), u = o && "http://" + o[0]);
      if (u) {
        var a = [];
        return r && a.push(e.createTextNode(r)), a.push(this.createXmlElement(e, u, i)), s && a.push(e.createTextNode(s)), a;
      }
      return [];
    }, t.prototype.createXmlElement = function (e, t, n) {
      var r = e.createElement("a");
      return r.setAttribute("href", t), this.isOutgoing || (r.setAttribute("title", t), r.setAttribute("target", "_blank"), r.setAttribute("tabindex", "-1")), r.innerText = n, r;
    }, t.prototype.wordMatcher = function () {
      return /\S+/g;
    }, t;
  }(i);
  t.URLDomTransformer = o;
  var u = function (e) {
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return __extends(t, e), t.build = function () {
      return new t();
    }, t.prototype.isElementAllowed = function (e) {
      return e.nodeName.toLowerCase() !== "pre";
    }, t.prototype.getAllWords = function (e) {
      var t = /\r?\n/g, n, r = [];
      while ((n = t.exec(e)) !== null)
        r.push(n);
      return r;
    }, t.prototype.wordRawToXml = function (e, t) {
      return [this.createXmlElement(e)];
    }, t.prototype.createXmlElement = function (e) {
      return e.createElement("br");
    }, t;
  }(i);
  t.NewLineDomTransformer = u;
  var a = function () {
    function e() {
    }
    return e.prototype.transformRawToXml = function (e, t) {
      var n = [];
      n.push(t);
      while (n.length !== 0) {
        var r = n.pop();
        this.isDesiredElement(r) ? this.visitElement(e, r) : r.nodeType === Node.ELEMENT_NODE && this.pushChildNodes(n, r);
      }
    }, e.prototype.pushChildNodes = function (e, t) {
      for (var n = 0; n < t.childNodes.length; n++)
        e.push(t.childNodes[n]);
    }, e;
  }();
  t.ElementVisitor = a;
}));
