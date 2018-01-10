define("services/pes/emoticons/renderLoop", [
  "require",
  "lodash-compat",
  "swx-constants",
  "services/pes/constants",
  "browser/window",
  "utils/chat/pesUtils",
  "swx-service-locator-instance"
], function (e) {
  function l(e, t, n) {
    return e.dataset ? e.dataset[t] : e.getAttribute("data-" + n);
  }
  function c(e, t, n, r) {
    e.dataset ? e.dataset[t] = r : e.setAttribute("data-" + n, r);
  }
  function h(e, t) {
    this.url = e;
    this.mediaInfo = t;
  }
  function p(e, t) {
    var n = this, r = i.Image;
    this.image = new r();
    this.image.onload = function () {
      n.draw = d;
      n.draw(e, t);
    };
    this.draw = function () {
    };
    this.image.src = this.url;
  }
  function d(e, t) {
    var n = e.getContext("2d"), r = f.INVALID, i = this.image.naturalWidth;
    n.clearRect(0, 0, e.width, e.width);
    var s;
    this.mediaInfo.framesCount === 1 ? s = 0 : s = Math.floor(t * this.mediaInfo.fps) % this.mediaInfo.framesCount;
    l(e, "drawState", "draw-state") !== f.TRANSIENT && c(e, "drawState", "draw-state", r);
    n.drawImage(this.image, 0, i * s, i, i, 0, 0, e.width, e.width);
  }
  function v(e, t) {
    this.smallAnimated = new h(s.buildEmoticonUrl(e, t, "small", !0), t.media.default);
    this.largeAnimated = new h(s.buildEmoticonUrl(e, t, "large", !0), t.media.default);
    this.extraLargeAnimated = new h(s.buildEmoticonUrl(e, t, "extraLarge", !0), t.media.default);
    this.smallStatic = new h(s.buildEmoticonUrl(e, t, "small", !1), a);
    this.largeStatic = new h(s.buildEmoticonUrl(e, t, "large", !1), a);
    this.extraLargeStatic = new h(s.buildEmoticonUrl(e, t, "extraLarge", !1), a);
  }
  function m() {
    function m(n) {
      if (n - a >= p) {
        a = n;
        var r = g();
        t.forEach(r, function (t) {
          var r = t.getBoundingClientRect();
          if (r.width <= u || !b(r))
            return;
          w(t, r);
          var i = l(t, "itemId", "item-id"), s = e._imageCache[i], o = l(t, "isAnimated", "is-animated") === "true";
          try {
            s && y(t, s, r.width, o, n / 1000);
          } catch (a) {
          }
        });
      }
      s && i.requestAnimationFrame(m);
    }
    function g() {
      return document.querySelectorAll(".swx span.emoticon canvas");
    }
    function y(e, t, n, i, s) {
      var o;
      n <= r.frameHeights.emoticons.SMALL ? o = "small" : n <= r.frameHeights.emoticons.LARGE ? o = "large" : o = "extraLarge";
      t[o + (i ? "Animated" : "Static")].draw(e, s);
    }
    function b(e) {
      return e.bottom > 0 && e.right > 0 && e.top < i.innerHeight && e.left < i.innerWidth;
    }
    function w(e, t) {
      var n = t.width * d;
      if (e.width === n && e.height === n)
        return;
      e.width = n;
      e.height = n;
      l(e, "drawState", "draw-state") !== f.TRANSIENT && c(e, "drawState", "draw-state", f.INVALID);
    }
    var e = this, s = !1, a = -1313, p = 0, d = 1;
    this._imageCache = {};
    this.isRunning = function () {
      return s;
    };
    this.start = function () {
      "devicePixelRatio" in i && (d = i.devicePixelRatio);
      s = !0;
      a = -1313;
      i.requestAnimationFrame(m);
    };
    this.stop = function () {
      s = !1;
    };
    this.updateCache = function () {
      var s = o.resolve(n.serviceLocator.PES_CONFIG_SERVICE).getConfiguration(), u = 0;
      t.forEach(s.items, function (t) {
        !e._imageCache[t.id] && t.type === r.itemTypes.emoticon.id && (e._imageCache[t.id] = new v(s.emoticonsRoot, t), t.media && t.media.default && t.media.default.fps > u && (u = t.media.default.fps));
      });
      u !== 0 && (p = Math.floor(1000 / u));
    };
    this._CacheItem = v;
    this._DrawStateMachine = h;
  }
  var t = e("lodash-compat"), n = e("swx-constants").COMMON, r = e("services/pes/constants"), i = e("browser/window"), s = e("utils/chat/pesUtils"), o = e("swx-service-locator-instance").default, u = 2, a = {
      firstFrame: 0,
      framesCount: 1,
      fps: 1
    }, f = {
      INVALID: "invalid",
      TRANSIENT: "transient"
    };
  return h.prototype.draw = p, new m();
});
