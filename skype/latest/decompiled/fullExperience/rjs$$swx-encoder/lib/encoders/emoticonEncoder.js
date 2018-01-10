(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-encoder/lib/encoders/emoticonEncoder", [
      "require",
      "exports",
      "swx-constants",
      "swx-emoticon-map-instance",
      "swx-service-locator-instance",
      "../domTransformers",
      "swx-cafe-application-instance"
    ], e);
}(function (e, t) {
  function a(e, t, n) {
    var r = e.createElement("ss");
    return r.setAttribute("type", t), r.innerText = n, r;
  }
  function f(e) {
    return u.test(e);
  }
  function p() {
    var e = i["default"].resolve(n.COMMON.serviceLocator.FEATURE_FLAGS);
    return e.isFeatureOn(n.COMMON.featureFlags.CANVAS_EMOTICONS_ENABLED) ? new h() : new c();
  }
  var n = e("swx-constants"), r = e("swx-emoticon-map-instance"), i = e("swx-service-locator-instance"), s = e("../domTransformers"), o = e("swx-cafe-application-instance"), u = /^\w$/, l = function (e) {
      function t() {
        return e !== null && e.apply(this, arguments) || this;
      }
      return __extends(t, e), t.prototype.isElementAllowed = function (e) {
        return e.nodeName.toLowerCase() !== "span" || e.className.toLowerCase().indexOf("emoticon") === -1;
      }, t.prototype.wordRawToXml = function (e, t) {
        var n = [], i = 0;
        for (var s = 0; s < t.length; s++) {
          var o = undefined, u = -1;
          for (var l = s + 1; l < t.length + 1; l++) {
            var c = t.substring(s, l), h = r.map.hasOwnProperty(c) && r.map[c];
            h && !f(t[l]) && (o = h, u = l);
          }
          o && (i !== s && n.push(e.createTextNode(t.substring(i, s))), i = u, n.push(a(e, o, t.substring(s, u))), s = u - 1);
        }
        return i !== 0 && i < t.length && n.push(e.createTextNode(t.substring(i))), n;
      }, t;
    }(s.WordDomTransformer);
  t._EmoticonEncoder = l;
  var c = function (e) {
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return __extends(t, e), t.prototype.createHtmlElement = function (e, t, n, r, i, s) {
      var o = e.createElement("span"), u = ["emoticon"];
      u.push(t);
      i || u.push("animated");
      r && u.push(s);
      o.setAttribute("class", u.join(" "));
      var a = e.createElement("span");
      return a.textContent = n, a.setAttribute("class", "emoSprite"), o.appendChild(a), o;
    }, t.prototype.fixInvalidHtml = function (e) {
      return e.replace(/<span class="emoSprite"\s*\/>/g, "<span class=\"emoSprite\"></span>");
    }, t.prototype.hasEmoticons = function (e) {
      return e.indexOf("<span class=\"emoSprite\">") > -1;
    }, t.prototype.hasLargeEmoticon = function (e) {
      return /<span class="emoticon\s?\w*\s?(animated)?\s+\w*large"><span class="emoSprite">.*<\/span><\/span>/i.test(e);
    }, t;
  }(l);
  t._SpanEmoticonEncoder = c;
  var h = function (e) {
    function t() {
      return e !== null && e.apply(this, arguments) || this;
    }
    return __extends(t, e), t.prototype.canShowLargeEmoticon = function () {
      var e = o.get().personsAndGroupsManager.mePerson, t = e.preferences(n.COMMON.userSettings.preferences.SHOW_LARGE_EMOTICONS);
      return t ? t.value() : null;
    }, t.prototype.canShowAnimatedEmoticon = function () {
      var e = o.get().personsAndGroupsManager.mePerson, t = e.preferences(n.COMMON.userSettings.preferences.SHOW_ANIMATED_EMOTICONS);
      return t ? t.value() : null;
    }, t.prototype.createHtmlElement = function (e, t, i, s, u, a) {
      var f = e.createElement("span"), l = e.createElement("canvas"), c = ["emoticon"], h = o.get().personsAndGroupsManager.mePerson, p = h.preferences(n.COMMON.userSettings.preferences.SHOW_ANIMATED_EMOTICONS), d = h.preferences(n.COMMON.userSettings.preferences.SHOW_LARGE_EMOTICONS), v = o.get().personsAndGroupsManager.mePerson.preferences(n.COMMON.userSettings.preferences.SHOW_EMOTICONS), m = !v || v.value();
      return !t || !r.map.hasOwnProperty(i) || !m ? undefined : (l.setAttribute("data-item-id", t), l.textContent = i, !u && (p && this.canShowAnimatedEmoticon() || !p) && l.setAttribute("data-is-animated", "true"), s && (d && this.canShowLargeEmoticon() || !d) && c.push(a), d && d.value.get().then(function (e) {
        if (e !== !1)
          return;
        var t = c.indexOf(a, 0);
        t > -1 && (c.splice(t, 1), f.setAttribute("class", c.join(" ")));
      }), f.setAttribute("class", c.join(" ")), f.appendChild(l), f);
    }, t.prototype.fixInvalidHtml = function (e) {
      return e.replace(/<canvas((?:\s?(?:data-[-a-z]*|height|width)="[a-z0-9]*")*)\s*\/>/g, "<canvas$1></canvas>");
    }, t.prototype.hasEmoticons = function (e) {
      return e.indexOf("<canvas") > -1;
    }, t.prototype.hasLargeEmoticon = function (e) {
      return /<span class="emoticon\s?\w*\s?(animated)?\s+\w*large"><canvas(\s?(data-[-a-z]*|height|width)="[a-z0-9]*")*>.*<\/canvas><\/span>/i.test(e);
    }, t;
  }(l);
  t._CanvasEmoticonEncoder = h;
  t.build = p;
}));
