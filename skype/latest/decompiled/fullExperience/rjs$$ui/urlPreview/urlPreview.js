define("ui/urlPreview/urlPreview", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "cafe/applicationInstance",
  "constants/common",
  "browser/dom",
  "telemetry/chat/telemetryEnumerator",
  "utils/common/eventHelper",
  "vendor/knockout",
  "utils/chat/messageSanitizer",
  "reqwest",
  "services/serviceLocator",
  "experience/settings",
  "utils/common/styleModeHelper",
  "telemetry/chat/urlPreviewShow",
  "browser/window",
  "ui/players/ytPlayer"
], function (e, t) {
  function E(e, t, n) {
    function i(e) {
      return e.status_code !== "200" ? !1 : !e.title && !e.site && !e.description ? !1 : e.thumbnail ? !0 : !1;
    }
    return r.get().signInManager._skypeToken().then(function (r) {
      function a(n) {
        return n.urlPreviewShowTelemetryEvent = s, n.urlRequest = e, n.encodedRequest = t, i(n) ? (s.succeeded(n.status_code, !!n.thumbnail), new Promise(function (e, t) {
          var r = m.setTimeout(t, w), i = new m.Image();
          i.onload = function () {
            m.clearTimeout(r);
            n.width = this.width;
            n.height = this.height;
            n.oneUrlOnly = O(u.urlPosition);
            e(n);
          };
          i.onerror = t.bind(null, n);
          i.src = n.thumbnail;
        })) : (s.error(n.status_code), Promise.reject(n));
      }
      function f() {
        return s.error(null), { skip: !0 };
      }
      var s, o = {
          url: h.urlPServiceHost + "/v1/url/info?url=" + t,
          method: "GET",
          crossOrigin: !0,
          dataType: "json",
          headers: { Authorization: "skype_token " + r }
        }, u = {
          url: e,
          urlPosition: n.urlPosition,
          urlCount: n.urlsCount,
          participantCount: n.participantsCount
        };
      return s = v.build(u), Promise.resolve(l.compat(o)).catch(function (t) {
        throw t = t || {}, t.urlRequest = e, s.error(t ? t.status_code : null), t;
      }).then(a, f);
    });
  }
  function S(e, t, n) {
    var r = /<a\s+(?:[^>]*?\s+)?href="((?!mailto:)[^"]*)".*?>(.*?)<\/a>/g, i = e.match(r) || [];
    if (t) {
      var s = e.replace(r, "");
      i = i.concat(n.parseYTLinks(s));
    }
    if (!i)
      return;
    return i = x(i), i.length === 0 ? null : i;
  }
  function x(e) {
    return e.filter(function (e, t, n) {
      return t === n.indexOf(e);
    });
  }
  function T(e) {
    var t = /^<a\s+(?:[^>]*?\s+)?href="([^"]*)".*<\/a>$/.exec(e);
    return t ? t[1] : e;
  }
  function N(e, t, n) {
    return {
      urlsCount: t.length,
      urlPosition: C(e, t),
      participantsCount: n.participantsCount()
    };
  }
  function C(e, t) {
    return t.length === 1 && !e.replace(t[0], "") ? d.URL_ONLY : n.endsWith(e, t[t.length - 1]) ? d.TEXT_ENDING_WITH_URL : d.TEXT_WITH_URL;
  }
  function k(e, t) {
    return t.previews.remove(function (t) {
      var n = e.indexOf(t.originalRequest);
      return n > -1 && e.splice(n, 1), n === -1;
    }), e;
  }
  function L(e) {
    return e === "image/gif";
  }
  function A(e) {
    return e ? n.escape(e) : e;
  }
  function O(e) {
    return e === d.URL_ONLY;
  }
  function M(e) {
    return {
      description: a.observable(),
      title: a.observable(),
      site: a.observable(),
      url: a.observable(e),
      target: a.observable("_blank"),
      favicon: a.observable(),
      thumbnail: a.observable(),
      category: a.observable(),
      type: a.observable(i.urlPreviewType.WWW),
      typeClasses: { youtube: a.observable(!1) },
      scaledByW: a.observable(!1),
      scaledByH: a.observable(!1),
      originalSize: a.observable(!1),
      tall: a.observable(!1),
      wide: a.observable(!1),
      isGif: a.observable(!1),
      ytPlayer: a.observable(!1),
      ordinal: 0,
      originalRequest: e,
      encodedRequest: e
    };
  }
  var n = e("lodash-compat"), r = e("cafe/applicationInstance"), i = e("constants/common"), s = e("browser/dom"), o = e("telemetry/chat/telemetryEnumerator"), u = e("utils/common/eventHelper"), a = e("vendor/knockout"), f = e("utils/chat/messageSanitizer"), l = e("reqwest"), c = e("services/serviceLocator"), h = e("experience/settings"), p = e("utils/common/styleModeHelper"), d = o.enums.URL_POSITION, v = e("telemetry/chat/urlPreviewShow"), m = e("browser/window"), g = e("ui/players/ytPlayer"), y = 0.5, b = 2, w = 3000;
  t.render = function (t, n, r, o, l) {
    function w(e) {
      var t = n.elementInfo.element;
      if (!e) {
        t.onkeydown = null;
        return;
      }
      t.onkeydown = function (e) {
        var r = u.isActivation(e);
        if (!r)
          return;
        try {
          var i = s.getElement(".thumbnail", t);
          i ? i.click() : g.handleClick(n.previews()[0]);
        } catch (o) {
        }
      };
    }
    function x(e) {
      function t(e) {
        return e = e || {}, e.skip = !0, e;
      }
      if (o && g.isYT(e)) {
        var i = M(e);
        g.render(i, n, r) && (i.ordinal = n.previews().length, n.previews.push(i));
      } else if (l)
        return E(e, encodeURIComponent(e), d).catch(t);
      return Promise.resolve({ skip: !0 });
    }
    function C(e) {
      n.onBeforeExpanded();
      var t = 0;
      e.forEach(function (e) {
        e.skip || _(e, t++);
      });
      n.onAfterExpanded();
      n.copyLinkEnabled(v && n.previews().length === 1);
      w(n.copyLinkEnabled());
    }
    function _(e, t) {
      function h(e) {
        return e >= y && e <= b && !p.get().isIntegratedProperty();
      }
      var r = a.utils.arrayFirst(n.previews(), function (t) {
        return t.encodedRequest === e.encodedRequest;
      });
      if (r)
        return;
      var s = c.resolve(i.serviceLocator.FEATURE_FLAGS), o = g.isYT(e.url), u, f = L(e.content_type), l = e.width / e.height;
      u = !o || !s.isFeatureOn(i.featureFlags.URL_PREVIEW_LOAD_YOUTUBE_PLAYER) || !!e.restrictions;
      r = M(e.urlRequest);
      r.title(e.title);
      r.description(e.description);
      r.target(u ? "_blank" : "");
      r.url(e.url);
      r.favicon(e.favicon);
      r.thumbnail(e.thumbnail);
      r.category(e.category);
      r.isGif(f);
      r.type(f ? i.urlPreviewType.GIF : i.urlPreviewType.WWW);
      r.site(f ? "" : A(e.site));
      r.ytPlayer(!1);
      r.ordinal = t;
      r.typeClasses.youtube(o);
      r.originalRequest = e.urlRequest;
      r.encodedRequest = e.encodedRequest;
      r.restrictions = e.restrictions;
      o && r.type(i.urlPreviewType.YT);
      if (f || h(l))
        r.originalSize(!r.isGif()), r.scaledByW(!1), r.scaledByH(!1);
      else {
        var d = l < y;
        r.scaledByW(d);
        r.scaledByH(!d);
        r.originalSize(!1);
      }
      r.tall(!f && l <= 1);
      r.wide(!f && l > 1);
      n.previews.push(r);
    }
    var h = S(t, o, g);
    if (!h)
      return n.isUrlPreview(!1), n.copyLinkEnabled(!1), n.group(i.activityItemGroups.TEXT), n.contentTemplate("textMessageContentTemplate"), Promise.resolve();
    var d = N(t, h, r), v = O(d.urlPosition);
    for (var m = 0; m < h.length; m++)
      h[m] = f.unescapeHTML(T(h[m]));
    return n.previews ? h = k(h, n) : n.previews = a.observableArray([]), n.isUrlPreview(!0), n.group(i.activityItemGroups.MEDIA), n.contentTemplate("urlMessageContentTemplate"), n.copyUrlPreviewText = function () {
      var e = n.elementInfo.element, t = n.previews()[0].originalRequest;
      n.urlLinkToCopy = a.observable(t);
      n.copyActive(!0);
      try {
        var r = s.getElement(".copyArea", e);
        r.select();
        !document.execCommand("copy");
      } catch (i) {
      }
      n.copyActive(!1);
      delete n.urlLinkToCopy;
    }, Promise.all(h.map(x)).then(C);
  };
});
