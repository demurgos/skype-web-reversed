define("ui/urlPreview/urlPreview", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-cafe-application-instance",
  "swx-constants",
  "browser/dom",
  "swx-telemetry-buckets",
  "utils/common/eventHelper",
  "vendor/knockout",
  "swx-utils-chat",
  "swx-log-tracer",
  "reqwest",
  "swx-service-locator-instance",
  "experience/settings",
  "utils/common/styleModeHelper",
  "telemetry/chat/urlPreviewShow",
  "browser/window",
  "swx-skypeuri-parser",
  "ui/players/ytPlayer"
], function (e, t) {
  function k(e, t, n) {
    function i(e) {
      return e.status_code !== "200" ? !1 : !e.title && !e.site && !e.description ? !1 : e.thumbnail ? !0 : !1;
    }
    return r.get().signInManager._skypeToken().then(function (r) {
      function u(r) {
        return r.urlPreviewShowTelemetryEvent = s, r.urlRequest = e, r.encodedRequest = t, i(r) ? (s.succeeded(r.status_code, !!r.thumbnail), new Promise(function (e, t) {
          var i = g.setTimeout(t, S), s = new g.Image();
          s.onload = function () {
            g.clearTimeout(i);
            r.width = this.width;
            r.height = this.height;
            r.oneUrlOnly = H(n.urlPosition);
            e(r);
          };
          s.onerror = t.bind(null, r);
          s.src = r.thumbnail;
        })) : (r.skip = !0, s.error(r.status_code), Promise.reject(r));
      }
      function a(e) {
        return e = e || {}, e.skip = !0, s.error(e.status_code ? e.status_code : null), e;
      }
      var s, o = {
          url: p.urlPServiceHost + "/v1/url/info?url=" + t,
          method: "GET",
          crossOrigin: !0,
          dataType: "json",
          headers: { Authorization: "skype_token " + r }
        };
      return n.url = e, s = m.build(n), Promise.resolve(c.compat(o)).then(u, a).catch(a);
    });
  }
  function L(e, t, n) {
    var r = /<a\s+(?:[^>]*?\s+)?href="((?!mailto:)[^"]*)".*?>(.*?)<\/a>/g, i = e.match(r) || [];
    if (t) {
      var s = e.replace(r, "");
      i = i.concat(n.parseYTLinks(s));
    }
    if (!i)
      return;
    return i = A(i), i.length === 0 ? null : i;
  }
  function A(e) {
    return e.filter(function (e, t, n) {
      return t === n.indexOf(e);
    }).filter(function (e) {
      return !y.containsSkypeUri(e);
    });
  }
  function O(e) {
    var t = /^<a\s+(?:[^>]*?\s+)?href="([^"]*)".*<\/a>$/.exec(e);
    return t ? t[1] : e;
  }
  function M(e, t) {
    return t.length === 1 && !e.replace(t[0], "") ? v.UrlOnly : n.endsWith(e, t[t.length - 1]) ? v.TextEndingWithUrl : v.TextWithUrl;
  }
  function _(e, t) {
    return t.previews.remove(function (t) {
      var n = e.indexOf(t.originalRequest);
      return n > -1 && e.splice(n, 1), n === -1;
    }), e;
  }
  function D(e) {
    return e === "image/gif";
  }
  function P(e) {
    return e ? n.escape(e) : e;
  }
  function H(e) {
    return e === v.UrlOnly;
  }
  function B(e) {
    return {
      description: a.observable(e.description),
      title: a.observable(e.title),
      site: a.observable(),
      url: a.observable(e.url),
      target: a.observable("_blank"),
      rel: a.observable("noreferrer noopener"),
      favicon: a.observable(e.favicon),
      thumbnail: a.observable(e.thumbnail),
      category: a.observable(e.category),
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
      originalRequest: e.urlRequest,
      encodedRequest: e.encodedRequest,
      restrictions: e.restrictions
    };
  }
  var n = e("lodash-compat"), r = e("swx-cafe-application-instance"), i = e("swx-constants").COMMON, s = e("browser/dom"), o = e("swx-telemetry-buckets"), u = e("utils/common/eventHelper"), a = e("vendor/knockout"), f = e("swx-utils-chat").messageSanitizer, l = e("swx-log-tracer").getLogger(), c = e("reqwest"), h = e("swx-service-locator-instance").default, p = e("experience/settings"), d = e("utils/common/styleModeHelper"), v = o.enums.urlPositionBucket, m = e("telemetry/chat/urlPreviewShow"), g = e("browser/window"), y = e("swx-skypeuri-parser"), b = e("ui/players/ytPlayer"), w = 0.5, E = 2, S = 3000, x = !1, T = !1, N = !0, C = !1;
  t.render = function (t, n, o, c, p) {
    function A(e) {
      return {
        urlCount: e.length,
        urlPosition: M(t, e),
        participantsCount: o.participantsCount(),
        contentId: n.contentId
      };
    }
    function j(e) {
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
          i ? i.click() : b.handleClick(n.previews()[0]);
        } catch (o) {
          l.error(o);
        }
      };
    }
    function F(e) {
      function t(e) {
        return e = e || {}, e.skip = !0, e;
      }
      return k(e, encodeURIComponent(e), g).catch(t);
    }
    function I(e) {
      if (!n._parentContext)
        return;
      n.onBeforeExpanded();
      var t = 0;
      e.forEach(function (e) {
        e.skip || q(e, t++);
      });
      n.onAfterExpanded();
      n.copyLinkEnabled(y && n.previews().length === 1);
      j(n.copyLinkEnabled());
    }
    function q(e, t) {
      function h(e) {
        return e >= w && e <= E && !d.get().isIntegratedProperty();
      }
      var r = a.utils.arrayFirst(n.previews(), function (t) {
        return t.encodedRequest === e.encodedRequest;
      });
      if (r)
        return;
      var s = b.isYT(e.url), u, f = D(e.content_type), l = e.width / e.height, c = s ? i.urlPreviewType.YT : f ? i.urlPreviewType.GIF : i.urlPreviewType.WWW;
      u = !s || !m.isFeatureOn(i.featureFlags.URL_PREVIEW_LOAD_YOUTUBE_PLAYER) || !!e.restrictions;
      r = B(e);
      r.target(u ? "_blank" : "");
      r.type(c);
      r.isGif(f);
      r.site(f ? "" : P(e.site));
      r.typeClasses.youtube(s);
      r.ytEnabled = T;
      r.ordinal = t;
      if (s && T && !e.restrictions && b.render(r, n, o)) {
        n.previews.push(r);
        return;
      }
      if (!x)
        return;
      if (f || h(l))
        r.originalSize(!r.isGif()), r.scaledByW(!1), r.scaledByH(!1);
      else {
        var p = l < w;
        r.scaledByW(p);
        r.scaledByH(!p);
        r.originalSize(!1);
      }
      r.tall(!f && l <= 1);
      r.wide(!f && l > 1);
      n.previews.push(r);
      n.isGif(f);
    }
    function R() {
      return x || T ? Promise.all(v.map(F)).then(I) : Promise.resolve();
    }
    function U() {
      var e = r.get().personsAndGroupsManager.mePerson, t = [];
      return t.push(e.preferences(i.userSettings.preferences.URL_PREVIEWS) ? e.preferences(i.userSettings.preferences.URL_PREVIEWS).value.get() : Promise.resolve(N)), t.push(e.preferences(i.userSettings.preferences.YOUTUBE_PLAYER) ? e.preferences(i.userSettings.preferences.YOUTUBE_PLAYER).value.get() : Promise.resolve(C)), Promise.all(t).then(function (e) {
        x = p && e[0];
        T = c && e[1];
      });
    }
    var v = L(t, c, b), m = h.resolve(i.serviceLocator.FEATURE_FLAGS);
    if (!v)
      return n.isUrlPreview(!1), n.copyLinkEnabled(!1), n.group(i.activityItemGroups.TEXT), n.contentTemplate("textMessageContentTemplate"), Promise.resolve();
    var g = A(v), y = H(g.urlPosition);
    for (var S = 0; S < v.length; S++)
      v[S] = f.unescapeHTML(O(v[S]));
    return n.previews ? v = _(v, n) : n.previews = a.observableArray([]), n.isUrlPreview(!0), n.group(i.activityItemGroups.MEDIA), n.contentTemplate("urlMessageContentTemplate"), U().then(R);
  };
});
